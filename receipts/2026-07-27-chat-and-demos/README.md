# Receipts — chat widget, live app demos, Agent section, factory scene (2026-07-27)

Everything here came off a real render: headless Chromium via Playwright against the
working tree of this branch. Nothing in this folder is reasoned from source.

## The gate

`section-fit.py` (committed in `../2026-07-26-pages-overhaul/`) at ten viewports:
390×844, 430×932, 844×390, 932×430, 834×1112, 1024×768, 1280×720, 1280×900,
1440×900, 1920×1080.

| | result |
|---|---|
| `section-fit-BEFORE-live.json` | the deployed pages as they stood before this branch — **FAIL, 11 failures** |
| `section-fit.json` | index + managed on this branch — **PASS, every gate clean at every viewport** |

Of those 11, four (`#seats`, `#skills`, `#why-it-works`, `#cost` each running past one
viewport at 390 and 844-landscape) and a 42px-wide tap target predate this branch. They
are fixed here alongside the new sections.

Steady state on this branch: **0** horizontal page overflow, **0** contained overflow,
**0** tap targets under 44px, 13 distinct font sizes (cap 14), mono **1.21%** of copy
(cap 3%), uppercase **0.18%** (cap 3%), no banned word, no emoji codepoint in copy.

Every rule in the stylesheet's "section-fit trims" block is annotated with the section it
serves and the pixel count that section was over. None of them removes copy.

## What the screenshots show

| file | |
|---|---|
| `desktop-agent-section.jpg` | the Agent's own section, distinct from the connectors above it |
| `desktop-feel-it-mobile.jpg` | the phone chat mock, live in an iframe |
| `desktop-feel-it-desktop.jpg` | the desktop chat mock, live, after the "On a desk" tab |
| `landscape-feel-it.jpg` | the same section at 844×390 |
| `phone-app-stores.jpg` | the App Store / Google Play placeholders at 390 |
| `desktop-factory-scene.jpg` | the restored factory scene, character slot holding its placeholder |
| `squidbot-open.jpg` | the chat widget, open |

## Two behaviours verified by driving them, not by reading them

- **The demo phone scrolls.** After a full playback the thread measures `scrollHeight`
  599 in a 424px box at 1280, 677 in 291 at 390, and 817 in 135 at 844×390 — it genuinely
  overflows and follows the newest message at every width. It did not at first: the
  messages were flex-*shrinking* to fit, so `scrollHeight` sat at exactly the box height
  and the demo squashed instead of scrolling. `.device-thread > * { flex: none }` is the
  fix, and it would not have shown up in a screenshot.
- **The widget answers.** The chat API is not reachable at the moment, so the widget falls
  back to its local answers — verified by asking what it costs and getting the pricing
  answer back. That path only works because of the fetch timeout added in this branch;
  without one the request never settles and the typing indicator spins for ever.
