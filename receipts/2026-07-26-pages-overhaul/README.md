# Render receipts — pages overhaul, 2026-07-26

Measured, not asserted. Both pages were rendered in headless Chrome at ten
viewports (portrait, landscape, tablet and desktop) and every number below came
off a real render, not off a reading of the source.

| File | What it is |
|---|---|
| `render-verify-report.json` | `factory-render-verify` output — overflow, computed type, tap targets, safe-area, mono-on-body, plus a SHA-256 pin of the served source per page |
| `section-fit.json` | the section-fit + contained-overflow battery (below), every viewport, every section |
| `section-fit.py` | the script, committed so any seat can re-run it and get the same numbers |

## Why there is a second script

`factory-render-verify` proves the **page** is not wider than the screen. It
cannot see two failures that both shipped green before:

1. **Contained overflow** — a box that scrolls sideways inside itself. The old
   seats carousel measured 1,953px of content in a 358px window and the
   page-level check still reported clean.
2. **Sections that don't fit** — a section taller than the screen it is read on.
   This was the operator's number-one complaint and nothing in the existing gate
   measured it.

`section-fit.py` adds both, plus the type-ladder, mono share, uppercase share,
tap-target, CTA-size and banned-word checks, and exits non-zero on any failure.

## Re-run it

```bash
python3 receipts/2026-07-26-pages-overhaul/section-fit.py \
  --target home=https://factory.squidbay.io/ \
  --target managed=https://factory.squidbay.io/managed \
  --out ./receipts-live
```

## Result on this branch

`PASS — every gate clean at every viewport`, on both pages:

- **Horizontal overflow:** none, at any of the ten viewports.
- **Contained overflow:** none. No element scrolls sideways inside itself.
- **Section fit:** tallest section is 1.25 viewport heights at 390×844 and 0.96
  at 1280×900. Nothing exceeds the gate at any width, portrait or landscape.
- **Type ladder:** 9–10 distinct rendered sizes (cap is 14).
- **Mono:** 1.7% of copy (cap 3%), and every run of it is a literal address, a
  file count or a status inside a product mock. **Uppercase: 0%.**
- **Tap targets under 44px:** zero.
- **Emoji in markup:** zero.

The one element the spill check reports at every width is `a.skip`, the
skip-to-content link, parked at `left: -9999px` until it takes focus. That is
the accessibility pattern working, not a layout fault.
