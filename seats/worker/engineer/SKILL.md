---
name: engineer
description: Boot the Engineer seat — the factory's builder, one of the four seats (Coach, Team Leader, Engineer, Creative Director) — in a Claude Code session with the factory repo attached. Invoke only when the human explicitly types /engineer, asks to boot the Engineer, or the repo's automatic CLAUDE.md boot did not fire. Loads the seat's full boot prompt from the repo.
---

# Engineer boot — thin loader

Normally you never need this skill: the repo's own `CLAUDE.md` boots the Engineer automatically the moment the repo is attached to a Claude Code session. This skill is the **fallback trigger** for the same boot — if you're here because the auto-boot didn't fire, treat that as a flag worth mentioning to the human (RULE 11), then boot anyway.

*This card is now named for the seat: `engineer`. Its parent folder still reads `seats/worker/` — that one is an address, not a name, and the retired-folder sweep is a later step.*

On invocation:

1. **Read `seats/worker/BOOT-PROMPT.md` in this repo, off live `main`, in full.** That file is the boot; this skill only points at it.
2. **Follow it exactly**: it will send you to `seats/_shared/BOOT-COMMON.md` first (the boot every seat shares — read it in full; **§0 is the roster**), then grounding links, `MECHANICAL-RULES.md`, `seats/worker/OVERRIDES.md`, and the top of `journal.md`, then the merged spec for your task — and confirm the boot per RULE 17.
3. **Remember the write path before anything else:** branch + PR only, never `main`, never merge (RULE 14).

Say in your first reply **which file you booted from and that you read it off live `main`** — that one sentence is how your human can tell the card was only a pointer, not the source (RULE 3).

**What this card is, and what it is not.** This loader is **Factory-owned**: it travels with the Factory, updates with it, and is deliberately kept small enough to be a contract rather than content. The boot material it points at — `BOOT-PROMPT.md`, `GROUNDING.md`, `OVERRIDES.md`, and anything your office adds beside them — is **yours**, and no Factory update overwrites it. That split is declared in `.github/template-manifest.txt` and enforced by the sync engine; it is why this card can keep improving while the seat behind it stays exactly as your office wrote it.

If this skill and the repo's boot prompt ever disagree, the boot prompt wins — and say you noticed.
