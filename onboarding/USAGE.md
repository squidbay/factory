# USAGE — pacing your factory to your plan

Every paid Claude plan runs every seat. What changes with the plan is **how many seats you keep busy at once** — and pacing the factory right is the difference between smooth days and hitting your usage ceiling at 2pm.

## The honest pacing table

| Plan | Comfortable rhythm |
|---|---|
| **Pro** | One seat at a time, sequential loop, shorter sessions. Plan in the morning, build midday, audit and merge in the evening. Entirely workable — the factory was designed to idle safely between steps. |
| **Max (5x)** | Two seats working in parallel — a build running while a plan is written. The loop stops feeling turn-based. |
| **Max (20x)** | The full parallel day: multiple builds, audits, research fan-outs at once. The gate (you) becomes the only queue, which is how it should feel. |

## What's cheap and what's expensive

- **Cheap:** audits, journal entries, spec reviews, short focused build tasks, everything the human does (reading PRs costs you minutes, not tokens).
- **Expensive:** research fan-outs (many parallel searches), very long sessions that keep re-reading a big repo, and — the classic — a vague instruction at maximum effort, which buys you a thorough, expensive answer to the wrong question. Sharp instructions are the best usage optimization there is.

## Habits that keep pacing painless

- **Batch the gate.** Let PRs queue and merge them in one sitting; Cowork is briefed to batch rather than dribble.
- **One task per Code session** (it's RULE-level for a reason) — short sessions verify better *and* spend less.
- **Momentum is optional.** The repo is the memory: a factory paused for two weeks reboots clean off the journal. Never burn usage just to keep something warm.
- **Spend the strong model where it counts.** If your plan offers model choice, point the strongest one at cover-to-cover audits and load-bearing decisions; routine execution runs fine on the default. When you get temporary access to something stronger, aim it at the deepest audit you've been deferring.

## Seeing your surface — when a seat is unsure about your setup

A seat can't see its own surface — which setting is on, whether it's running on your computer or in the cloud, what a permission you granted actually covers. When that comes up, it shouldn't guess: it can ask your [Mobile Scout](../specialists/dispatch-mobile-scout.md) to open your screen — with the permission you've granted — and look, then report back what's actually there. The seat that can't see its own surface asks the one that can. It's read-only, it looks only where you point it, and nothing it finds becomes a change without a PR you merge.
