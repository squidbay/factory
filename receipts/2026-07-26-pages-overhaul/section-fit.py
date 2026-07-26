#!/usr/bin/env python3
"""section-fit — the half of the anti-slop gate the page-level overflow check misses.

factory-render-verify proves the PAGE is not wider than the screen. It cannot see
two other failures that both shipped green before:

  1. CONTAINED OVERFLOW — a box that scrolls sideways inside itself. The old seats
     carousel measured 1,953px of content in a 358px window and the page-level check
     still reported clean.
  2. SECTIONS THAT DON'T FIT — a section taller than the screen it is read on, which
     is the operator's #1 complaint and is invisible to every check above.

Run after render.py, same targets, every viewport including landscape.
Exit code is 1 if any gate fails, so it can be trusted in a script.
"""
import argparse, json, os, sys

SIZES = [
    ("390portrait", 390, 844), ("430portrait", 430, 932),
    ("844landscape", 844, 390), ("932landscape", 932, 430),
    ("834tablet", 834, 1112), ("1024landscape", 1024, 768),
    ("1280desktop", 1280, 720), ("1280tall", 1280, 900),
    ("1440desktop", 1440, 900), ("1920desktop", 1920, 1080),
]

MEASURE = r"""() => {
  const vh = window.innerHeight, vw = window.innerWidth;
  const de = document.scrollingElement || document.documentElement;

  // --- sections: height against the viewport they are read in ---
  const sections = [...document.querySelectorAll('section, footer, header')].map(s => {
    const r = s.getBoundingClientRect();
    const h2 = s.querySelector('h1, h2');
    return {
      id: s.id || s.tagName.toLowerCase(),
      title: h2 ? h2.innerText.replace(/\s+/g, ' ').slice(0, 46) : '',
      h: Math.round(r.height),
      vhRatio: +(r.height / vh).toFixed(3),
    };
  });

  // --- contained overflow: any box scrolling sideways inside itself ---
  const contained = [];
  document.querySelectorAll('*').forEach(el => {
    if (el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
      const ox = getComputedStyle(el).overflowX;
      // A clipped box is fine; a scrolling or visibly-spilling one is not.
      if (ox === 'auto' || ox === 'scroll' || ox === 'visible') {
        contained.push({
          sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
               (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
          content: el.scrollWidth, visible: el.clientWidth, overflowX: ox,
        });
      }
    }
  });

  // --- also: any element whose painted box sticks out past the viewport ---
  const spill = [];
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    if (r.right > vw + 1 || r.left < -1) {
      spill.push({
        sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
             (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : ''),
        left: Math.round(r.left), right: Math.round(r.right),
      });
    }
  });

  // --- craft metrics: type ladder, mono share, accent hue, tap targets ---
  const sizes = new Set(), monoNodes = [], allText = [];
  let monoChars = 0, upperChars = 0, totalChars = 0;
  const mono = /mono|SF Mono|Menlo|Consolas|Cascadia/i;
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walk.nextNode())) {
    const t = (n.textContent || '').trim();
    if (!t) continue;
    const p = n.parentElement;
    if (!p || p.closest('svg') || p.tagName === 'SCRIPT' || p.tagName === 'STYLE') continue;
    const cs = getComputedStyle(p);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    sizes.add(cs.fontSize);
    totalChars += t.length;
    if (mono.test(cs.fontFamily)) { monoChars += t.length; monoNodes.push(t.slice(0, 40)); }
    if (cs.textTransform === 'uppercase') upperChars += t.length;
    allText.push(t);
  }

  let under44 = 0; const small = [];
  document.querySelectorAll('a, button, [role=button], input, select, textarea').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    if (r.width < 44 || r.height < 44) {
      under44++;
      if (small.length < 12) small.push(((el.innerText || el.getAttribute('aria-label') || el.tagName) + '').slice(0, 28).trim() + ` ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  });

  // primary CTA sizes
  const ctas = [...document.querySelectorAll('.btn')].map(b => {
    const r = b.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });

  // animated elements + glow sites
  let animated = 0, glow = 0;
  document.querySelectorAll('body *').forEach(el => {
    const cs = getComputedStyle(el);
    if (cs.animationName && cs.animationName !== 'none') animated++;
    const bs = cs.boxShadow || '';
    if (/rgba?\(\s*0\s*,\s*21[0-9]/.test(bs)) glow++;
  });

  return {
    viewport: [vw, vh],
    pageHeight: de.scrollHeight,
    screens: +(de.scrollHeight / vh).toFixed(2),
    horizontalOverflow: de.scrollWidth > vw + 1,
    scrollWidth: de.scrollWidth,
    sections,
    containedOverflow: contained,
    viewportSpill: spill.slice(0, 12),
    distinctFontSizes: sizes.size,
    fontSizes: [...sizes].sort((a, b) => parseFloat(b) - parseFloat(a)),
    monoSharePct: totalChars ? +(100 * monoChars / totalChars).toFixed(2) : 0,
    monoNodes,
    upperSharePct: totalChars ? +(100 * upperChars / totalChars).toFixed(2) : 0,
    tapTargetsUnder44: under44, tapTargetSamples: small,
    ctaBoxes: ctas,
    animatedElements: animated,
    glowSites: glow,
    text: allText.join(' · '),
  };
}"""

BANNED_HARD = ["recover", "recoverab", "stateless", "persistent-state", "persistence", "durable", "durabilit"]
BANNED_JARGON = ["orchestrat", "leverage", "seamless", "frictionless", "robust", "cutting-edge", "next-gen",
                 "empower", "unlock", "supercharge", "revolutioni", "game-changing", "best-in-class",
                 "end-to-end", "turnkey", "scalable", "ecosystem", "synergy", "paradigm", "ai-powered",
                 "10x", "delve", "in today's fast-paced",
                 # the operator's own ban: these read as lying
                 "honest finding", "honest flag", "honest caveat", "not a blocker"]


def find_chrome():
    import glob
    roots = [os.environ.get("PLAYWRIGHT_BROWSERS_PATH"),
             os.path.expanduser("~/Library/Caches/ms-playwright"),
             os.path.expanduser("~/.cache/ms-playwright"), "/opt/pw-browsers"]
    for root in [r for r in roots if r]:
        for sub in ("chromium_headless_shell-*/chrome-*/headless_shell",
                    "chromium_headless_shell-*/chrome-*/chrome-headless-shell",
                    "chromium-*/chrome-*/chrome", "chromium-*/chrome-*/Chromium"):
            hits = sorted(glob.glob(os.path.join(root, sub)), reverse=True)
            if hits:
                return hits[0]
    raise SystemExit("no chromium found")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--target", action="append", required=True, help="name=url")
    ap.add_argument("--out", default="./receipts")
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)

    from playwright.sync_api import sync_playwright
    report, failures = {}, []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=find_chrome(),
                              args=["--no-sandbox", "--allow-file-access-from-files"])
        for t in args.target:
            name, url = t.split("=", 1)
            report[name] = {"_source": url}
            for sz, w, h in SIZES:
                ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1)
                pg = ctx.new_page()
                pg.goto(url, wait_until="networkidle", timeout=45000)
                pg.wait_for_timeout(400)
                m = pg.evaluate(MEASURE)
                ctx.close()

                phone = h <= 500 or w <= 500
                limit = 1.25 if phone else 1.15
                m["sectionLimit"] = limit
                bad = [s for s in m["sections"] if s["vhRatio"] > limit and s["id"] not in ("footer", "header")]
                m["sectionsOverLimit"] = bad
                report[name][sz] = m

                if m["horizontalOverflow"]:
                    failures.append(f"{name}/{sz}: PAGE OVERFLOW {m['scrollWidth']} > {w}")
                for c in m["containedOverflow"]:
                    failures.append(f"{name}/{sz}: CONTAINED OVERFLOW {c['sel']} {c['content']}>{c['visible']}")
                for s in bad:
                    failures.append(f"{name}/{sz}: SECTION #{s['id']} {s['vhRatio']}vh > {limit}")
                if m["distinctFontSizes"] > 14:
                    failures.append(f"{name}/{sz}: {m['distinctFontSizes']} distinct font sizes > 14")
                if m["monoSharePct"] > 3:
                    failures.append(f"{name}/{sz}: mono {m['monoSharePct']}% > 3%")
                if m["upperSharePct"] > 3:
                    failures.append(f"{name}/{sz}: uppercase {m['upperSharePct']}% > 3%")
                if m["tapTargetsUnder44"]:
                    failures.append(f"{name}/{sz}: {m['tapTargetsUnder44']} tap targets <44 {m['tapTargetSamples']}")
                for c in m["ctaBoxes"]:
                    if (phone and c["h"] > 56) or (not phone and (c["w"] > 340 or c["h"] > 60)):
                        failures.append(f"{name}/{sz}: CTA {c['w']}x{c['h']} over cap")

                low = m["text"].lower()
                for word in BANNED_HARD + BANNED_JARGON:
                    if word in low:
                        failures.append(f"{name}/{sz}: BANNED WORD '{word}'")
                if any(ord(ch) > 0x1F000 for ch in m["text"]):
                    failures.append(f"{name}/{sz}: emoji codepoint in copy")

                print(f"  [{sz:14}] {m['screens']:>5} screens  "
                      f"tallest={max(s['vhRatio'] for s in m['sections']):.2f}vh  "
                      f"sizes={m['distinctFontSizes']:>2}  mono={m['monoSharePct']:>4}%  "
                      f"upper={m['upperSharePct']:>4}%  tap<44={m['tapTargetsUnder44']}  "
                      f"contained={len(m['containedOverflow'])}  spill={len(m['viewportSpill'])}  "
                      f"{'OVERFLOW' if m['horizontalOverflow'] else 'ok'}")
                if bad:
                    for s in bad:
                        print(f"      ! #{s['id']:<14} {s['vhRatio']}vh  {s['title']}")
        b.close()

    for v in report.values():
        for k in list(v):
            if isinstance(v[k], dict) and "text" in v[k]:
                v[k].pop("text")
    json.dump(report, open(os.path.join(args.out, "section-fit.json"), "w"), indent=1)

    print("\n" + ("=" * 72))
    if failures:
        print(f"FAIL — {len(failures)} gate failures")
        seen = set()
        for f in failures:
            if f not in seen:
                seen.add(f); print("  " + f)
    else:
        print("PASS — every gate clean at every viewport")
    print("=" * 72)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
