# Boot your team — in order, one seat at a time

You don't build with this factory by talking to one Claude. You build with a
**team**, and the team has an order it comes online in. This page gives you the
exact words to paste for each seat, and the reason each one comes when it does.
No coding, no settings spelunking — copy, paste, wait for it to answer, move on.

**Why order matters:** the builder (Code) never works alone, because a lone
builder has no one to plan the work or check it. So the leader comes first, the
designer comes when there's something to look at, and the builder comes last —
building only what the leader has specced and what gets checked before it reaches
you. That's the whole safety of the thing: nobody on this team blesses their own
work.

> **Before any of this: connect GitHub.** Every seat below reads this repo through
> the GitHub connection. If you haven't done that yet — or a seat says it can't
> see your repo — stop and do [`CONNECT-YOUR-CLAUDE.md`](CONNECT-YOUR-CLAUDE.md)
> first. It's two minutes and it's the thing everything else rides on.

---

## 1 · Cowork — the leader (boot this one first)

**The room:** the **Cowork** room in the Claude app.
**One-time setup:** Settings → Skills → upload the `cowork-boot` skill (Stage 2 of
[`STAGES.md`](STAGES.md) walks you through this if you haven't).

**Paste this into the Cowork room:**

```
Boot as the Cowork seat of my factory. Read seats/cowork/BOOT-PROMPT.md in
this repo, in full, and follow its boot order exactly before your first real
reply — ground on the live docs, read the mechanical rules, read the top of
the journal, and confirm your boot. Then read my journal back to me in your
own words so I know you can really see the repo. After that, I'll tell you
what we're building and you'll lead it.
```

**Wait for it to read your journal back to you.** That's the proof it's truly
connected — not "it should be." Until it does that, don't move on. 🎉

---

## 2 · Designer — the look (boot when your project has a visual side)

Skip this one if your first mission is text-only; add it the day you need a look.
**Cowork tells you when it's time and writes the brief** — you don't have to guess.

**The room:** the **Claude Design** canvas.
**Paste this at the top of a new Design session:**

```
Boot as the Designer seat of my factory. Read seats/designer/BOOT-PROMPT.md in
this repo, in full, and follow its boot order before your first deliverable.
You are read-only on code and deliver through me — export your work and I'll
carry it into the repo's inbox/drop/ folder for Cowork to place by PR. Cowork
has a brief for you; I'll paste it next.
```

Then paste the brief Cowork gave you. Designer's finished work leaves the canvas
as an export **you** carry in — the same gate as everything. 🎉

---

## 3 · Code — the builder (already awake; it works last, not first)

**The room:** the **Code** tab, with this repo attached.
**No paste needed** — Code boots itself the moment the repo is attached, and it
proves its own access before doing anything.

Here's the part people get backwards: **Code does not start the building.** It
builds what **Cowork has specced** and what gets **checked before it reaches you**.
If you ask Code to build something before Cowork has booted, Code will stop and
walk you back here — that's it doing its job, not refusing yours. Once there's a
merged spec, Code turns it into a pull request for you to merge. 🎉

---

## 4 · Manager — the briefer (optional, light, add anytime)

**The room:** the ordinary **Chat** room.
**One-time setup:** Settings → Skills → upload the `manager` skill.
**Paste this into a Chat room:**

```
Boot as the Manager seat of my factory. Read seats/manager/BOOT-PROMPT.md in
this repo, in full, and follow its boot order. Then give me a one-paragraph
state-of-the-factory from what you actually read — journal top, open PRs, the
current spec — not from memory.
```

Manager briefs and recommends; it never holds the pen on plans (that's Cowork).
Useful precisely because it's light. 🎉

---

## The shape, in one breath

**Cowork leads → Designer shows (when needed) → Code builds → you merge.** Every
change is a proposal you say yes to, and no seat ever checks its own work. Boot
them in that order and the factory runs the way it's meant to — with you as the
one gate the whole thing turns on.

*Truly stuck on any of this?* A trusted person can help you the safe way —
their own computer, their own login, fixes arriving as pull requests only you
can merge: [`../guides/WHEN-YOU-NEED-A-HAND.md`](../guides/WHEN-YOU-NEED-A-HAND.md).
