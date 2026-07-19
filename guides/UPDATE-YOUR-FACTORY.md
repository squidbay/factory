# Update your factory — how improvements reach you

Your factory came from a public master template, and that master keeps getting
better after you copied it — sharper seat rules, clearer onboarding, new guides,
fixed typos. But copying the template on day one cut the live link on purpose:
your office is private, yours, and can't be reached from the outside. That's a
feature. The trade is that improvements don't arrive on their own — you pull them
in, on your terms, and **every update reaches you as a pull request only you
merge.** Nothing ever changes in your factory without you clicking Merge.

## The simplest way: ask your Code seat

You don't need to know any of the machinery. Open your Code seat and say, in
plain words:

> **"check for factory updates"**

Cloud is the right place for this — no hands needed, nothing to install. Your
seat does the rest:

1. It reads the **template version** line at the top of your
   [`../VERSIONS.md`](../VERSIONS.md) and the same line on the master. If they
   match, you're current — it says "up to date" and stops. Most months, that's
   the answer, and that's a good answer.
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
denylist; overwrite a file you customized without showing you both versions
first; or merge anything itself. If you edited a template file on purpose and the
update also changes it, the seat says so plainly and lets you choose.

## The hands-off way: the monthly check runs itself

Your factory also ships a small automation — the **factory-update** workflow —
that does the same comparison on the first of each month and opens the same kind
of pull request, so an update can find you even in a month you never think to
ask. You can also run it any time from the **Actions** tab → **factory-update** →
**Run workflow**. It needs one setup click the first time (GitHub → **Settings →
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

The short version: it can change the parts of the factory that belong to the
template, and it never touches the parts that belong to your team. The full,
plain-words explanation — and the one file that governs it all — is in
[`../versions/TEMPLATE-MANIFEST.md`](../versions/TEMPLATE-MANIFEST.md). Worth a
two-minute read before your first update, so you know exactly what a "yes" means.

---

*If an update PR ever proposes something you don't understand, ask any seat to
explain a piece of it in plain words — that's what they're for. And if your Code
seat can't open a PR at all, that's a connection problem, not an update problem:
start with [`../CONNECT-YOUR-CLAUDE.md`](../CONNECT-YOUR-CLAUDE.md).*
