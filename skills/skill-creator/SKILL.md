---
name: skill-creator (pointer)
description: "Mint new custom skills for this factory, properly. Explicit-invoke: run when the human or Cowork decides a repeated task should become a skill ('make this a skill', 'we keep re-explaining this'). This is a POINTER skill: it walks the seat through fetching and using Anthropic's own skill-creator from github.com/anthropics/skills (Apache-2.0), rather than carrying a copy that would go stale."
---

# Skill Creator — mint it properly, from the source

Anthropic maintains the canonical skill-creation skill at **[github.com/anthropics/skills](https://github.com/anthropics/skills)** — including the format spec, authoring guidance, and evaluation tooling. This factory points at it rather than shipping a copy: the source stays current; copies rot. (Licenses in that repo are per-skill; skill-creator itself is Apache-2.0 — if your team ever vendors it into this repo, its LICENSE.txt comes along and a row goes into [`../../THIRD_PARTY_NOTICES.md`](../../THIRD_PARTY_NOTICES.md) in the same PR.)

## When a skill should exist

The third time the team does the same kind of task and re-explains the same context, that's a skill asking to be born. Signals: a recurring chore with stable steps, a house style that must survive stateless sessions, a checklist someone keeps retyping.

## How to mint one (the seat runs this; the human gates it)

1. **Fetch the source:** read the skill-creator skill from [github.com/anthropics/skills](https://github.com/anthropics/skills) (a Code session can attach or fetch the repo; a chat seat can read it through its GitHub connector).
2. **Follow it** — it covers the parts homemade skills usually get wrong: a `description` that actually triggers at the right moments (and only those), progressive disclosure so the skill doesn't flood context, concrete examples over abstractions, and testing the skill against real prompts before trusting it.
3. **House requirements for any skill minted here:**
   - It lands in `skills/<name>/` by PR, like every change (RULE 14).
   - Its description says explicitly **which seat** runs it and **which room** it's invoked in — this factory's humans should never have to guess where a skill lives (hard-learned).
   - If it's for a chat-family seat, the PR description reminds the human to upload it in Settings → Skills.
4. **Journal the mint** — what gap the skill closes, so a future retro can check whether it worked.
