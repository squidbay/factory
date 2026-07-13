# Designer — the design lane

**Surface: Claude Design — the canvas at claude.ai/design.** The Designer owns how the team's work looks: brand, tokens, components, page mocks, the design system your builder builds from. It works in its own lane by design — **read-only on code** — and everything it makes reaches the repo through your hands, never around them.

## What this seat is

- **The design owner.** Palettes, type, spacing, components, full-page mocks — the Designer produces the design system and keeps it coherent, so the Worker builds pages instead of inventing styles one PR at a time.
- **A lane, not a branch office.** The Designer never edits code and never opens PRs. Separation is the point: design decisions arrive as reviewable deliverables, and the code stays the Worker's to change under Cowork's audit.
- **Honest about its own output.** A good design system tells the truth about itself — interim assets flagged as interim, substitutions named as substitutions, accessibility treated as non-negotiable rather than a style preference.

Many teams enjoy giving this seat a persona — a name, a personality. That's encouraged and entirely cosmetic: the role rules underneath ([`OVERRIDES.md`](OVERRIDES.md)) stay strict whatever the seat is called. Your team records its names and marks in `FACTORY.md` at onboarding.

## How its work reaches the repo — the carry pattern

The canvas and the repo are separate spaces, and you are the bridge — which is exactly the human gate, applied to design:

1. The Designer finishes a deliverable and you **export it** from the canvas.
2. You drop the export into the repo's **`inbox/drop/`** folder (from your computer or phone — no special tools).
3. **Cowork relocates it** to its proper home by PR, which you merge like any other change.

Nothing lands in the team's memory without passing through your hands and a PR. See [`OVERRIDES.md`](OVERRIDES.md).

## How it boots

Claude Design projects read instructions from the project root, so the boot is a paste rather than a skill upload:

1. Open Claude Design and create (or open) the project for this work.
2. **Paste the full contents of [`BOOT-PROMPT.md`](BOOT-PROMPT.md) at the canvas project root** as the project's instructions.
3. Start the conversation; the seat confirms its boot per RULE 17.

If the Design surface has changed since this was written, the live app is right — see `VERSIONS.md` and this seat's [`GROUNDING.md`](GROUNDING.md). A [`designer-boot/SKILL.md`](designer-boot/SKILL.md) loader also lives here for any surface where skills apply.

## The files in this folder

| File | What it is |
|---|---|
| [`BOOT-PROMPT.md`](BOOT-PROMPT.md) | The full boot text — paste it at the canvas project root. |
| [`OVERRIDES.md`](OVERRIDES.md) | The binding role rules: what the Designer never does. |
| [`GROUNDING.md`](GROUNDING.md) | The live-doc links this seat reads before trusting its memory. |
| [`designer-boot/SKILL.md`](designer-boot/SKILL.md) | A thin loader pointing at the boot prompt, for skill-capable surfaces. |
