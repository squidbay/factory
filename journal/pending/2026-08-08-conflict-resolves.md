# 2026-08-08 — Worker 🤖🔧 · three conflict resolves, and one dispatch premise retracted

Dispatched by Cowork, ran LOCAL. Two repos, three jobs. Two PRs went from CONFLICTING to
green on their full gate set. The third job's premise did not survive verification and no
PR was opened for it — that retraction is the most important thing in this entry.

## factory#107 — resolved, green on 2/2

One file, one hunk: `FACTORY.md`, the heartbeat section. Took main's side wholesale, as
ruled. Main's version is strictly larger and says everything the branch's said.

**Nothing from the branch was lost, and the reason is worth recording.** This branch exists
to rename Manager → Coach. Main's heartbeat prose had *already* been written using "Coach"
independently, so taking main's side preserved the rename in that section for free. The
other four rename sites merged clean. Verified by diffing the resolved file against main:
it differs by exactly the four Manager → Coach substitutions and nothing else. Zero
occurrences of "Manager" remain in `FACTORY.md`.

| | before | after |
|---|---|---|
| head | `adf9d01` | `85b835b` |
| `budget` | *did not run* | SUCCESS |
| `secret-scan` | SUCCESS | SUCCESS |

Now MERGEABLE / CLEAN.

### The stale-green mechanism, stated correctly

The dispatch said `budget` was missing "because the conflict blocked the branch update."
That is not the mechanism. The branch's merge-base is `1bcc00d`;
`.github/workflows/boot-read-budget.yml` landed on main in `3167ec4` (2026-07-27), *after*
it. **The branch never deleted the workflow — it predated it.** Because the PR was
conflicting, GitHub could not compute a merge ref and evaluated workflows from the head
commit, which has no such file. Same remedy either way, but the cause matters: a branch
does not need to be conflicting to be missing a check. It only needs to be old.

## factory#87 — the "11 missing lines" claim is WITHDRAWN. No PR opened.

The 2026-08-08 `local-regate` entry recorded that #114 is missing 11 lines present only in
#87 — Stage 0 first contact, the three-part WRITE preflight, RULE 17 — and concluded "#87
stays open." **That entry was mine to check and it is wrong. I wrote no restoration PR
because there is nothing to restore.**

The line count was right. The reading of it was not.

**#87's entire authored change to `CLAUDE.md` is 3 insertions and 3 deletions** — the
cloud/local routing paragraph, exactly what its title says. It never authored a Stage 0
path, a preflight, or RULE 17. Those 11 lines are #87 carrying its merge-base's *older*
copy of text main has since rewritten. Diffed the other direction: **26 lines exist only on
main.** Main is strictly ahead on every one of them.

Checked each claimed-dropped item against current main by literal string:

| claimed dropped | actually in main? |
|---|---|
| `onboarding/STAGES.md` | yes |
| "You are the welcome" | yes |
| "Stage 0, exactly" | yes |
| RULE 17 / boot mark | yes |
| anchor 🏭, Cowork 🤖🧭 … | yes |
| "Prove WRITE" / `preflight-test` | yes |

And #87's own paragraph is **byte-for-byte identical in main** — extracted both and diffed;
no output. #114 did land it.

**Restoring #87's version would have been a regression, not a rescue.** Its WRITE preflight
instructs the seat to *delete* the `preflight-test` branch. Main's superseding version
documents that this is impossible — "the git proxy refuses ref-deletion outright" — and
replaces it with a dated branch name plus a named leftover. Porting the older text would
have re-armed an instruction the current text exists to retire. Its onboarding bullet
("let them choose the anchor emoji") was likewise deliberately replaced by "the roster
arrives filled in… don't ask them to choose anything."

#87 also bumps `template-version.txt` to `2026-07-25`; main is on `2026-08-01`.

**#87 left OPEN, not closed.** The dispatch authorized closing it only *after* a
replacement PR existed. No replacement is warranted, so that authorization never became
live and I did not substitute my own. It is fully superseded and safe for Andrew to close —
the disposition is his.

## factory-agent-app#3 — resolved, green on 1/1

Two conflicts, resolved in opposite directions.

**`app.json` — took main.** The branch's only *semantic* difference was retired Deep Ocean
`#0A0E14` in **two** places, not one: the app background and the Android adaptive icon.
Both now `#06171A`. The rest of the branch's diff was array-formatting churn. Checked before
discarding: the branch also added `expo-asset` to plugins, and **main had independently
added it too**, so taking main kept it. Verified by parsing both files and comparing every
leaf key — the only differences are the two retired hexes.

**`src/api/github.ts` — took the branch, corrected.** Main's docblock said `/rate_limit`
"does not itself count against the limit," which licenses the polling GitHub's docs warn
against. The branch overcorrected to "it *does* count." The docs say it does not count
against the *primary* limit but *can* count against the secondary. The docblock now says
that and points callers at the `x-ratelimit-*` headers already on every response.

Same file, no conflict cost: the inline comment above the secondary-limit handler claimed a
secondary limit "does not set `x-ratelimit-remaining: 0`". The docs include that case — now
"does not *necessarily* set."

### The fix the dispatch did not anticipate

`src/navigation/Shell.tsx` carried `rgba(0,217,255,0.12)`, a retired value, in the branch's
**new** landscape rail-tab component. Main had tokenized every other occurrence, so the
merge auto-resolved four of five; this one had no counterpart on main to merge against and
survived silently. Replaced with `colors.accentTintStrong` — same 0.12 opacity, and its own
token comment reads "active tab / rail button fill", which is precisely this use site.

**Without it the merge gate fails.** Caught by running the gate locally before pushing, not
by pushing and watching. `check` = SUCCESS at `ac2104f` (was `e1a18ef`, zero check runs —
that branch also predates `ci.yml`, which landed 2026-08-06).

**Not fixed, deliberately:** the secondary-limit backoff uses a flat 60s floor with no
exponential escalation. Real defect, but a behavior change — separate PR, own review.

### One correction to the prior entry's method

`scripts/scan-retired-values.mjs` piped through `tail` reports exit 0 even when it prints
FAIL. Run bare, it exits 1 correctly. The gate is sound; a pipeline reading it is not.

## Gate sets, counted against main — not inferred

| repo | workflows on main | trigger on `pull_request` | contexts |
|---|---|---|---|
| `squidbay/factory` | 9 | `boot-read-budget.yml` → `budget`, `guardrails.yml` → `secret-scan` | **2** |
| `squidbay/factory-agent-app` | 1 | `ci.yml` → `check` | **1** |

Both PRs are green on their *full* set, not a subset.

**One thing to take from it:** the previous entry counted lines correctly and concluded
backwards, and I nearly shipped a PR on top of it. A diff tells you two texts differ; it
never tells you which one is newer. Before treating "present only in branch X" as *lost*,
ask what X actually authored — `git diff <merge-base> <branch>` — because a stale branch and
a superseding branch look identical in a two-way diff, and only one of them is worth
restoring. The line count was never the finding. The direction was.

— Worker 🤖🔧 · Ghost's fire team · 2026-08-08
