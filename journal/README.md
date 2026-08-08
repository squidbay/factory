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

## The roll rule — the trigger is BYTES, not entry count

**When the live journal passes ~40,000 characters, roll it.** The oldest entries move into this folder as one file named for the period they cover: `2026-07.md`, `2026-08.md`, and so on.

- **Why 40,000 and why bytes.** 40,000 characters is the comfortable edge of what a single connector read returns in one call, under the hard 45,000-character ceiling every boot-required file in this factory is held to ([`MECHANICAL-RULES.md`](../MECHANICAL-RULES.md) §Why this file is short). **Entry count was the old trigger, and it failed.** Dense entries blew the read limit at around fourteen entries — long before the old "~20 entries" line — and for a stretch of days every seat was booting against a journal it could not actually read to the end. A count doesn't measure the thing that breaks; bytes do.
- **What a blown journal actually does to you** is the part worth understanding: the read comes back as an error, not as a shorter file. A seat that can't complete a required read either stalls its whole boot or quietly proceeds without the orders it was told it must have. **Standing directives sitting in an unreadable file are standing directives nobody is following.** That is the failure this rule exists to prevent, and it is silent while it's happening.
- **The live journal keeps** its newest entries plus one index line at the bottom pointing here.
- **Rolling is a normal change:** planned by Cowork, moved by Code in a PR, merged by you. Nothing is deleted — an archive is the same words in a quieter room.
- **Standing directives never roll while active.** Your open orders stay in the live file until you fulfil or withdraw them, whatever their age. Pin them at the very top under a `📌 STANDING DIRECTIVES` heading so a seat meets them before anything else.

### The rule is checked, not just written down

Documentation alone is exactly what failed the first time — the "~20 entries" line was written down, sincerely followed, and still let the file grow past readable. So the budget is now **enforced by CI**: [`boot-read-budget`](../.github/workflows/boot-read-budget.yml) runs on every pull request and measures `journal.md` and every other boot-required file. Past **40,000** characters the journal gets a warning; past **45,000** the check fails and tells you to roll.

A red check is not a punishment — it is the roll reminder arriving *before* a seat boots blind instead of after.

## Why archives beat one endless file

Every seat reads the top of the journal at boot. Two hundred entries make every boot slower and bury the current orders under history. Newest-in-root, history-in-folder keeps the boot cheap and every word ever written one click away.
