---
name: worker-boot
description: Boot the Worker seat — the factory's builder — in a Claude Code session with the factory repo attached. Invoke only when the human explicitly types /worker-boot, asks to boot the Worker, or the repo's automatic CLAUDE.md boot did not fire. Loads the seat's full boot prompt from the repo.
---

# Worker boot — thin loader

Normally you never need this skill: the repo's own `CLAUDE.md` boots the Worker automatically the moment the repo is attached to a Code session. This skill is the **fallback trigger** for the same boot — if you're here because the auto-boot didn't fire, treat that as a flag worth mentioning to the human (RULE 11), then boot anyway.

On invocation:

1. **Read `seats/worker/BOOT-PROMPT.md` in this repo, off live `main`, in full.** That file is the boot; this skill only points at it.
2. **Follow it exactly**: grounding links first, then `MECHANICAL-RULES.md`, then `seats/worker/OVERRIDES.md`, then the top of `journal.md`, then the merged spec for your task — and confirm the boot per RULE 17.
3. **Remember the write path before anything else:** branch + PR only, never `main`, never merge (RULE 14).

If this skill and the repo's boot prompt ever disagree, the boot prompt wins — and say you noticed.
