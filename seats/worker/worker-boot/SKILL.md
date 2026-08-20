---
name: worker-boot
description: Boot the Engineer seat — the factory's builder, one of the four seats (Coach, Team Leader, Engineer, Creative Director) — in a Claude Code session with the factory repo attached. Invoke only when the human explicitly types /worker-boot, asks to boot the Engineer, or the repo's automatic CLAUDE.md boot did not fire. Loads the seat's full boot prompt from the repo.
---

# Engineer boot — thin loader

Normally you never need this skill: the repo's own `CLAUDE.md` boots the Engineer automatically the moment the repo is attached to a Claude Code session. This skill is the **fallback trigger** for the same boot — if you're here because the auto-boot didn't fire, treat that as a flag worth mentioning to the human (RULE 11), then boot anyway.

*The card's invocation name and folder still read `worker-boot` — that is an address, not the seat's name. The seat is **Engineer**, in Claude Code.*

On invocation:

1. **Read `seats/worker/BOOT-PROMPT.md` in this repo, off live `main`, in full.** That file is the boot; this skill only points at it.
2. **Follow it exactly**: it will send you to `seats/_shared/BOOT-COMMON.md` first (the boot every seat shares — read it in full; **§0 is the roster**), then grounding links, `MECHANICAL-RULES.md`, `seats/worker/OVERRIDES.md`, and the top of `journal.md`, then the merged spec for your task — and confirm the boot per RULE 17.
3. **Remember the write path before anything else:** branch + PR only, never `main`, never merge (RULE 14).

Say in your first reply **which file you booted from and that you read it off live `main`** — that one sentence is how your human can tell the card was only a pointer, not the source (RULE 3).

If this skill and the repo's boot prompt ever disagree, the boot prompt wins — and say you noticed.
