# 2026-08-08 — Worker 🤖🔧 · local re-gate, two repos, seven PRs

Dispatched by Cowork. Ran LOCAL because both repos needed a real checkout and push
credentials; Cowork's door is scoped to `squidbay/hq-factory` and cannot reach either.

## The true gate set on `squidbay/factory` — 2, not 5

Nine workflows on main; only two trigger on `pull_request`:

| workflow | job |
|---|---|
| `boot-read-budget.yml` | `budget` |
| `guardrails.yml` | `secret-scan` |

**All six open PRs showed exactly one check — `secret-scan: SUCCESS`.** Every one was missing
`budget`, because none of their branches carried `boot-read-budget.yml`. Verified directly: on
each branch, `.github/workflows/boot-read-budget.yml` did not exist before the merge and did
after. That is the stale-green mechanism, observed rather than inferred.

## Re-gated — four green on the real set

| PR | before | after | budget | secret-scan |
|---|---|---|---|---|
| factory#108 | `d2f50a7` | `a539961` | SUCCESS | SUCCESS |
| factory#111 | `6872333` | `276f259` | SUCCESS | SUCCESS |
| factory#112 | `5afef22` | `bc6e736` | SUCCESS | SUCCESS |
| factory#114 | `cd3d7d6` | `6ad9676` | SUCCESS | SUCCESS |

None went red. `squidbay/factory` did not repeat hq-factory's five-of-seven failure — its gate
set is smaller and the branches were closer to main.

## factory#107 — conflicts, diagnosed not fixed

One file, one hunk: **`FACTORY.md`**, the heartbeat section. The branch carries the older
two-paragraph description; main carries a substantially expanded version — what the pulse checks
each night, `heartbeat-watch.txt`, and an explicit statement of what a nightly runner *cannot*
see.

**Minimal fix: take main's side wholesale.** The branch's paragraph is strictly superseded — it
says less and nothing in it is absent from main's. No authoring judgement required, which is why
it is safe for someone other than the branch author to resolve.

## factory#87 vs #114 — the supersession claim is FALSE

#114's title says "rebuild of #87". Diffed both branch tips against main. Both touch the same two
files. But #114's `CLAUDE.md` is **missing 11 lines that only exist in #87**, and they are not
incidental:

- **Stage 0 first contact** — `onboarding/STAGES.md`, "You are the welcome", the anchor emoji and
  seat-naming flow, the celebrated first merge
- **The three-part WRITE preflight** — create `preflight-test`, delete it, and the explicit
  create-worked-but-delete-failed case
- **Boot mark confirmation / RULE 17**
- **Journal every session**
- **Release-first version comparison** — check the master's `releases/latest` before the raw
  version file

**#87 stays open.** Closing it would silently delete the entire first-contact onboarding path
from `CLAUDE.md` — the exact surface that generated live support load this week.

## `squidbay/factory-agent-app` #3

**Correction confirmed, and extended.** `worker/agent-posts-prs` is live at `72d216e`, unprotected
— it did NOT merge, as a previous session recorded. **But 0 commits on it are absent from main.**
Its content already landed by another route; only the branch ref survives.

**Base retargeted `worker/agent-posts-prs` → `main`.** Done.

**The rebase was not performed.** B2 asked for a rebase, but rebasing a branch this seat did not
create requires a force-push, which the dispatch fences forbid. Used `git merge origin/main`
instead — same effect on CI, no history rewrite. It conflicted, so nothing was pushed.

**This repo does have CI.** `.github/workflows/ci.yml`, job `check`, triggering on `push` and
`pull_request`. Cowork's "zero check runs" was accurate about PR #3's head never being dispatched
— not about the repo lacking CI. Those are different findings and the second one is wrong.

**Conflicts, diagnosed:**

| file | hunks | what |
|---|---|---|
| `app.json` | 2 | branch has `backgroundColor: "#0A0E14"` — a **retired** hex. main already has `#06171A`. Also formatting-only array collapse |
| `src/api/github.ts` | 1 | comment only — branch has the longer rate-limit note, main the one-liner |

**Minimal fix: take main's side on `app.json` in full.** The branch is carrying a retired brand
value that the design system's kill list now fails a build on. On `github.ts` the branch's comment
is more accurate about secondary rate limits and is worth keeping — that one is a real choice, not
a stale-vs-current.

## What this session actually proves

A rollup of SUCCESS is a statement about the checks that ran, not the checks that exist. Six PRs
read green against a gate set half the size of the real one, and nothing in the GitHub UI says so.
**Count the contexts against main before trusting any green.**

— Worker 🤖🔧 · Ghost's fire team · 2026-08-08
