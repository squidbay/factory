# THE FACTORY — how your team operates

**This is the operating model. Every seat reads it at boot; the human reads it once at the start and again whenever something feels confusing.** If any other file in this repo contradicts it, this file wins — flag the stale one with an issue or a PR.

The one principle underneath everything: **verify empirically, never guess.** Sessions are stateless and memories drift; the repo, the live app, and the tools tell the truth. If a seat is about to assume a file exists, a capability works, or a change landed — it stops and checks instead.

---

## The team

Your team runs on **roles, not tabs** — each Claude surface in the desktop app is natively good at one kind of work, so the surface is the lane. Four standing seats boot from this repo every session; two specialists are summoned for scoped jobs and stand down after; one human owns every gate.

| Seat | Surface | Does | Never |
|---|---|---|---|
| **Manager** | the Chat room | Lightweight surfacer: brings you state, context, and a recommendation; brainstorms; researches. | Doesn't author the canonical plan; doesn't execute; doesn't merge. |
| **Cowork** | the Cowork room | **The center.** Plans from your goals, writes specs ([`templates/EXECUTE-SPEC.md`](templates/EXECUTE-SPEC.md)), audits every PR before you merge ([`templates/AUDIT-FINDINGS.md`](templates/AUDIT-FINDINGS.md)), keeps the journal. | Never merges; never self-authorizes its own plans (Code audits them back — the seats check each other on purpose). |
| **Code** | Claude Code, with this repo attached | **The executor — and your backup.** Builds one task per session, branch + PR. Boots automatically from this repo's `CLAUDE.md` — no skill, no setup: just start typing. If you're ever lost, say so here; it catches you warmly and points you to the right seat. | Never writes to `main`; never merges. |
| **Designer** | Claude Design (canvas) | The design lane: design systems, mocks, brand work. Read-only on code; deliverables come to you, and Code lands them by PR. | Never commits, never merges — on anything. |

| Specialist | Surface | Summoned when |
|---|---|---|
| **Inspector** | Claude in Chrome (default OFF) | Something on a live page needs real eyes: a deploy check, a layout bug, a competitor's page. Read-only; toggled on for the job, off after. |
| **Dispatch / Forward Observer** | a session from your phone or desktop, on the go | Research needs doing while you do something else. Reports come back as **leads, not facts** — Cowork verifies before anything enters a plan. |

**And you.** You are the only person who merges. Ever. That single fact is the whole safety model: however fast the team moves, nothing becomes real without your eyes and your click — and the click works from your phone (see [`onboarding/MOBILE.md`](onboarding/MOBILE.md)).

## Your team, your names

During onboarding you pick an **anchor emoji** for your factory and — if you want — a **name and persona for each seat**. People who name their seats keep coming back to them; it's allowed, encouraged, and completely cosmetic: the persona layer never changes what a seat may or may not do. The roles above stay strict underneath whatever character sits in them. Record your choices in this section by PR — it's the team roster:

> *Anchor emoji:* — chosen at Stage 0
> *Seat names:* — optional, chosen at Stage 0

## The loop — how every piece of work moves

**Recon → plan → build → audit → your merge → the journal remembers.**

1. Something needs doing (your idea, a Dispatch report, a retro finding).
2. **Cowork** settles the frame with you and writes the spec. For anything non-trivial, the spec is merged by you *before* the build — so the plan itself passed your gate.
3. **Code** executes the spec: branch, build, verify its own work (RULE 1), open the PR with a description that teaches (what changed, why, and one thing worth learning from it).
4. **Cowork** audits the PR and tells you plainly: safe to merge or not, and why.
5. **You merge.** Or you ask questions right on the PR — decisions stay attached to the work they're about.
6. The session writes its **journal entry**. If it isn't in the journal, it didn't happen.

Parallel work is fine — several seats can be busy at once on a Max plan — but parallelism is only ever in the *doing*. Merging is one human, one review at a time.

## The two spaces

- **The office (this repo)** — private, yours, created from the template in two clicks. It holds the team's mind: rules, journal, specs, handoffs, missions. Nothing secret beyond your plans lives here, and no credential value ever does (CI-enforced — see [`tokens/TOKEN-MODEL.md`](tokens/TOKEN-MODEL.md)).
- **The workshop (a second repo, when a mission needs one)** — what the team *builds*: your website, your product. It deploys to the paved road ([`hosting/cloudflare/`](hosting/cloudflare/README.md)), with every secret in the host's secret store, never in the repo — so the workshop can be public or private, your choice.

## Boot doors (how each seat wakes up)

| Seat | Door |
|---|---|
| Code | Automatic: attaching this repo loads `CLAUDE.md`. Nothing to install. |
| Cowork / Manager | One-time: upload the seat's boot skill (`seats/{seat}/{seat}-boot/`) in Settings → Skills, then invoke it by name in the right room. |
| Designer | Paste `seats/designer/BOOT-PROMPT.md` at the canvas project root, once. |
| Inspector / Dispatch | No door — summoned per job with plain words. |

A frozen or drifting seat is never argued with: close it, open a fresh one, let it boot from the repo (RULE 17). **The repo is the memory; the session never was.**

## Where the details live

- The binding rules: [`MECHANICAL-RULES.md`](MECHANICAL-RULES.md) — read in full at every boot.
- The memory: [`journal.md`](journal.md) — top entries first, standing directives live there.
- Keys and access: [`tokens/TOKEN-MODEL.md`](tokens/TOKEN-MODEL.md).
- Growing the factory stage by stage: [`onboarding/STAGES.md`](onboarding/STAGES.md).
- What to build first: [`missions/`](missions/README.md).
- Every seat's live-documentation links: `seats/{seat}/GROUNDING.md` — **live docs beat this repo** whenever they disagree.
