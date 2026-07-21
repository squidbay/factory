# Authorized workflows — one approval for a chain, not a gate at every hop

**This page describes a direction, not a feature that ships today.** Nothing here is built yet.
It's written down so the idea is concrete, its guardrails are argued before any code exists, and
you can always tell what your factory *does* from what it *might do later*. If a seat ever tells you
"authorized workflows are on," check it against this page — and against the live app, which outranks
this repo whenever the two disagree (see [`../VERSIONS.md`](../VERSIONS.md), the empirical rule).

## What your factory does today

Every change moves through the loop one gated step at a time, and that is deliberate. Cowork plans
and writes the spec; Code builds against it and opens a pull request; Cowork audits that PR; **you**
read it and merge. Visual work comes in through Design's carry pipe as its own reviewed change. Each
hop is a place you can see what happened, ask a seat to explain it, and stop. The taps are not
overhead — they are the audit trail, made of moments where a human could have said no.

The cost of that is real: a change that passes through four seats can mean four things to look at
before the thing you asked for is done. For a big or unfamiliar change, that is exactly right. For
the tenth run of a chain you already trust, it can feel like signing the same delivery four times.

## The idea

An **authorized workflow** is a named chain of steps — say **plan → build → design → audit →
install** — that you approve **once**, ahead of time. The seats then run the whole chain on their
own and converge to a **single pull request** at the end: the finished change, with the audit notes
from every hop gathered in one place, for you to read once and merge. Fewer approvals; the same
finish line; the same person deciding whether it ships.

It is a shortcut through the *middle* of the loop, never around its *end*.

## What would not change — the two hard lines

These do not move, in any version of this idea:

- **The merge button never moves.** A chain can plan, build, design, and audit; it can prepare a
  pull request down to the last detail. It can never merge that PR, never write `main`, and never
  deploy. The last step — the one that makes a change real — stays a human's, exactly as it is now
  (RULE 14). "Install" in the chain means *prepare the install as a reviewable change*, not *perform
  it unattended*.
- **Secrets stay human-only.** No chain ever touches a credential value. Connections, signing keys,
  and tokens remain yours, created under your accounts and kept in the host's secret store — never
  in the repo, never in a chat, never handled by the chain. A workflow can ask you for a connection;
  it can never hold one.

## Today vs. what this would add

| | Today (per-seat) | Authorized workflow (someday, opt-in) |
|---|---|---|
| Your approvals per run | One at each seat hop | One, up front, plus the final merge |
| What you review | Each step, as it happens | The gathered result, once, at the end |
| Where a seat can be stopped | At every hop | At any hop — the chain stays interruptible |
| The merge button | Human-only | Human-only (unchanged) |
| Secrets | Human-only, in the secret store | Human-only, in the secret store (unchanged) |
| Audit trail | Each PR | One PR carrying every hop's notes |

The row that matters most is the last two: the parts people worry about — who merges, who touches
secrets — are the parts this **does not touch**.

## The trust prerequisites — before this could ever default on

An authorized workflow is only as safe as the weakest seat in the chain, so it earns "on" the same
way everything here does: by proving itself first. Before it could be anything other than a
deliberate, per-chain opt-in, all of this has to be true:

1. **Each seat is boringly reliable on its own.** A chain multiplies a single seat's error rate
   across every hop. Until each step is trustworthy alone, chaining them just compounds the risk.
2. **The chain writes a complete, readable audit trail.** Every hop records what it did and why, in
   plain words, gathered into the one PR — so "what happened in there?" is a one-minute read, not a
   forensic dig.
3. **Authorization is scoped and specific.** You approve *this* chain, on *this* repo, for *these*
   actions — never a blanket "seats may now run themselves." A different chain is a different yes.
4. **A stop always works.** You can interrupt a running chain at any hop and get back a clear picture
   of where it was — no black box, no point of no return.
5. **It only ever produces a pull request.** The chain's single output is a reviewable change. It
   never merges, deploys, or acts on the live world (RULE 1 — the human verifies the result before
   it's real).
6. **The final gate is immovable and un-delegatable.** No setting, no seat, and no chain can hand the
   merge to anything but a human. If a version of this could ever check the box for you, it is the
   wrong version.

## Why it isn't on today

The per-seat gates are how this factory earns trust in the first place, and trust is the thing an
authorized workflow spends. Until each hop is dull and dependable and the audit trail is complete,
the extra approvals are the feature, not the friction — they are where a person catches the thing a
seat got subtly wrong. This is a *someday, opt-in, one-chain-at-a-time* direction, never a
*default-on, found-out-later* one. When it does arrive, it will arrive the way everything here does:
as a change you read, and merge, on purpose.
