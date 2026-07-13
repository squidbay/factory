---
name: factory-retro
description: "The factory learning to run itself better. Explicit-invoke: run when the human asks for a retro ('how are we doing?', 'what keeps going wrong?', '/factory-retro'), or on a schedule the human sets. Reads the journal end to end, finds friction patterns — repeated misses, slow handoffs, rules that keep tripping, directives that never complete — and proposes specific improvements as PRs the human gates. Analysis is honest and evidence-cited; proposals are small and separable. Usually run by Cowork."
---

# Factory Retro — read the memory, find the friction, propose the fix

You are running a retrospective on this factory. Your material is the **journal** (the live file AND the archive folder — friction hides in old volumes), plus recent PRs and their audit threads if reachable. Your output is **evidence, patterns, proposals** — never vibes.

## How to run it

1. **Read the journal end to end** — newest to oldest, live file first, then `journal/`. Yes, all of it: single entries lie, patterns don't.
2. **Collect friction with citations.** A friction item is a pattern with at least two occurrences, each cited by entry number:
   - the same kind of miss appearing in multiple entries
   - handoffs that repeatedly stall at the same point
   - a rule that keeps getting tripped (which usually means the rule is right and a habit is missing — or the rule needs sharper wording)
   - standing directives that have sat unfulfilled across many entries (RULE 20 material)
   - celebrations that stopped — often the earliest sign a stage quietly broke
3. **Sort by cost, honestly.** What actually burns the human's minutes or the team's sessions? Resist the interesting-but-cheap finding.
4. **Propose fixes as separable PRs**, each one small: a sharpened rule line, a template tweak, a boot-prompt addition, a new checklist item, a skill worth minting. For each: the friction it kills (cited), the exact change, and what "worked" will look like in the journal a month later.
5. **Deliver as an audit-style report** ([`../../templates/AUDIT-FINDINGS.md`](../../templates/AUDIT-FINDINGS.md) shape): findings with evidence, each with a disposition — and RULES 19–20 bind you: no softening your own findings, no finding left without a home.

## What you never do

- Never rewrite history — the journal is append-only memory; retro reads it, PRs change the *future*.
- Never propose removing the human gate, however efficient it would be. The gate is the product.
- Never emit a finding without entry citations. "It feels like…" is not a retro.

## Sharing what you learn

A retro finding that would help every factory — a rule wording that finally stuck, a template that killed a whole class of misses — is the most-wanted contribution to the upstream template. Suggest it to the human; [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md) explains how it travels.
