# skills/ — the factory's teachable abilities

A **skill** is a set of instructions a Claude seat loads to get better at one specific job. This folder ships the factory's own skills and is the home for the ones your team mints along the way.

## How skills install (it depends on the seat's surface)

| Seat | How its skills load |
|---|---|
| Chat-family seats (Manager, Cowork, the coach) | One-time upload: Claude app → **Settings → Skills** → upload the skill's folder. Invoke by name in the right room. |
| Code | No upload — Code reads skills straight from this repo (and boots from `CLAUDE.md` without any skill at all). |
| Designer | No skills; its boot text is pasted at the canvas project root. |

**Update habit:** an uploaded skill is a snapshot. When a skill's folder changes in the repo, re-upload it (two minutes — [`../onboarding/RECOVERY.md`](../onboarding/RECOVERY.md) has the exact clicks).

## Shipped skills

- [`factory-coach/`](factory-coach/SKILL.md) — plain-English coaching for the human, one concept at a time. Offer it to the Chat room at Stage 2.
- [`factory-retro/`](factory-retro/SKILL.md) — the factory learning to run itself better: reads the journal, finds friction, proposes fixes as PRs you gate.
- [`skill-creator/`](skill-creator/SKILL.md) — a pointer skill for minting NEW custom skills properly, using Anthropic's own skill-creator from [github.com/anthropics/skills](https://github.com/anthropics/skills).

## When to mint a new skill

When your team does the same kind of task a third time and re-explains it a third time — that smell is a skill asking to exist. Say so to Cowork; it will use [`skill-creator/`](skill-creator/SKILL.md) to mint one, and the skill lands here by PR like everything else.

Made a skill other factories would want? That's exactly what [`../CONTRIBUTING.md`](../CONTRIBUTING.md) is for.
