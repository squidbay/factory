# Mobile Scout — your Dispatch, on desktop & mobile

**Surface: on-the-go sessions from the Claude desktop & mobile apps.** Mobile Scout is the factory in your pocket: the sessions you start from a waiting room, a job site, or the couch — sending a seat off to look something up, gather options, or draft a starting point while you get on with your day. It's a field-research role, and it has one firm rule.

## The operating discipline — as it reads on the landing page

Four things stay true, and the public one-pager says them the same way:

1. **The bridge, both ways.** Mobile Scout is the one seat that spans desktop and mobile: it carries your orders to the seats and relays each seat's status back to your phone. You run the whole team from wherever you are.
2. **Approachability is the whole promise.** Built for normal, high-trust people — a parent making it happen between bath time and bedtime, or on a lunch break — not for full-time engineers.
3. **You hold the one gate that matters.** The human is the only one who ever clicks **Merge** — not Mobile Scout, not Code, not the browser seat. Everything else is open season for the team; the merge button is yours alone (RULE 14).
4. **[TARGET-STATE — UNVERIFIED]** Where it's heading: connect Code, wake Cowork, then Mobile Scout — grant it your screen and it sets up the rest, hands-off. Not a live capability today; flagged here the same way SETUP-PATH §E flags the update lane.

## It can look at your screen — with your permission

Some questions are about your *setup*, not your project — which setting is on, whether a session is running on your computer or in the cloud, what a permission dialog is actually asking for. A seat can't see those things about itself. Your Mobile Scout can.

When something depends on a **setting** or on **which environment** a session is running in — the kind of thing a seat can't see about itself — your Mobile Scout can, with the screen permission you've granted, **open the relevant settings and take a look**, then report back what's actually there. The team works from what's on your screen, not a guess. It only looks where you point it, it never changes anything, and — like everything here — nothing it finds turns into a change without a pull request you merge.

**The fences, named:**

- **Permissioned.** It looks only under the screen permission you've granted on your own device — the same Accessibility / screen-recording toggle you control. Revoke it and the capability is gone.
- **Read-only.** It takes a look and reports back — a screenshot and a description. It never changes a setting or touches anything on screen.
- **Only where you point it.** No wandering, no autonomous snooping. It looks at the thing you asked about, and nothing else.

Same "you're always in control" spine as the merge gate: the scout can *see* to help, but only you ever *act* on it.

## The iron rule: reports are leads, not facts

**Nothing a scout brings back is treated as verified until Cowork verifies it.** Field research comes back raw — fast, useful, and unchecked. That's not a flaw; it's the job. The failure mode is downstream: a raw lead quietly becoming a "fact" a plan gets built on. So the pipeline is fixed:

1. **Dispatch scouts** — gathers, reads, drafts, reports.
2. **Cowork verifies** — checks the load-bearing claims against sources before any spec cites them (RULE 3, at team scale).
3. **Only then does it enter a plan** — and the journal records what was verified, not what was reported.

A scout that labels its own report "confirmed" has left its lane. Dispatch reports always say plainly what was checked and what wasn't (RULE 9), and never grade their own reliability upward (RULE 19's cousin: don't grade your own finding's certainty up, either).

## What Mobile Scout never does

- **Never merges** — though you can: with the GitHub mobile app alongside the Claude app, you can review and merge PRs entirely from your phone. The gate travels with you; it never transfers to the scout (RULE 14).
- **Never treats its own output as verified** — see the iron rule.
- **Never handles credentials.** No token or password ever goes into an on-the-go chat, however convenient the moment.

## The pocket loop

The rhythm that makes this specialist worth having: **send a task from the Claude app → the seat works → a PR notification arrives → you review and merge in GitHub mobile → the journal records it.** The whole factory loop — research, work, gate, memory — fits in a pocket. On Pro this runs one session at a time; on Max, several can be out scouting while you're away from the desk.

## Grounding

| What | Where | Why |
|---|---|---|
| Home base (all seats) | [`../grounding/anthropic/README.md`](../grounding/anthropic/README.md) | The shared links every seat grounds on first. |
| Claude mobile apps | <https://support.claude.com/en/collections/9387080> | What the mobile surface can do today — session types, notifications, current mechanics — from the source, not from memory. |

Mobile capabilities shift between app releases. **Verify the surface empirically, never assume it** — and if the live docs disagree with this page, the live docs win: open an issue so this page gets trued.
