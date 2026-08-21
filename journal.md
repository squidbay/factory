# Journal — the factory's memory

**Newest entry first. Every working session adds one: WHAT was done, WHY, and one thing the human should take from it.** Seats are stateless — they wake up blank, do one job, and disappear. This file is what survives. Reading the top two or three entries is how anyone, human or Claude, catches up. If it's not in the journal, the factory doesn't remember it.

Standing directives — the human's active orders to the team — live in the newest entries and stay in this file until fulfilled or withdrawn. Older history rolls into [`journal/`](journal/README.md) when this file grows past ~20 entries.

---

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

## 2026-07-27 — Code 🤖🔧: the README's update story was the stale part

**What changed.** Four corrections to the front page.

1. **"Four specialized seats" now names them** — Cowork, Code, Designer, Coach — and the team bullet
   says "Coach" instead of "Chat," matching the rename.
2. **The update lane is written end to end.** It said only "Updates ride GitHub Releases — watch
   Releases." That's the announcement, not the mechanism. It now says the thing that actually matters:
   **`squidbay/factory` is the one known-good master and every copy updates from it**, by three routes
   that all end in a pull request you merge — ask your Code seat, wait for the monthly workflow, or be
   told by the nightly heartbeat.
3. **The heartbeat is listed as something you get**, now that it exists.

**Why.** A person reading the front page could learn that updates exist and still have no idea how to
get one. "Watch Releases" tells you when to feel behind; it doesn't tell you what to do about it.

**One thing to take from it.** A feature page that describes the notification but not the action is
half a sentence. The reader's next question is always *"so what do I do?"* — answer it on the page.

## 2026-07-27 — Code 🤖🔧: four boot cards became one shared file plus four thin overlays

**What changed.** `seats/_shared/BOOT-COMMON.md` now carries everything the four seat cards had been
repeating: naming the repo you booted from, the shared read order, the oversized-read STOP, the
door-fails routing, the boot receipt that replaces the decorative seal, the banned "not a blocker"
vocabulary, the write path, and the iron rules. Each card shrank to a seat overlay — identity, what
that seat adds, where its lane ends. Cards are down 47% (34,324 → 18,018 characters).

**Manager is now Coach**, everywhere: `seats/manager/` → `seats/coach/`, `/manager-boot` →
`/coach-boot`, and every reference across the docs and workflows.

**The collision the rename exposed.** A `factory-coach` skill already existed — "you are the coach of
this factory" — living in the same Chat room the renamed seat lives in. Two Coaches in one room. It
is now written as one thing: the skill is **the Coach seat's teaching mode**, the same way
`factory-security` is Cowork's audit capability rather than a separate seat.

**Why the split matters more than the tidiness.** A shared rule pasted into four cards was four edits
to fix — and for seats booting from a hand-installed skill, a desktop re-save before the fix reached
the human at all. So the copies drifted, and the same paragraph said different things in different
cards with no way to tell which was current. **A shared boot fix is now one PR and no re-save.**

**One thing to take from it.** The seal was the tell. A mark at the end of a boot proves nothing —
a seat that skipped every read can print an emoji just as easily as one that did them. Replacing it
with a receipt that names the repo, the read-order status, and the tools actually probed turns an
unfalsifiable flourish into something a human can check in one second.

## 2026-07-27 — Code 🤖🔧: the nightly heartbeat every factory was already promised

**What changed.** `FACTORY.md` has been telling every customer that "once a night, a lightweight
housekeeping run takes the factory's pulse... every copy of this factory runs it." **No such
workflow existed.** It does now: `.github/workflows/heartbeat.yml`, read-only, nightly, plus
`.github/heartbeat-watch.txt` for a team's own watches.

Each night it reports: whether the factory is behind the master template (both version signals,
newest wins — the same logic the update path now uses), the published version of the Anthropic
surfaces each seat runs on, whether `journal.md` has grown past one-call readable, and anything on
the team's watch list. It ends GREEN or FLAG × N.

**The honest half.** A CI runner has no Claude installed, so it cannot read which desktop build or
plugins a human has. Rather than guess, the report marks those legs **session-captured** and hands
them to the seats, which already probe their own surface at boot. Overstating a pulse's reach is
worse than having no pulse.

**Why it matters.** A promise in a shipped doc that no code keeps is worse than a missing feature —
customers plan around it. This one had been promised to every copy of the factory.

**One thing to take from it.** When you find a doc describing something that doesn't exist, the
fix is a choice: build it or delete the sentence. Leaving it is how a factory quietly lies to the
people who trusted it.

## 2026-07-27 — Code 🤖🔧: the update path had two dead checks, both silent

**What changed.** Two bugs on the path a factory uses to stay current, plus the prose that
described them.

1. **`guardrails` never scanned for private keys.** The `private_key_block` pattern begins
   `-----BEGIN`, and the scan passed patterns to `grep` without `-e` — so grep read it as
   *options*, exited 2 with "unrecognized option," and the trailing `|| true` turned that error
   into a clean result. Fixed with `-e`, and the root cause fixed too: the scanner now separates
   grep's exit 1 (no match) from exit 2+ (the scan failed to run) and fails the job on the latter.
2. **The "is my factory up to date?" check was wrong in both directions.** It read the template's
   Release tag first and only consulted the raw version file if no release could be read at all.
   Those two are written by two different human acts, so between a merge and a release cut they
   disagree — live today: Release `2026-07-23.4`, version file `2026-07-26`. An office on the
   Release tag was told "up to date" with three days of merged work unshipped; an office genuinely
   current was told an update was waiting on every run. Now it reads both and takes the newer,
   with `sort -V` so `.10` beats `.2`.

**Why it matters.** Both failures presented as *green*. A guardrail that can't tell "found nothing"
from "didn't run" reports the same word for both, and that word is reassuring.

**One thing to take from it.** `|| true` on a scanner is not error handling — it is deleting the
error. If a check's failure mode looks identical to its success mode, the check is decoration.

## 2026-07-27 — Code 🤖🔧: the journal roll rule becomes mechanical

**What changed.** The template's roll rule now triggers on **bytes, not entry count** (~40,000
characters), the pending-file rule that keeps parallel seats from colliding on `journal.md` is
written down where every seat reads it, and a new `boot-read-budget` check measures every
boot-required file on every pull request — warning at 40,000 characters, failing at 45,000.

**Why.** The old "~20 entries" trigger was written down, sincerely followed, and still failed: dense
entries blew the one-call read limit at around fourteen entries, and for several days every seat was
booting against a journal it could not read to the end. Standing directives inside an unreadable
file are standing directives nobody is following, and nothing announces it. A count doesn't measure
the thing that breaks; bytes do.

**One thing to take from it.** Writing a budget down is not enforcing it — the first version of this
rule *was* documentation, and documentation is exactly what let the file grow past readable. The
check is the difference between a rule and a habit.

## #2 — 2026-07-26 — The inbox learns to speak to the seats

**What:** `inbox/drop/` now converts what you put in it. A new step, `.github/workflows/drop-convert.yml`, watches that folder; when a binary lands without a readable twin, it writes one beside the original — `Profile.pdf` becomes `Profile.pdf.md` — and opens a pull request with it. PDFs go through `pdftotext`, Word documents through a built-in reader, and images get a note saying a seat has to *look* at them. Originals are never deleted, moved, or edited, and the job fails on the spot if one changes. `inbox/drop/README.md` explains it for someone who has never opened a terminal, and all four seat boot prompts gained the same instruction: check for a `.md` sidecar before ever telling the human you can't read a dropped file, and dispatch the conversion yourself if there isn't one.

**Why:** The chat seats read this repo as text. A PDF, a photo, a scan — to them that is unreadable bytes, and nothing in the system said so out loud. A person could follow the drop procedure perfectly and the team would silently have no idea what was in the file. That is exactly what happened upstream: a resume PDF was merged into `inbox/drop/` for a seat that could never open it. The fix had to be a conversion step, not a rule telling humans to convert things themselves — a chore handed back to the human is not a fix.

**One thing to take from it:** *When a system can't do something, make it say so — or better, make it do the thing.* The failure here wasn't that seats can't read PDFs; that's just a fact. The failure was that the gap was **silent**. Anywhere your factory quietly can't see something, you'll eventually spend an evening confused about why nothing works. Look for the silence, not just the errors.

— Code / Worker seat 🤖🔧

## #1 — 2026-07-13 — The factory opens its books

**What:** The discipline core landed: the twenty mechanical rules, this journal and its archive shelf, the four working templates (execute spec, audit findings, session handoff, journal entry), the guardrails CI that keeps credentials out of the repo from day one, and VERSIONS.md — the honesty page about what this template was last verified against.

**Why:** Rules before features, memory before work. Every seat that ever boots here reads the rules and the top of this journal first — so those had to exist before anything else did. A factory that starts with its discipline never has to retrofit it.

**One thing to take from it:** This entry is the format working. Three parts, plain words, newest on top. Your team will write one of these at the end of every session — and six months from now, when you wonder why something is the way it is, the answer will be in here.

— Code seat, at the factory's first light
