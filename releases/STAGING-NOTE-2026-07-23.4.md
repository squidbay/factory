# Release staging note — `2026-07-23.4` (STAGING — Andrew publishes)

**This is a staging note, not a published release.** It stages the next `squidbay/factory`
GitHub Release for Andrew's one-click publish. Publishing the Release (and, if chosen, bumping the
machine anchor) is Andrew's hands — a seat never publishes (RULE 23). Cut the Release from `main` at
or after the commit that merges this note.

---

## Proposed tag / title

- **Tag:** `2026-07-23.4` (next in the dated series; the current latest Release + `.github/template-version.txt` are both `2026-07-23.3`)
- **Title:** `2026-07-23.4 — Seed journal trimmed to entry #1; site "memory" copy trued`
- **Target:** `main`

## Proposed body (this is the `FROM-HQ`-class release note)

> ## #15 — 2026-07-23 — The seed journal starts clean, and the site says how memory works
>
> **What:** Two small trues to what a *new* factory copy starts from and what the public site says.
> (1) **The seed `journal.md` is back to entry #1 only** (#82). A Code seat had added a second seed
> entry; the template journal is the *customer's* memory to write, not ours, so the extra seed entry
> was removed — its content already lives in the fleet-news channels (FROM-HQ #14 + Release
> `2026-07-23.3`), so nothing was lost. (2) **The site's "memory" card now says what the journal is
> for** (#83, on the live `gh-pages` site): every session writes to the journal before it ends, so
> months later "why is it like this?" — and "prove it" — both have an answer.
>
> **Why:** A template should hand a new team a *clean* seed to write their own story into, not one
> pre-seeded with our house news; and the public page should explain the journal habit in the same
> plain words the README already uses.
>
> **One thing to take from it:** "preserved elsewhere" is a claim you verify, not assume — the seed
> entry was only removed after both carriers (FROM-HQ + the Release) were read and confirmed to hold
> its content.
>
> — HQ

## Source PRs summarized

| PR | Base | What | Customer-facing? |
|---|---|---|---|
| **#82** | `main` | Job A — restore the seed-`#1`-only template `journal.md` (removed a stray `#2` seed entry) | **Yes** — changes the seed a *future* copy starts from |
| **#83** | `gh-pages` | Job F — journal-out ("memory") line on the site index shell copy + render receipts | Informational — HQ's own live site (`squidbay.github.io/factory`), not a file customers copy |

## ⚠️ Honest flags for Andrew's publish decision (read before bumping the anchor)

1. **Neither PR changed an *update-lane-managed* file.** `journal.md` is **excluded** from the update
   lane (#82's own receipt confirms it: *"existing copies are unaffected"*), and #83 edited the
   `gh-pages` site, not the template file tree. So this Release is **fleet-news / record-keeping**, not
   a managed-file update.
2. **Bumping `.github/template-version.txt` to `2026-07-23.4` is therefore optional and has a
   side-effect:** the update check is release-first, so a newer anchor/Release would show every
   existing customer copy an **"update available"** — but the update would sweep **no managed file**
   (a hollow prompt). VERSIONS.md's own rule is *"bump the machine anchor whenever a template-managed
   file changes"* — and here **no managed file changed**. **Recommendation:** publish the Release as
   the record of #82/#83, but **hold the anchor at `2026-07-23.3`** until the next PR that actually
   touches a managed file, so existing copies aren't prompted toward a no-op update. Your call — this
   note does **not** edit `.github/template-version.txt`.
3. **Real vs label date:** the GitHub timestamps for #82/#83 are 2026-07-23; the seat labels this
   session run 07-25/07-26. Tag stays in the `2026-07-23.N` series to match the timestamps and the
   existing anchor.

---

*Staged by 🤖🔧 Worker per the merged evening-fan-out execute spec (job M). DRAFT until Andrew merges
this PR; Cowork audits the note; Andrew publishes the Release. Grounded against: factory Release
`2026-07-23.3` (#14, API), PR #82 + #83 (merged, API), `.github/template-version.txt`, `VERSIONS.md` —
all off live state.*
