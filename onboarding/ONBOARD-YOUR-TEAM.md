# Boot your team — in order, one seat at a time

You don't build with this factory by talking to one Claude. You build with a
**team**, and the team has an order it comes online in. This page gives you the
exact words to paste for each seat, and the reason each one comes when it does.
No coding, no settings spelunking — copy, paste, wait for it to answer, move on.

**Your team is four seats: Coach, Team Leader, Engineer, Creative Director.**
(Dispatch and Claude in Chrome turn up later — they're *tools* the team reaches
for, not a fifth and sixth teammate.)

**Why order matters:** the builder (Engineer) never works alone, because a lone
builder has no one to plan the work or check it. So the leader comes first, the
design lane comes when there's something to look at, and the builder comes last —
building only what the leader has specced and what gets checked before it reaches
you. That's the whole safety of the thing: nobody on this team blesses their own
work.

> **Before any of this: connect GitHub.** Every seat below reads this repo through
> the GitHub connection. If you haven't done that yet — or a seat says it can't
> see your repo — stop and do [`CONNECT-YOUR-CLAUDE.md`](CONNECT-YOUR-CLAUDE.md)
> first. It's two minutes and it's the thing everything else rides on.

---

## 1 · Team Leader — the leader (boot this one first)

**The room:** the **Cowork** room in the Claude app.
**One-time setup:** Settings → Skills → upload the `team-leader` skill (Stage 2 of
[`STAGES.md`](STAGES.md) walks you through this if you haven't). *The card is still
named for the room; the seat is Team Leader.*

**Paste this into the Cowork room:**

```
Boot as the Team Leader seat of my factory. Read seats/_shared/BOOT-COMMON.md and
seats/cowork/BOOT-PROMPT.md in
this repo, in full, and follow its boot order exactly before your first real
reply — ground on the live docs, read the mechanical rules, read the top of
the journal, and confirm your boot. Then read my journal back to me in your
own words so I know you can really see the repo. After that, I'll tell you
what we're building and you'll lead it.
```

**Wait for it to read your journal back to you.** That's the proof it's truly
connected — not "it should be." Until it does that, don't move on. 🎉

---

## 2 · Creative Director — the look (boot when your project has a visual side)

Skip this one if your first mission is text-only; add it the day you need a look.
**Team Leader tells you when it's time and writes the brief** — you don't have to guess.

**One-time setup:** add the `creative-director` skill via the **Claude Design canvas skill picker** (live as of 2026-07-23) — the same one-time, invoke-by-name shape as your Team Leader and Coach seats. (Prefer pasting the boot file? The block below still works.)

**The room:** the **Claude Design** canvas.
**Paste this at the top of a new Design session:**

```
Boot as the Creative Director seat of my factory. Read seats/_shared/BOOT-COMMON.md
and seats/designer/BOOT-PROMPT.md in
this repo, in full, and follow its boot order before your first deliverable.
You are read-only on code and deliver through me — export your work and I'll
carry it into the repo's inbox/drop/ folder for Engineer to place by PR. Team
Leader has a brief for you; I'll paste it next.
```

Then paste the brief Team Leader gave you. Creative Director's finished work leaves
the canvas as an export **you** carry in — the same gate as everything. 🎉

---

## 3 · Engineer — the builder (already awake; it works last, not first)

**The room:** the **Code** tab, with this repo attached.
**No paste needed** — Engineer boots itself the moment the repo is attached, and it
proves its own access before doing anything.

Here's the part people get backwards: **Engineer does not start the building.** It
builds what **Team Leader has specced** and what gets **checked before it reaches you**.
If you ask Engineer to build something before Team Leader has booted, Engineer will
stop and walk you back here — that's it doing its job, not refusing yours. Once
there's a merged spec, Engineer turns it into a pull request for you to merge. 🎉

---

## 4 · Coach — the briefer (optional, light, add anytime)

**The room:** the ordinary **Chat** room.
**One-time setup:** Settings → Skills → upload the `coach` skill.
**Paste this into a Chat room:**

```
Boot as the Coach seat of my factory. Read seats/_shared/BOOT-COMMON.md and
seats/coach/BOOT-PROMPT.md in
this repo, in full, and follow its boot order. Then give me a one-paragraph
state-of-the-factory from what you actually read — journal top, open PRs, the
current spec — not from memory.
```

Coach briefs and recommends; it never holds the pen on plans (that's Team Leader).
Useful precisely because it's light. 🎉

---

## Keeping the boot cards current — it goes both ways

The four boot skills you upload in Settings are **snapshots**. The repo keeps changing; a
snapshot doesn't. So there are two ways for your team to quietly fall out of date, and they
need different answers.

**Direction 1 — a fix that never reaches the deployed card is not a fix.** You merge an
improvement to how a seat behaves, and the seat keeps behaving the old way, because what it
actually loads is the copy sitting in Settings. **Your factory already closes most of this by
design:** every boot card is a *thin loader*. It holds almost nothing — it tells the seat to go
read `seats/{seat}/BOOT-PROMPT.md` **off live `main`, in full**, and to follow that. So when you
merge a change to a boot prompt, the seat's grounding, or its overrides, **every already-installed
card picks it up on its next boot.** Nothing to re-upload. That's the whole reason the cards are
built that way, and it's worth knowing so you don't re-upload after every merge.

**What that does *not* cover** is the card's own text: its `description` line (which decides when
the skill fires at all) and its three loader steps. Those live only in the copy in Settings. **If
a pull request changes a file under `seats/*/{seat}-boot/`, that one needs a re-upload** — merging
it is not enough. Any PR touching those files should say so plainly; if yours doesn't, ask.

**Direction 2 — a card that never reaches git is not durable.** The mirror failure, and the
quieter one: someone tweaks a skill directly in Settings to fix a niggle. It works. It now exists
in exactly one place — that one account's settings, invisible to the repo, invisible to every
seat, gone the day the account changes or the skill is re-uploaded from `main`. **Nobody can
review it, and nobody can find it later.**

So the rule, both directions:

> **The repo is the original; the card is a copy. Change the repo first, by pull request, then
> re-upload the card. Never the other way round, and never only in Settings.**

If you've already made a Settings-only tweak and it's a good one — bring it back: tell Engineer what
you changed and it'll open a PR putting it in the repo where it belongs. That's not a telling-off,
it's how a good idea stops being fragile.

**How to check a card is current:** ask the seat, in its room — *"which file did you boot from, and
did you read it off live `main`?"* A healthy seat names the file and says yes. A seat answering
from the card's own memory instead is the drift, showing itself.

---

## The shape, in one breath

**Team Leader leads → Creative Director shows (when needed) → Engineer builds → you
merge.** Every change is a proposal you say yes to, and no seat ever checks its own
work. Boot them in that order and the factory runs the way it's meant to — with you
as the one gate the whole thing turns on.

*Truly stuck on any of this?* A trusted person can help you the safe way —
their own computer, their own login, fixes arriving as pull requests only you
can merge: [`../guides/WHEN-YOU-NEED-A-HAND.md`](../guides/WHEN-YOU-NEED-A-HAND.md).
