# Update your factory — how improvements reach you

Your factory came from a public master template, and that master keeps getting
better after you copied it — sharper seat rules, clearer onboarding, new guides,
fixed typos. But copying the template on day one cut the live link on purpose:
your office is private, yours, and can't be reached from the outside. That's a
feature. The trade is that improvements don't arrive on their own — you pull them
in, on your terms, and **every update reaches you as a pull request only you
merge.** Nothing ever changes in your factory without you clicking Merge.

## First, once, if your factory predates 2026-08-19

**One check before your first update, and only ever once.** Open
`.github/workflows/factory-update.yml` in your own repo and look for `rm -rf` —
or ask any seat *"does my factory-update workflow still contain rm -rf?"*

If it's there, your office is carrying the version of the updater that **cleared
each managed folder before re-copying it**, which quietly removed any file your
own office kept inside one. The repair is in the template. It cannot arrive by
running the updater, because the updater is the thing being repaired — the run
that goes to fetch the fix is the run that does the damage.

**Read [`SAFE-UPDATE-BOOTSTRAP.md`](SAFE-UPDATE-BOOTSTRAP.md) before you run
anything on this page.** It is one pull request and a ten-minute job, and after
it, everything below is true again.

If `rm -rf` isn't there, you're already on the safe updater and the rest of this
page is yours as written.

## The simplest way: ask your Engineer seat

You don't need to know any of the machinery. Open your Engineer seat and say, in
plain words:

> **"check for factory updates"**

Cloud is the right place for this — no hands needed, nothing to install. Your
seat does the rest:

1. It reads the master's version from **both** places it's published — the
   latest **release** on GitHub, and a one-line version file on the master — and
   takes whichever is **newer**. That's compared against your factory's own
   version, a one-line file at
   [`../.github/template-version.txt`](../.github/template-version.txt). If they
   match, you're current — it says "up to date" and stops. Most months, that's
   the answer, and that's a good answer. (If only one of the two can be read, it
   uses that one; if neither can be reached, it tells you that instead of
   guessing. "Up to date" is never reported from a check that failed to run.)

   *Why two places?* The version gets written twice by two different steps — once
   when an improvement is merged, once when the release announcement is cut —
   so for a while after a merge they disagree. Reading only one of them meant a
   factory could be told it was current while real improvements sat waiting.
   Reading both and taking the newer closes that window.
2. If the master is newer, it compares your **template-managed** files against
   the master's (the split is explained in
   [`../versions/TEMPLATE-MANIFEST.md`](../versions/TEMPLATE-MANIFEST.md)).
3. It opens **one pull request** on your repo with the whole change — and in the
   description it tells you *what* changed, *why*, and one thing worth learning
   from it, in words you actually have.
4. **You read it and merge it.** Or close it to skip this round; nothing is lost,
   the next check offers it again.

That same pull request also refreshes [`../FROM-HQ.md`](../FROM-HQ.md) — the page where HQ's note on each template change lives, newest first: what changed, why, and one thing worth taking from it.

What it will **never** do: touch your journal, your specs, your roster, or your
denylist; **overwrite anything office-owned** — which is nearly everything: your
seats' boot material, your rulebook, your onboarding, your templates, your local
policy, all yours the moment they land, and an update never writes them again;
delete any file of yours; or merge anything itself. When the Factory's version of one of *your* files improves, the update
**names** it in the PR as a migration proposal and still doesn't write it — the
improvement is visible, the choice is yours.

## The hands-off way: the monthly check runs itself

Your factory also ships a small automation — the **factory-update** workflow —
that does the same comparison on the first of each month and opens the same kind
of pull request, so an update can find you even in a month you never think to
ask. You can also run it any time from the **Actions** tab → **factory-update** →
**Run workflow** — once the check at the top of this page is done. It needs one setup click the first time (GitHub → **Settings →
Actions → General → Workflow permissions** → allow Actions to create pull
requests); the [`factory-update`](../skills/factory-update/SKILL.md) skill walks
your seat through it. Same promise as the seat-driven path: one PR, never a
merge, never your journal or roster.

Two paths, one destination: an update always arrives as a pull request you read
and merge. Use whichever fits the moment — ask your seat when you're already in a
session, or let the monthly run catch you when you're not.

## When to run it

Whenever you like. Monthly is plenty. A seat may also mention — once, not
nagging — that an update is waiting if it happens to notice the master is ahead
while doing other work. There's never any urgency: your factory works fine on the
version you have, and updates are improvements offered, not corrections owed.

## What an update can and cannot touch

The law, in two sentences:

> **The Factory updates the operating system. It does not redecorate your
> office.**
>
> **Office is the default. Core is a narrow allowlist.**

Every path the update knows about carries an **owner**. A path is the Factory's
only when we have to stay authoritative over it for the framework to work at all
— today that's the update engine and its tests, the version file, the news page
updates arrive on, and the four thin seat loader cards. **Seven rules, and each
one has its reason written next to it in the manifest.**

Everything else the Factory ships is **yours from the moment it lands**: your
seats' boot material, your `CLAUDE.md`, your rulebook, your README, onboarding,
templates, tool descriptions, hosting notes, token model, mission packs and
skills. Those are seeded once if you don't have them yet, then never written
again — and when the Factory's version improves, the update **names** it for you
instead of taking yours. Everything the manifest doesn't mention at all is yours
and is never even looked at.

The full, plain-words explanation — and the one file that governs it all — is in
[`../versions/TEMPLATE-MANIFEST.md`](../versions/TEMPLATE-MANIFEST.md). Worth a
two-minute read before your first update, so you know exactly what a "yes" means.

**One thing to check if your factory is an older one:** open
`.github/template-manifest.txt` and look for lines starting with `office`. If
there are none, your manifest predates this boundary and every managed folder is
still overwritten wholesale — seat boot material, rulebook, onboarding and all.
The update run says so by name in its PR, and the fix is to copy the ownership
lines across from the Factory's own manifest.

---

*If an update PR ever proposes something you don't understand, ask any seat to
explain a piece of it in plain words — that's what they're for. And if your Code
seat can't open a PR at all, that's a connection problem, not an update problem:
start with [`../onboarding/CONNECT-YOUR-CLAUDE.md`](../onboarding/CONNECT-YOUR-CLAUDE.md).*
