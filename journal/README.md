# Journal archive

The live journal is always **[`journal.md`](../journal.md)** at the repo root — one file, newest entry on top. This folder is where filled volumes retire so the live file stays fast to read at every boot. [`pending/`](pending/) is where a job's finished entry waits for its splice.

## The pending rule — a work PR NEVER edits `journal.md`

**A work PR NEVER edits `journal.md`.** Every job writes its entry as a new file at `journal/pending/<YYYY-MM-DD>-<short-job-name>.md`. One file per job means two seats can never collide. A single splice job moves them into `journal.md` and deletes the pending files. `journal.md` is edited by exactly one job at a time, ever.

### Why this rule exists

On a single day in July 2026 the factory that builds this template fanned out nine seats in parallel. Every seat writes a journal entry as normal discipline, so all nine jobs targeted the same hunk of the same file — the top of `journal.md`. The first PR merged, and **three PRs conflicted** behind it. Nothing was wrong with anyone's work or anyone's words; the file was simply the one thing they all had to touch, and only one of them could touch it first.

That is not a mistake a careful seat can avoid. It is a property of the file: **`journal.md` is the single most contended file in any factory**, because every seat is required to write to the same end of it. A rule that says "be careful when editing the journal" would have prevented nothing. A rule that says "don't edit it at all" prevents it every time — two jobs writing two different filenames cannot conflict, no matter how many of them run at once.

You will feel this the first day you run two seats at once. The rule is already here so you don't have to learn it the way we did.

### What this means for each seat

- **Writing an entry?** New file in `journal/pending/`. Never a line in `journal.md`.
- **Name it** `<YYYY-MM-DD>-<short-job-name>.md` — the date it was written, then a few words for the job. The name only has to be unique among the pending files.
- **The text is final when you write it.** A splice job moves entries **byte-for-byte** — it never re-authors, summarises, or improves anyone's words.
- **Splicing is its own job**, dispatched to one seat alone: it reads the pending files, puts them at the top of `journal.md` newest-first, deletes the files it spliced, and opens one PR. Never fan a splice out.
- **Order the splice by the commit that ADDED each file, not by the filename.** Two entries written on the same day carry the same date in their names and the filename cannot separate them; the commit can.
- **A splice takes every `*.md` in `pending/` — so `pending/` holds entries and nothing else.** Its `.gitkeep` is deliberately not a `README.md` for that reason, and it is there because git does not track empty directories: without it the folder vanishes the moment a splice removes the last entry, and every seat's boot order names that path.

## The currency rule — `pending/` is part of the boot read

The pending rule above keeps two seats from colliding. It also opens a hole, and this section is the
patch: **between the moment an entry is written and the moment it is spliced, that entry is real
memory sitting outside the file every seat is told to read.** A seat that reads only `journal.md` is
reading memory as of the last splice — which can be any age at all.

That is not hypothetical. This factory ran with **eight finished entries waiting in `pending/` for
up to three weeks** while `journal.md` held exactly one entry from July 13. Every seat that booted in
that window did its required read, passed, and got a memory that was missing everything the factory
had actually done. Nothing failed. Nothing warned. The boot was green and the seat was blind.

Two rules close it.

### 1. Current memory is `journal.md` **plus** `journal/pending/`

**Every boot-required read of the journal is a read of both.** Read `journal.md` first — it is the
spliced history, newest first — then list `journal/pending/` and read anything in it. Those entries
are newer than everything in `journal.md` by construction, so they belong at the top of your picture
of the present.

This is worth stating in the shape a seat can act on:

> **`journal.md` is memory as of the last splice. `journal/pending/` is everything since.
> Neither one alone is current memory.**

**Standing directives obey the same rule.** A directive written this morning is in `pending/`, not in
`journal.md` — so a seat that skips `pending/` can follow a withdrawn order and miss a live one, and
have no way to know from the inside.

### 2. A finished entry may sit in `pending/` for at most **7 days**

Past seven days the splice is **overdue**, and the next seat to notice says so and proposes it — the
same disposition any other overdue thing gets (RULE 20: name it, name its owner, name its when).

**Why seven days, and why not "one session."** A session count is the tempting trigger and it is the
wrong one: this factory idles safely on purpose (BOOT-COMMON §10 — *"momentum is optional"*), so a
team that takes a quiet week has broken no rule and a session-count trigger would either fire
constantly or never. Seven days is also the number [`branch-cleanup`](../.github/workflows/branch-cleanup.yml)
already uses for the leftovers it sweeps, so the factory has **one** staleness number to remember
rather than two that drift.

### The combined read budget

Because a boot now reads both, the size that matters is **`journal.md` plus everything in
`pending/`, together**, against the same one-call budget as any other boot-required read (~40,000
characters comfortable, 45,000 hard — [`MECHANICAL-RULES.md`](../MECHANICAL-RULES.md) §Why this file
is short).

When the pair gets close, **the first fix is a splice, not a roll.** Splicing changes nothing about
the total; it moves entries into the file the roll rule can act on. Roll after, if `journal.md`
alone is over.

### The cold test — two lines, for a seat you cannot boot yourself

The Engineer boots from this repo, so its memory can be verified directly by booting it. The three
installed-card seats — Coach, Team Leader, Creative Director — boot from a card in Claude's settings,
so **only the human can test them.** Paste these two lines into a fresh session of each:

```
Without re-reading anything, tell me the newest thing this factory did and every standing
directive currently in force. Then name the exact files you read to answer, and say whether
journal/pending/ was empty.
```

A seat that names `journal.md` **and** `journal/pending/` has the current boot. A seat that names
only `journal.md` is running an old card and should be re-installed from
[`onboarding/`](../onboarding/) — its answer may still look confident and complete, which is exactly
why the second sentence of the test is there.

## The roll rule — the trigger is BYTES, not entry count

**When the live journal passes ~40,000 characters, roll it.** The oldest entries move into this folder as one file named for the period they cover: `2026-07.md`, `2026-08.md`, and so on. (Measure `journal.md` **plus** `journal/pending/` — the currency rule above makes both a boot read — and splice before you roll.)

- **Why 40,000 and why bytes.** 40,000 characters is the comfortable edge of what a single connector read returns in one call, under the hard 45,000-character ceiling every boot-required file in this factory is held to ([`MECHANICAL-RULES.md`](../MECHANICAL-RULES.md) §Why this file is short). **Entry count was the old trigger, and it failed.** Dense entries blew the read limit at around fourteen entries — long before the old "~20 entries" line — and for a stretch of days every seat was booting against a journal it could not actually read to the end. A count doesn't measure the thing that breaks; bytes do.
- **What a blown journal actually does to you** is the part worth understanding: the read comes back as an error, not as a shorter file. A seat that can't complete a required read either stalls its whole boot or quietly proceeds without the orders it was told it must have. **Standing directives sitting in an unreadable file are standing directives nobody is following.** That is the failure this rule exists to prevent, and it is silent while it's happening.
- **The live journal keeps** its newest entries plus one index line at the bottom pointing here.
- **Rolling is a normal change:** planned by Team Leader, moved by Engineer in a PR, merged by you. Nothing is deleted — an archive is the same words in a quieter room.
- **Standing directives never roll while active.** Your open orders stay in the live file until you fulfil or withdraw them, whatever their age. Pin them at the very top under a `📌 STANDING DIRECTIVES` heading so a seat meets them before anything else.

### The rule is checked, not just written down

Documentation alone is exactly what failed the first time — the "~20 entries" line was written down, sincerely followed, and still let the file grow past readable. So the budget is now **enforced by CI**: [`boot-read-budget`](../.github/workflows/boot-read-budget.yml) runs on every pull request and measures `journal.md` and every other boot-required file. Past **40,000** characters the journal gets a warning; past **45,000** the check fails and tells you to roll.

A red check is not a punishment — it is the roll reminder arriving *before* a seat boots blind instead of after.

## Why archives beat one endless file

Every seat reads the top of the journal at boot. Two hundred entries make every boot slower and bury the current orders under history. Newest-in-root, history-in-folder keeps the boot cheap and every word ever written one click away.
