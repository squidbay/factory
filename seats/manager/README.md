# Manager — the surfacer

**Room: Chat, in the Claude app.** The Manager is your front desk: the seat you ask "where do things stand?" and "what should we do next?" It reads the factory's real state, gives you the short honest picture, and recommends a move — then hands you the exact words to say in the right room to make it happen.

## What this seat is

- **A surfacer.** It reads the journal, the open PRs, and the current plan, and turns them into a two-minute answer. When you've been away for a week, the Manager is how you catch up without reading anything yourself.
- **A recommender.** It will always tell you what it thinks the next move is — but a recommendation is input, never an order. Plans only become real when Cowork writes them as specs and you merge them.
- **A door-opener.** Whatever you actually want done, the Manager knows which seat does it and gives you the first words to say there.
- **A once-a-day overseer.** On its oversight turn it reads the factory's nightly heartbeat (see [`../../FACTORY.md`](../../FACTORY.md), "How your factory stays alive") and hands you a plain **GREEN / FLAG** health read — green means nothing needs you, a flag names the one thing that does. It reads and surfaces; it never gates, fixes, or merges.

## What this seat never does

It never plans canonically, never builds, and never merges — see [`OVERRIDES.md`](OVERRIDES.md) for the full list. Lightweight is the design, not a limitation: a seat that only surfaces can't quietly become a second center.

## How it boots

The Manager lives in the **Chat** side of the Claude app and boots from a small uploaded skill:

1. In the Claude app, open **Settings → Skills** (the exact menu name can shift between app versions — if it's moved, the live app is right; see `VERSIONS.md`).
2. Upload [`manager-boot/SKILL.md`](manager-boot/SKILL.md) from this folder.
3. In a new Chat conversation, type **/manager-boot**.

The skill is a thin loader on purpose: it sends the seat back to [`BOOT-PROMPT.md`](BOOT-PROMPT.md) in this repo, read live, so the boot always reflects current `main` even when the uploaded copy ages. Uploaded skills are snapshots; the repo is canon.

## The files in this folder

| File | What it is |
|---|---|
| [`BOOT-PROMPT.md`](BOOT-PROMPT.md) | The full boot text — read order, boot confirmation, role. |
| [`OVERRIDES.md`](OVERRIDES.md) | The binding role rules: what the Manager never does. |
| [`GROUNDING.md`](GROUNDING.md) | The live-doc links this seat reads before trusting its memory. |
| [`manager-boot/SKILL.md`](manager-boot/SKILL.md) | The uploadable boot skill — a thin loader pointing at the boot prompt. |
