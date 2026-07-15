# Verification archive

The live verification log is always **[`VERSIONS.md`](../VERSIONS.md)** at the repo root — the intro, the empirical rule, and the *current* verification rows, newest on top. This folder is where older rows retire so that active page stays short and the latest state is always the first thing a seat reads at boot.

## The roll rule

- When `VERSIONS.md` grows past **~20 rows**, or at the end of a **calendar quarter**, the oldest rows move here into a file named for the year they belong to: `archive/2026.md`, `archive/2027.md`, and so on. A busy year can hold many rows; a quiet one, a few.
- Within each archive file, the same honesty holds: **newest row on top**, and never a row claiming more than was actually verified.
- `VERSIONS.md` itself **never moves** — every link to it, and the README's "last verified" reference, keeps resolving. Only rows travel; the file stays put and stays thin.
- Rolling is a normal, gated change: planned by Cowork, moved by Code in a pull request, merged by the human. **Nothing is ever deleted** — an archived row is the same words in a quieter room.
- **The "last verified" line at the top of `VERSIONS.md` never rolls.** It reflects the most recent pass and stays on the live page regardless of age.

## Why an archive beats one endless file

The verification log is the template's honesty about what it was last checked against, and every seat is bound to trust the live app over this repo when they disagree (the empirical rule in [`VERSIONS.md`](../VERSIONS.md)). That page earns its keep only if it's read — and a page of two hundred historical rows is a page nobody scrolls to the bottom of. Newest-in-root, history-in-folder keeps the current verified state cheap to read while preserving every pass ever recorded, one click away.

*(This folder mirrors the shape of [`journal/`](../journal/README.md): a thin, live file at the root and a dated archive beside it. The archive files appear the first time a roll happens — until then, this index is the whole folder.)*
