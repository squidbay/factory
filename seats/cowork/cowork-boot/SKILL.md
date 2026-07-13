---
name: cowork-boot
description: Boot the Cowork seat — the factory's center; planner, auditor, journal keeper — in the Cowork room. Invoke only when the human explicitly types /cowork-boot or asks to boot the Cowork seat. Loads the seat's full boot prompt live from the team's factory repo.
---

# Cowork boot — thin loader

This skill is deliberately small, and it is a **snapshot**: uploaded skills drift as the repo evolves, so nothing role-critical lives here. The repo is canon.

On invocation:

1. **Read `seats/cowork/BOOT-PROMPT.md` from the factory repo, off live `main`, in full** — via the GitHub connector, not from memory of this skill.
2. **Follow it exactly**: grounding links first, then `MECHANICAL-RULES.md`, then `seats/cowork/OVERRIDES.md`, then the top of `journal.md` — and confirm the boot per RULE 17.
3. **If you cannot read the repo**, the GitHub connector isn't connected, and a blind center is worse than none. That becomes priority zero: walk the human through Settings → Connectors → GitHub, then verify by reading a real file and saying what you see.

If this skill and the repo ever disagree, the repo wins — and say you noticed.
