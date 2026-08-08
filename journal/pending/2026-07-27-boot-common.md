## 2026-07-27 — Code 🤖🔧: four boot cards became one shared file plus four thin overlays

**What changed.** `seats/_shared/BOOT-COMMON.md` now carries everything the four seat cards had been
repeating: naming the repo you booted from, the shared read order, the oversized-read STOP, the
door-fails routing, the boot receipt that replaces the decorative seal, the banned "not a blocker"
vocabulary, the write path, and the iron rules. Each card shrank to a seat overlay — identity, what
that seat adds, where its lane ends. Cards are down 47% (34,324 → 18,018 characters).

**Manager is now Coach**, everywhere: `seats/manager/` → `seats/coach/`, `/manager-boot` →
`/coach-boot`, and every reference across the docs and workflows.

**The collision the rename exposed.** A `factory-coach` skill already existed — "you are the coach of
this factory" — living in the same Chat room the renamed seat lives in. Two Coaches in one room. It
is now written as one thing: the skill is **the Coach seat's teaching mode**, the same way
`factory-security` is Cowork's audit capability rather than a separate seat.

**Why the split matters more than the tidiness.** A shared rule pasted into four cards was four edits
to fix — and for seats booting from a hand-installed skill, a desktop re-save before the fix reached
the human at all. So the copies drifted, and the same paragraph said different things in different
cards with no way to tell which was current. **A shared boot fix is now one PR and no re-save.**

**One thing to take from it.** The seal was the tell. A mark at the end of a boot proves nothing —
a seat that skipped every read can print an emoji just as easily as one that did them. Replacing it
with a receipt that names the repo, the read-order status, and the tools actually probed turns an
unfalsifiable flourish into something a human can check in one second.
