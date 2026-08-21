# The template manifest — what an update may touch, and what is always yours

Your factory was created from a public master template. That master keeps
improving after you copy it, and those improvements can reach you as a pull
request you review and merge (how to run that check is in
[`../guides/UPDATE-YOUR-FACTORY.md`](../guides/UPDATE-YOUR-FACTORY.md)). The
question every update has to answer first is: *who owns this file now?* This
page is the plain-words answer. It explains the boundary so you can read an
update PR and know exactly what you're saying yes to.

## One list governs — this page explains it

The exact, machine-readable list lives in one file:
**[`../.github/template-manifest.txt`](../.github/template-manifest.txt)**. That
file is the single source of truth — the update path reads it and nothing else,
and it lives in *your* repo, so you own it. This page never keeps a second copy
of the list to avoid the two drifting apart; it teaches you how to read the one
that governs. When they seem to disagree, the `.txt` is right and this page is
stale — that's a normal thing to flag with an issue or a PR.

## The law, in one sentence

> **The Factory updates the operating system. It does not redecorate your office.**

Everything below is that sentence made mechanical. Every path the manifest names
carries an **owner**, and the owner decides what an update is allowed to do to
it. There are exactly two owners, plus everything the manifest never mentions.

## The two owners

**`core` — Factory-owned. An update overwrites these, every run.** This is the
machinery: the update engine and its tests (`scripts/`), the runtime and the
stable contracts, the guides, the rulebook, the shipped skills, and the **four
thin seat loaders** — the small cards installed in Claude's settings that do
nothing but point at this repo. Keeping these current is the entire point of an
update, so they arrive by overwrite. If you deliberately edit one and want to
keep your version, put a `!` line in front of its path in the manifest and the
sync will never write it again.

**`office` — yours, from the moment it lands.** This is the material your team
adapts as it learns: your **seats' boot prompts, grounding, overrides and local
doctrine**, and the **mission packs**. The Factory **seeds** one of these only
when your office doesn't have it yet — a brand-new default arrives the first
time, exactly once. After that it is your file, and **no update ever writes it
again**, however far ahead the Factory's version gets.

When the Factory's version of an office-owned default *does* improve, the update
doesn't quietly skip it and it doesn't quietly take yours. It **names** the file
in the PR under *"Migration proposals — your files, improved upstream"*, so the
improvement is visible and the choice is yours. That's the whole difference
between a Factory that maintains your machinery and one that redecorates around
you.

**Unlisted — never seeded, never touched, never mentioned.** Your **journal**
(`journal.md` and your archive), your **specs** (`specs/`; only its README
travels with the Factory), your **roster** (the *Your team, your names* block in
`FACTORY.md`), your private **denylist**, your company knowledge, and every file
you add. An update reads right past all of it.

### Reading a pair of lines

The single most useful shape in the manifest is a broad `office` folder with a
narrow `core` thing inside it:

```
office seats/coach/                  <- the boot material is your office's
core   seats/coach/coach-boot/       <- the thin loader stays the Factory's
```

Both rules match `seats/coach/coach-boot/SKILL.md`. **The longest match wins**,
so the loader updates and the boot material behind it does not. Order in the
file doesn't matter — only specificity — so a manifest can't be broken by moving
a line around.

### What the sync can never do

- **It never deletes.** A file of yours the Factory has never heard of is left
  where it is. (An earlier version wiped each managed folder and re-copied it,
  which silently removed every office-only file inside.)
- **It never overwrites an `office` path**, and never writes a `!` path.

Both claims are tested on every change to the engine, each paired with a
**negative control** — a run that must come out the *other* way, or the test
proves nothing. `scripts/sync-selftest.sh` proves the engine's rules on
fixtures; `scripts/ownership-rehearsal.sh` builds a copy of your actual office,
customises its seat boot material, adds files of its own, runs a real update
against it, and checks every byte. That second one runs *before* your monthly
sync is allowed to touch anything.

### If your manifest has no `office` lines

Then your office predates this boundary and is running the old flat model: every
managed folder is overwritten wholesale, seat boot material included. The update
run says so by name in its PR rather than leaving you to discover it. The fix is
to copy the ownership lines from the Factory's own manifest — the file this page
describes.

Two categories the update deliberately **reports but does not apply** — you'll
see them called out in the PR, left for you to bring over by hand:

- **Your workflows** (`.github/workflows/`). A repo's automation cannot rewrite
  its own automation, so when the Factory's workflows improve, the update tells
  you and an Engineer seat brings them across in a normal PR.
- **The manifest itself.** If your copy of `template-manifest.txt` differs from
  the Factory's, the update says so and leaves yours in charge — because
  deciding who owns a path is a choice only you should make.

## When you've customized a Factory-owned file

This is the case worth understanding, because it's where a careless update would
do harm. Say you edited a guide on purpose, and the Factory later changes that
same file. The update proposes its version in the diff, where you can see it and
say no. If you want to keep your version permanently, add a `!` line for it in
[`../.github/template-manifest.txt`](../.github/template-manifest.txt) — from
then on no update writes it again.

For **office-owned** paths you don't have to do any of this. That was the point
of the boundary: the protection used to exist only where somebody had already
been burned once and remembered to add a line.

## The one-line signal: template version

The template's current version is a plain date. You read it at the top of
[`../VERSIONS.md`](../VERSIONS.md), but the check reads it from a one-line
machine file — [`../.github/template-version.txt`](../.github/template-version.txt)
— so editing the prose on the VERSIONS page can never break the check. The check
reads **both** of the master's version signals and takes the newer: the template's
**latest GitHub Release** (its tag is a version, its notes are that update's
`FROM-HQ.md` entry) and the master's own raw one-line version file. Those two are
written by two different human acts and drift in the window between a merge and a
release cut, so reading only one of them let a factory be told it was current
while merged improvements sat unshipped. If the master's version is newer than
yours, an update is waiting; if neither signal can be read, the check says so
rather than reporting "up to date." Either way it's a
signal, not a phone-home — nothing is sent anywhere, nothing runs on its own that
you didn't ask for. You (or your seat, when you ask) do the reading.

---

*This page is documentation, not machinery — it changes nothing on its own. The
machinery is [`../.github/template-manifest.txt`](../.github/template-manifest.txt)
(the list the update reads) and the update path described in
[`../guides/UPDATE-YOUR-FACTORY.md`](../guides/UPDATE-YOUR-FACTORY.md).*
