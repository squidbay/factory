# Journal archive

The live journal is always **[`journal.md`](../journal.md)** at the repo root — one file, newest entry on top. This folder is where filled volumes retire so the live file stays fast to read at every boot.

## The roll rule

- When the live journal passes **~20 entries**, the oldest entries move here as one file named for the period they cover: `2026-07.md`, `2026-08.md`, and so on.
- The live journal keeps its newest entries plus one index line at the bottom pointing here.
- Rolling is a normal change: planned by Cowork, moved by Code in a PR, merged by the human. Nothing is deleted — an archive is the same words in a quieter room.
- **Standing directives never roll while active.** The human's open orders stay in the live file until fulfilled or withdrawn, whatever their age.

## Why archives beat one endless file

Every seat reads the top of the journal at boot. Two hundred entries make every boot slower and bury the current orders under history. Newest-in-root, history-in-folder keeps the boot cheap and every word ever written one click away.

And there is a hard limit under the soft one. **A boot-required file that grows past what a single
read can fetch stops being readable at all** — the request comes back as an error, and a seat that
can't complete a required read either stalls or proceeds without it. The journal is the one boot read
that grows forever on its own, so it is the one most likely to hit that wall. The `~20 entries`
threshold above is the comfortable trigger; the hard ceiling every boot-required file in this factory
is held under is **45,000 characters** ([`MECHANICAL-RULES.md`](../MECHANICAL-RULES.md) §Why this
file is short). **If the live journal is anywhere near that, roll it now rather than at 20 entries** —
a long entry counts the same as a long month.
