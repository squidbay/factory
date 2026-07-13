# Template — execute spec

**Written by Cowork; executed by Code; merged (as a spec, before any build) by the human.** The committed spec is the single source of truth for a task: if chat and the spec disagree, the spec wins — fix the spec first, then build (RULE 3 applied to plans). A Code seat handed a task with no merged spec stops and asks, unless the task is trivial and the PR says so plainly.

---

```markdown
# EXECUTE — <task name>

**Authored by Cowork, YYYY-MM-DD. Executor: <seat>. DRAFT until the human merges this spec.**

## Mission (one line)
<What done looks like, in one sentence.>

## Why now
<Which plan/strategy priority this serves. One paragraph, plain words.>

## Gates and fences
- <Hard rules for this task: what must be true before starting, what is untouchable.>
- <Files or systems this task must NOT modify.>

## The work
1. <Operation, exact file paths, exact expected outcome.>
2. <…every step a fresh seat could follow without asking questions.>

## Verification (the done-gates)
- [ ] <Empirical check #1 — a thing the executor OBSERVES, not assumes (RULE 1).>
- [ ] <Check #2. Paste actual output in the PR description.>

## Out of scope (each with an owner + a when — RULE 20)
- <Item> — owner: <who>, when: <named trigger or date>.

## PR description template
<WHAT / WHY / one-thing-to-learn skeleton the executor fills in.>
```
