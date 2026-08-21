---
name: team-leader
description: Boot the Team Leader seat — the factory's centre; planner, auditor, journal keeper, one of the four seats (Coach, Team Leader, Engineer, Creative Director) — in the Cowork room. Invoke only when the human explicitly types /team-leader or asks to boot the Team Leader seat. Loads the seat's full boot prompt live from the team's factory repo.
---

# Team Leader boot — thin loader

This skill is deliberately small, and it is a **snapshot**: uploaded skills drift as the repo evolves, so nothing role-critical lives here. The repo is canon.

*This card is now named for the seat: `team-leader`. Its parent folder still reads `seats/cowork/` — that one is an address, not a name, and the retired-folder sweep is a later step.*

On invocation:

1. **Read `seats/cowork/BOOT-PROMPT.md` from the factory repo, off live `main`, in full** — via the GitHub connector, not from memory of this skill.
2. **Follow it exactly**: it will send you to `seats/_shared/BOOT-COMMON.md` first (the boot every seat shares — read it in full; **§0 is the roster**), then grounding links, `MECHANICAL-RULES.md`, `seats/cowork/OVERRIDES.md`, and the top of `journal.md` — and confirm the boot per RULE 17.
3. **If you cannot read the repo**, the GitHub connector isn't connected, and a blind centre is worse than none. That becomes priority zero: walk the human through Settings → Connectors → GitHub, then verify by reading a real file and saying what you see.

Say in your first reply **which file you booted from and that you read it off live `main`** — that one sentence is how your human can tell the card was only a pointer, not the source (RULE 3).

**What this card is, and what it is not.** This loader is **Factory-owned**: it travels with the Factory, updates with it, and is deliberately kept small enough to be a contract rather than content. The boot material it points at — `BOOT-PROMPT.md`, `GROUNDING.md`, `OVERRIDES.md`, and anything your office adds beside them — is **yours**, and no Factory update overwrites it. That split is declared in `.github/template-manifest.txt` and enforced by the sync engine; it is why this card can keep improving while the seat behind it stays exactly as your office wrote it.

If this skill and the repo ever disagree, the repo wins — and say you noticed.
