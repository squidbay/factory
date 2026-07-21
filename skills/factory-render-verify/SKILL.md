---
name: factory-render-verify
description: "Render-and-measure receipts for any HTML page your factory builds — the render half of the design quality gate. Code runs it to screenshot every screen size and MEASURE what a source read or a single screenshot only guesses at: horizontal overflow, computed type sizes, tap-target sizes, safe-area presence, mono misuse. It pins the page source by hash so the exact bytes you approved can be re-checked after deploy. Invoke when Code has built or changed a page, when verifying a Designer return, or before a page ships. Produces receipts (a JPG per size + report.json) so a page is never shipped on trust."
---

# factory-render-verify — receipts, not vibes

A page can look right in one browser window and fall apart on a phone, in landscape, or on a
wide monitor — and you would never know from reading the code. This skill renders the real page
at every screen size, measures the things that actually break, and writes the results to disk as
**receipts**: a screenshot per size plus a `report.json` of hard numbers. Code attaches those to
the pull request; Cowork audits against them; you merge. Receipts are the gate, not the claim.

This is the **render half of the design quality gate** — [`guides/DESIGN-QUALITY-GATE.md`](../../guides/DESIGN-QUALITY-GATE.md) is the contract that says what "done" means; this skill is how STEP 7's visual QA gets proven instead of asserted.

## What it measures, at every size

- **Horizontal overflow** — the page wider than the screen. The single most common mobile bug, and invisible in a desktop window.
- **Headline and body type size** — catches an oversized hero headline and, worse, body copy under 16px (too small to read comfortably on a phone).
- **Tap targets under 44px** — buttons and links smaller than a fingertip.
- **Safe-area handling** — whether the page accounts for the notch and the home indicator on modern phones.
- **Monospace on body copy** — the monospaced font belongs on labels and numbers, never on paragraphs; it's a tell that a page was styled by feel rather than by system.
- **Zoom sanity** — records that the render was at true 1:1 (see the zoom-check rule below).

## The screen sizes it renders

Phone portrait `390×844` and `430×932` · **phone landscape `844×390`** (phones turn sideways —
a hero built only for portrait collapses here) · tablet `834×1112` · desktop `1280×720`,
`1440×900`, `1920×1080`. These match the widths in the quality gate's STEP 7. Override with
`--sizes "name:WxH,..."` for a page with unusual breakpoints.

## Run it

The browser ships with your session — nothing to download. Install the Python binding once if
it's missing (do **not** run `playwright install`; the browser is already on disk):

```bash
pip install playwright
```

Then render your page — a local file or a live URL:

```bash
# a page in your workshop repo
python3 skills/factory-render-verify/scripts/render.py \
  --target home=file:///absolute/path/to/index.html \
  --out ./receipts

# the live, deployed page
python3 skills/factory-render-verify/scripts/render.py \
  --target home=https://your-site.example/ \
  --out ./receipts
```

Each run writes `home_<size>.jpg` for every size plus `report.json` to `--out`, and prints a
one-line-per-size summary. Read the flags: any `OVERFLOW` is a hard fail; `tap<44` lists targets
to enlarge; `mono-body` means move that copy off the monospaced font. Then **look at the JPGs** —
numbers catch the measurable failures, eyes catch the rest (a wall of dim gray, a button eating a
phone screen, a landscape hero you can't read without scrolling).

## Hash-pinning — prove live is the bytes you approved

The render also **pins the page source by hash** (a SHA-256 of the served HTML, recorded in
`report.json` under `_pin`). That pin is what lets you close the loop after deploy: the numbers
you approved on the branch are only trustworthy if the thing that went live is byte-for-byte the
same page. Re-check it against the live URL once the deploy lands:

```bash
python3 skills/factory-render-verify/scripts/render.py --verify ./receipts/report.json
```

`MATCH` on every target means live is exactly the approved bytes. A `MISMATCH` means the deployed
page is not what you signed off on — stop and find out why before anyone trusts the live site.

## The zoom-check rule (before you trust a *live* browser)

Receipts from this headless harness are always at true 1:1, so their numbers are safe. But the
moment a seat reads a page in a **live, hands-on browser** — measuring a width, judging whether
something overflows — it must first confirm the browser is not zoomed: **`window.innerWidth` must
equal `window.outerWidth`.** A page viewed at 57% zoom reports phantom widths and invents overflow
and layout "bugs" that vanish at 100%. A real run once chased two such ghosts before catching the
zoom. So: check `innerWidth == outerWidth` before you believe anything a live browser tells you.
The report records `zoomOk` for exactly this reason — a receipt can never be confused with a
zoomed tab.

## Running on aarch64 (the small-browser fallback)

Most sessions "just work": the script prefers **chromium-headless-shell** (the small, headless-only
browser build that launches in more sandboxes) and falls back to full chromium. On some aarch64
sandboxes the headless browser is missing one shared library — usually `libXdamage.so.1` — and the
launch fails with `cannot open shared object file`. It's a one-time fix: extract the missing `.so`
into a local `_libs/` folder next to where you run the script, and it's picked up automatically on
the next run.

```bash
mkdir -p _libs && cd _libs
apt-get download libxdamage1                 # or: pip download the matching aarch64 wheel
dpkg -x libxdamage1*.deb .                    # unpack
find . -name 'libXdamage.so.1' -exec cp {} . \;   # copy the .so up into _libs/
cd .. && # re-run the render — the loader path now includes ./_libs
```

If a browser library is missing, the script names it and prints this recipe for you — you never
have to guess which library.

## Discipline

- **Render the actual page, never assert layout from source.** A tool that observes the runtime beats any amount of reading the code.
- **Every size, every round.** Do not declare "mobile is fixed" from one screenshot — the whole point is the sizes you weren't looking at.
- **Receipts inform the PR; the merge stays yours.** Code renders and attaches; Cowork audits against the receipts; you click merge. Nothing lands on trust.
