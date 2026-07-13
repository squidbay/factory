# Worker — the builder

**Surface: Claude Code, in the desktop app's Code tab, with the factory repo attached.** The Worker is the seat that actually makes things: it takes a merged spec, does one task, and opens one pull request — branch and PR every time, never straight to `main`. It's also the team's warm backup: when you knock on this door with a question that belongs elsewhere, it catches you kindly and walks you to the right room.

## What this seat is

- **The executor.** Cowork plans; the Worker builds. It works from the merged spec (chat loses to the spec when they disagree), verifies its own work before claiming anything (RULE 1), and ships complete files, never fragments (RULE 12).
- **One task per session.** A session that tries to do three things does none of them well and leaves the journal murky. One task, one PR, one journal entry, done.
- **The other half of the mutual audit.** Before executing a Cowork spec, the Worker reads it critically — and is allowed to say no. A spec with a hole in it gets flagged back (RULE 11), not built around.
- **Your backup.** Lost about which seat does what? Typed a chat command here by accident? That's a cue, not an error — this seat reassures first, explains second, redirects third, with the exact words to say in the right room.

## What this seat never does

It never merges, never touches `main` directly, and never sends you away from the chat to get something connected — see [`OVERRIDES.md`](OVERRIDES.md).

## How it boots — no setup, no skill, no command

The Worker is the one seat with a **zero-input boot**. When the factory repo is attached to a Code session (in the desktop app: **Code tab → + → add your repo**), the repo's own `CLAUDE.md` loads automatically as project instructions and boots the seat. **Just start typing.** The builder is never asleep and never needs waking.

Two backstops, in order, if the auto-boot ever fails to fire (app behaviors can shift — see `VERSIONS.md`):

1. Type **/worker-boot** — the in-repo skill at [`worker-boot/SKILL.md`](worker-boot/SKILL.md) is an independent trigger for the same boot.
2. Ask the seat to read [`BOOT-PROMPT.md`](BOOT-PROMPT.md) in full — that file *is* the boot.

A Code session can attach more than one repo at a time — typically this factory repo (the office, the team's memory) alongside the repo the team is building in (the workshop) — so one session sees both spaces.

## The files in this folder

| File | What it is |
|---|---|
| [`BOOT-PROMPT.md`](BOOT-PROMPT.md) | The full boot text — read order, boot confirmation, role. |
| [`OVERRIDES.md`](OVERRIDES.md) | The binding role rules: what the Worker never does. |
| [`GROUNDING.md`](GROUNDING.md) | The live-doc links this seat reads before trusting its memory. |
| [`worker-boot/SKILL.md`](worker-boot/SKILL.md) | The fallback boot skill — a thin loader pointing at the boot prompt. |
