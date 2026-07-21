#!/usr/bin/env python3
"""factory-render-verify — screenshot + measure any HTML page across real screen sizes,
then pin the source by hash so the same bytes can be re-checked after deploy.

Two modes:

  RENDER (default) — render every target at every size, write JPGs + report.json:
    python3 render.py --target home=file:///abs/path/index.html --out ./receipts
    python3 render.py --target home=https://your-site.example/ --out ./receipts

  VERIFY — re-fetch the same targets and confirm each source hash still matches the
  pins recorded in an earlier report.json (the "is live the same bytes I approved?" gate):
    python3 render.py --verify ./receipts/report.json

Writes <name>_<size>.jpg + report.json to --out. report.json carries, per target:
a source hash pin (sha256 + byte length) and, per size, the measured numbers below.
"""
import argparse, glob, hashlib, json, os, subprocess, sys, urllib.parse

# Real devices, portrait and landscape, phone through desktop. The landscape phone
# (844x390) is on the list on purpose: phones turn sideways, and a hero built only for
# portrait collapses there. Override with --sizes "name:WxH,...".
DEFAULT_SIZES = ("390portrait:390x844,430portrait:430x932,844landscape:844x390,"
                 "834tablet:834x1112,1280desktop:1280x720,1440desktop:1440x900,1920desktop:1920x1080")
UA = ("Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 "
      "(KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1")

# What we measure on every page, at every size. These are the numbers a source read or a
# single screenshot can only guess at.
#  - horizontalOverflow: the page is wider than the screen — the #1 mobile bug.
#  - h1FontPx / bodyFontPx: catch oversized headlines and sub-16px body copy.
#  - tapTargetsUnder44: buttons/links smaller than a 44px finger target.
#  - viewportFitCover + safeAreaUses: iOS notch / home-indicator safety.
#  - monoBodyNodes: monospace used on paragraph copy (a slop tell).
#  - zoomOk: innerWidth == outerWidth. Only meaningful for a LIVE browser observation
#    (see the zoom-check note in SKILL.md) — in this headless harness it is always true,
#    and it is recorded so a receipt can never be confused with a zoomed live tab.
MEASURE_JS = r"""() => {
  const de = document.scrollingElement || document.documentElement;
  const h1 = document.querySelector('h1');
  const body = getComputedStyle(document.body);
  const vp = document.querySelector('meta[name=viewport]');
  const mono = /mono|SF Mono|Menlo|Consolas|Cascadia/i;
  let monoBody = 0;
  document.querySelectorAll('p, li').forEach(el => {
    const t = (el.innerText || '').trim();
    if (t.length > 40 && mono.test(getComputedStyle(el).fontFamily)) monoBody++;
  });
  let under44 = 0; const small = [];
  document.querySelectorAll('a, button, [role=button], input, select, textarea').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    if (r.width < 44 || r.height < 44) { under44++; if (small.length < 12) small.push((el.innerText||el.tagName).slice(0,30).trim()); }
  });
  // env(safe-area-inset-*) and svh/dvh usually live in a linked stylesheet, not the HTML
  // markup — reading outerHTML alone always counts 0. Count across the HTML plus every
  // reachable stylesheet's serialized rule text.
  let cssText = document.documentElement.outerHTML;
  for (const sheet of document.styleSheets) {
    let rules = null;
    try { rules = sheet.cssRules; } catch (e) { continue; } // cross-origin sheet: skip
    if (!rules) continue;
    for (const rule of rules) cssText += rule.cssText;
  }
  return {
    scrollWidth: de.scrollWidth, innerWidth: window.innerWidth,
    horizontalOverflow: de.scrollWidth > window.innerWidth + 1,
    h1FontPx: h1 ? getComputedStyle(h1).fontSize : null,
    h1Text: h1 ? h1.innerText.slice(0, 60) : null,
    bodyFontPx: body.fontSize,
    viewportContent: vp ? vp.content : null,
    viewportFitCover: !!(vp && /viewport-fit\s*=\s*cover/.test(vp.content)),
    safeAreaUses: (cssText.match(/safe-area-inset/g) || []).length,
    svhDvhUses: (cssText.match(/\d(svh|dvh)/g) || []).length,
    tapTargetsUnder44: under44, tapTargetSamples: small,
    monoBodyNodes: monoBody,
    zoomOk: window.outerWidth === 0 || window.innerWidth === window.outerWidth,
  };
}"""

# Below-the-fold images marked loading="lazy" never enter the viewport during a headless
# full-page capture, so they screenshot blank. Force eager, re-kick the fetch, await decode
# so the receipt shows the true rendered page. Runs AFTER MEASURE_JS so numbers reflect the
# page exactly as authored.
FORCE_LOAD_JS = r"""async () => {
  const imgs = [...document.querySelectorAll('img')];
  await Promise.all(imgs.map(async (i) => {
    try {
      i.loading = 'eager';
      if (!i.complete || i.naturalWidth === 0) { const s = i.getAttribute('src'); if (s) i.src = s; }
      await (i.decode ? i.decode() : Promise.resolve()).catch(() => {});
    } catch (e) {}
  }));
  return imgs.filter(i => i.naturalWidth > 0).length + '/' + imgs.length;
}"""


def parse_sizes(s):
    out = []
    for item in s.split(","):
        name, dims = item.split(":"); w, h = dims.lower().split("x")
        out.append((name.strip(), int(w), int(h)))
    return out


def find_chrome():
    """Prefer chromium-headless-shell (the small, headless-only build that launches in more
    sandboxes, including aarch64); fall back to the full chromium. Newest build wins."""
    for pat in ("/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell",
                "/opt/pw-browsers/chromium-*/chrome-linux/chrome"):
        hits = sorted(glob.glob(pat), reverse=True)
        if hits:
            return hits[0]
    return None


def check_libs(binary):
    """Report any shared library the chosen browser binary can't find. On aarch64 sandboxes
    the usual gap is libXdamage.so.1 — see the one-time extract recipe in SKILL.md. If a
    local ./_libs dir exists (where you extracted the missing .so), we add it to the loader
    path automatically. Returns the list of still-missing libs (empty == good to go)."""
    local = os.path.join(os.getcwd(), "_libs")
    if os.path.isdir(local):
        os.environ["LD_LIBRARY_PATH"] = local + os.pathsep + os.environ.get("LD_LIBRARY_PATH", "")
    try:
        out = subprocess.run(["ldd", binary], capture_output=True, text=True, timeout=20).stdout
    except Exception:
        return []  # no ldd (non-Linux) — let the launch itself surface any problem
    missing = [ln.split("=>")[0].strip() for ln in out.splitlines() if "not found" in ln]
    if missing:
        sys.stderr.write(
            "\n[libs] the browser binary is missing: " + ", ".join(missing) +
            "\n[libs] one-time fix (aarch64 libXdamage example) — extract the .so into ./_libs:\n"
            "        mkdir -p _libs && cd _libs\n"
            "        pip download --no-deps --only-binary :all: --platform manylinux2014_aarch64 \\\n"
            "          -d . pyxdamage 2>/dev/null || true   # or apt-get download libxdamage1\n"
            "        # then: unpack the package and copy libXdamage.so.1 here; re-run this script.\n"
            "[libs] the loader path picks up ./_libs automatically on the next run.\n\n")
    return missing


def sha_of(data: bytes):
    return {"sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)}


def source_bytes(page, response, url):
    """The bytes we pin: the served source of the main document. For http(s) that's the
    response body; for file:// (no body) we read the file off disk."""
    if response is not None:
        try:
            b = response.body()
            if b:
                return b
        except Exception:
            pass
    if url.startswith("file://"):
        path = urllib.parse.unquote(urllib.parse.urlparse(url).path)
        with open(path, "rb") as f:
            return f.read()
    # last resort: hash the rendered DOM (varies less than a screenshot, more than source)
    return page.content().encode("utf-8")


def render(args):
    os.makedirs(args.out, exist_ok=True)
    targets = [t.split("=", 1) for t in args.target]
    sizes = parse_sizes(args.sizes)

    from playwright.sync_api import sync_playwright
    chrome = find_chrome()
    if chrome:
        check_libs(chrome)
    proxy = os.environ.get("HTTPS_PROXY")
    report = {}
    with sync_playwright() as p:
        # --allow-file-access-from-files: treat file:// as same-origin so linked stylesheets
        # expose .cssRules (else safe-area / svh counts read 0 on file://).
        chrome_args = ["--no-sandbox", "--allow-file-access-from-files"]
        launch = {"executable_path": chrome, "args": chrome_args} if chrome else {"args": chrome_args}
        if proxy and any(u.startswith("http") for _, u in targets):
            launch["proxy"] = {"server": proxy}
        b = p.chromium.launch(**launch)
        for name, url in targets:
            report[name] = {"_source": url}
            for sz, w, h in sizes:
                ctx = b.new_context(viewport={"width": w, "height": h}, user_agent=UA,
                                    device_scale_factor=1, ignore_https_errors=True)
                pg = ctx.new_page()
                try:
                    resp = pg.goto(url, wait_until="networkidle", timeout=45000)
                    pg.wait_for_timeout(500)
                    m = pg.evaluate(MEASURE_JS)
                    m["imgsLoaded"] = pg.evaluate(FORCE_LOAD_JS)
                    pg.wait_for_timeout(200)
                    pg.screenshot(path=f"{args.out}/{name}_{sz}.jpg", full_page=True, type="jpeg", quality=args.quality)
                    report[name][sz] = m
                    if "_pin" not in report[name]:  # pin the source once per target
                        report[name]["_pin"] = sha_of(source_bytes(pg, resp, url))
                except Exception as e:
                    report[name][sz] = {"error": str(e).splitlines()[0][:200]}
                ctx.close()
        b.close()
    json.dump(report, open(f"{args.out}/report.json", "w"), indent=2)

    for name, szs in report.items():
        pin = szs.get("_pin", {})
        print(f"\n== {name}  pin sha256:{pin.get('sha256','?')[:16]}… ({pin.get('bytes','?')} bytes) ==")
        for sz, m in szs.items():
            if sz.startswith("_"):
                continue
            if "error" in m:
                print(f"  [{sz}] ERROR {m['error']}"); continue
            flags = []
            if m["horizontalOverflow"]: flags.append("OVERFLOW")
            if not m["viewportFitCover"]: flags.append("no-viewport-fit-cover")
            if m["tapTargetsUnder44"]: flags.append(f"{m['tapTargetsUnder44']} tap<44")
            if m["monoBodyNodes"]: flags.append(f"{m['monoBodyNodes']} mono-body")
            il = m.get("imgsLoaded")
            if il and il.split("/")[0] != il.split("/")[1]: flags.append(f"imgs {il}")
            print(f"  [{sz}] h1={m['h1FontPx']} body={m['bodyFontPx']} {' '.join(flags) or 'ok'}")
    print(f"\nreceipts: {args.out}/  (JPGs + report.json)")
    return 0


def verify(report_path):
    """Re-fetch each target and confirm its source hash still matches the pin in report.json.
    The post-deploy gate: pins recorded on the approved branch, re-checked against the live URL."""
    report = json.load(open(report_path))
    from playwright.sync_api import sync_playwright
    chrome = find_chrome()
    if chrome:
        check_libs(chrome)
    proxy = os.environ.get("HTTPS_PROXY")
    ok = True
    with sync_playwright() as p:
        launch = {"executable_path": chrome, "args": ["--no-sandbox", "--allow-file-access-from-files"]} \
            if chrome else {"args": ["--no-sandbox", "--allow-file-access-from-files"]}
        if proxy:
            launch["proxy"] = {"server": proxy}
        b = p.chromium.launch(**launch)
        for name, szs in report.items():
            url = szs.get("_source"); pin = szs.get("_pin")
            if not url or not pin:
                continue
            ctx = b.new_context(ignore_https_errors=True); pg = ctx.new_page()
            try:
                resp = pg.goto(url, wait_until="networkidle", timeout=45000)
                now = sha_of(source_bytes(pg, resp, url))
                match = now["sha256"] == pin["sha256"]
                ok = ok and match
                print(f"[{name}] {'MATCH' if match else 'MISMATCH'}  pinned:{pin['sha256'][:16]}… live:{now['sha256'][:16]}…")
            except Exception as e:
                ok = False; print(f"[{name}] ERROR {str(e).splitlines()[0][:200]}")
            ctx.close()
        b.close()
    print("\nverify:", "all pins match — live is the approved bytes" if ok else "MISMATCH — live differs from the pin")
    return 0 if ok else 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--target", action="append", help="name=url (repeatable)")
    ap.add_argument("--out", default="./receipts")
    ap.add_argument("--sizes", default=DEFAULT_SIZES)
    ap.add_argument("--quality", type=int, default=62)
    ap.add_argument("--verify", metavar="REPORT_JSON", help="re-check source pins in an earlier report.json")
    args = ap.parse_args()
    if args.verify:
        return verify(args.verify)
    if not args.target:
        ap.error("give at least one --target name=url (or --verify report.json)")
    return render(args)


if __name__ == "__main__":
    sys.exit(main())
