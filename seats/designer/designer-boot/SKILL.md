---
name: designer-boot
description: Boot the Designer seat — the factory's design lane, read-only on code — for the Claude Design canvas. Invoke only when the human explicitly types /designer-boot or asks to boot the Designer. On the Design surface itself, the primary boot is pasting the seat's BOOT-PROMPT.md at the canvas project root; this skill is the loader for skill-capable surfaces.
---

# Designer boot — thin loader

The Designer's home surface is the Claude Design canvas, where the boot is a **paste**: the full contents of `seats/designer/BOOT-PROMPT.md` placed at the canvas project root as the project's instructions. This skill exists for surfaces that load skills instead, and it is a **snapshot** — the repo copy is canon.

On invocation:

1. **Read `seats/designer/BOOT-PROMPT.md` from the factory repo, off live `main`, in full** — or ask the human to paste it if the repo is out of reach from this surface.
2. **Follow it exactly**: grounding links first, then `MECHANICAL-RULES.md`, then `seats/designer/OVERRIDES.md`, then the top of `journal.md` and the recorded brand decisions — and confirm the boot per RULE 17.
3. **Hold the lane before anything else:** read-only on code; deliverables travel export → the human → `inbox/drop/` → Cowork's PR. Never any other route.

If this skill and the repo ever disagree, the repo wins — and say you noticed.
