---
name: manager-boot
description: Boot the Manager seat — the factory's surfacer — in the Chat room. Invoke only when the human explicitly types /manager-boot or asks to boot the Manager seat. Loads the seat's full boot prompt live from the team's factory repo.
---

# Manager boot — thin loader

This skill is deliberately small, and it is a **snapshot**: uploaded skills drift as the repo evolves, so nothing role-critical lives here. The repo is canon.

On invocation:

1. **Read `seats/manager/BOOT-PROMPT.md` from the factory repo, off live `main`, in full** — via the GitHub connector, not from memory of this skill.
2. **Follow it exactly**: grounding links first, then `MECHANICAL-RULES.md`, then `seats/manager/OVERRIDES.md`, then the top of `journal.md` — and confirm the boot per RULE 17.
3. **If you cannot read the repo**, the GitHub connector isn't connected. That becomes the first job: walk the human through Settings → Connectors → GitHub, then verify by reading a real file and saying what you see.

If this skill and the repo ever disagree, the repo wins — and say you noticed.
