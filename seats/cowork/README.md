# Team Leader — the centre

**Room: Cowork, in the Claude app.** Team Leader is the seat the whole factory turns around: it plans the work, writes the specs Engineer executes, audits every PR before you merge it, and keeps the journal that is the team's memory. When you wonder "who's actually running this?", the honest answer is: you are — and Team Leader is the seat that makes running it take ten minutes a day.

*The card here is named for the seat and invokes as `/team-leader`. This folder is still addressed `seats/cowork/` — that is an address, not a name, and the **Cowork room** is the room the seat sits in.*

## What this seat is

- **The planner.** Missions become specs here — written to [`templates/EXECUTE-SPEC.md`](../../templates/EXECUTE-SPEC.md)'s shape, complete enough that a fresh Engineer seat can execute them without asking a single question. Specs are drafts until you merge them.
- **The auditor.** Every PR Engineer opens gets a Team Leader audit ([`templates/AUDIT-FINDINGS.md`](../../templates/AUDIT-FINDINGS.md)) before it reaches your merge button. You review the audit; the audit reviews the work. That's how a non-technical person merges with confidence.
- **The memory keeper.** Team Leader owns the journal habit: every working session ends with an entry, standing directives live there, and every seat re-reads the top at boot. If it's not in the journal, the factory doesn't remember it.

## The check on the centre

A centre that grades its own homework isn't a centre, it's a risk. So the audit runs **both ways**: Team Leader audits Engineer's PRs, and Engineer audits Team Leader's plans back before executing them. Team Leader never self-authorizes — its specs and its audits are all drafts until you merge. See [`OVERRIDES.md`](OVERRIDES.md).

## How it boots

Team Leader lives in the **Cowork** side of the Claude app and boots from a small uploaded skill:

1. In the Claude app, open **Settings → Skills** (menu names can shift between app versions — the live app is right; see `VERSIONS.md`).
2. Upload [`team-leader/SKILL.md`](team-leader/SKILL.md) from this folder.
3. In a new Cowork conversation, type **/team-leader**.

The skill is a thin loader on purpose: it sends the seat to [`BOOT-PROMPT.md`](BOOT-PROMPT.md) in this repo, read live, so the boot always reflects current `main`. Uploaded skills are snapshots; the repo is canon — which is also why standing orders travel through the journal, never through skill re-uploads.

## The files in this folder

| File | What it is |
|---|---|
| [`BOOT-PROMPT.md`](BOOT-PROMPT.md) | The full boot text — read order, boot confirmation, role. |
| [`OVERRIDES.md`](OVERRIDES.md) | The binding role rules: what Team Leader never does. |
| [`GROUNDING.md`](GROUNDING.md) | The live-doc links this seat reads before trusting its memory. |
| [`team-leader/SKILL.md`](team-leader/SKILL.md) | The uploadable boot skill — a thin loader pointing at the boot prompt. |
