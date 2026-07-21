# The template manifest — what an update may touch, and what is always yours

Your factory was created from a public master template. That master keeps
improving after you copy it, and those improvements can reach you as a pull
request you review and merge (how to run that check is in
[`../guides/UPDATE-YOUR-FACTORY.md`](../guides/UPDATE-YOUR-FACTORY.md)). The
question every update has to answer first is: *which files is an update allowed
to change, and which are yours alone and never touched?* This page is the
plain-words answer. It explains the split so you can read an update PR and know
exactly what you're saying yes to.

## One list governs — this page explains it

The exact, machine-readable list lives in one file:
**[`../.github/template-manifest.txt`](../.github/template-manifest.txt)**. That
file is the single source of truth — the update path reads it and nothing else,
and it lives in *your* repo, so you own it. This page never keeps a second copy
of the list to avoid the two drifting apart; it teaches you how to read the one
that governs. When they seem to disagree, the `.txt` is right and this page is
stale — that's a normal thing to flag with an issue or a PR.

## The two halves

**Template-managed — an update may propose changes here.** These are the parts
of the factory that belong to the template and get better over time: the seat
rulebooks and boot files, the onboarding path, the guides, the shipped skills
and mission packs, the shared templates, the verification log, and the news
from HQ (`FROM-HQ.md`, where each template change is noted for you — and now also
the text that rides the body of each GitHub Release the template cuts). When the
master sharpens a rule or fixes a typo in a guide, this is where it shows up in
your update PR. Overwriting is safe *when you haven't edited the file yourself* —
and when you have, see the next section.

**Yours alone — never touched by an update, ever.** These are the parts that are
your team's, not the template's: your **journal** (`journal.md` and your journal
archive — your team's memory, kept separate from HQ's own news in the managed
`FROM-HQ.md` so an update never writes your journal), your **specs** (`specs/`, your plans; only its
README travels with the template), your **roster** (the *Your team, your names*
block in `FACTORY.md` — your anchor emoji and seat names), your private
**denylist** (`.github/guardrails-denylist.txt`), and anything else the manifest
doesn't list. An update reads right past all of it.

Two categories the update deliberately **reports but does not apply** — you'll
see them called out in the PR, left for you to bring over by hand:

- **Your workflows** (`.github/workflows/`). A repo's automation cannot rewrite
  its own automation, so when the master's workflows improve, the update tells
  you and a Code seat brings them across in a normal PR.
- **The manifest itself.** If your copy of `template-manifest.txt` differs from
  the master's, the update says so and leaves yours in charge — because opting a
  path in or out of updates is a choice only you should make.

## When you've customized a template-managed file

This is the case worth understanding, because it's where a careless update would
do harm. Say you edited a guide or a seat file on purpose, and the master later
changes that same file. A good update **never silently overwrites your version.**
It surfaces the collision in plain words — *"you've customized this file, and
this update also changes it; here's both, you choose"* — and lets you decide.
If you want to keep your version permanently, remove that file's line from
[`../.github/template-manifest.txt`](../.github/template-manifest.txt); from then
on it's yours and no update proposes changes to it again.

## The one-line signal: template version

The template's current version is a plain date. You read it at the top of
[`../VERSIONS.md`](../VERSIONS.md), but the check reads it from a one-line
machine file — [`../.github/template-version.txt`](../.github/template-version.txt)
— so editing the prose on the VERSIONS page can never break the check. The check
is release-first: it reads the template's **latest GitHub Release** (its tag is
the version, its notes are that update's `FROM-HQ.md` entry), and if no release
is reachable it falls back to comparing that raw one-line file on the master. If
the master's version is newer than yours, an update is waiting. Either way it's a
signal, not a phone-home — nothing is sent anywhere, nothing runs on its own that
you didn't ask for. You (or your seat, when you ask) do the reading.

---

*This page is documentation, not machinery — it changes nothing on its own. The
machinery is [`../.github/template-manifest.txt`](../.github/template-manifest.txt)
(the list the update reads) and the update path described in
[`../guides/UPDATE-YOUR-FACTORY.md`](../guides/UPDATE-YOUR-FACTORY.md).*
