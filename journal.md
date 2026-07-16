# Journal — the factory's memory

**Newest entry first. Every working session adds one: WHAT was done, WHY, and one thing the human should take from it.** Seats are stateless — they wake up blank, do one job, and disappear. This file is what survives. Reading the top two or three entries is how anyone, human or Claude, catches up. If it's not in the journal, the factory doesn't remember it.

Standing directives — the human's active orders to the team — live in the newest entries and stay in this file until fulfilled or withdrawn. Older history rolls into [`journal/`](journal/README.md) when this file grows past ~20 entries.

---

## #4 — 2026-07-16 — Private repos were an invisible wall

**What:** Fixed the highest-cost gap in [`SETUP-PATH.md`](onboarding/SETUP-PATH.md): a **private** factory repo silently doesn't appear in Claude Code's repository selector until you explicitly grant Claude's GitHub connection access to it — and the setup doc never said so. Public repos show, the private one doesn't, and the person reasonably concludes they have to make it public (they don't). Phase 1 now (a) tells you at the Authorize step that a private repo must be granted or it won't appear, (b) states plainly that this step is "choose a repository" — never a "connector" or "plugin" pick, and (c) adds a named 30-second fix, **"If your repo isn't in the list,"** with the exact clicks at <https://github.com/settings/installations> → Configure → Repository access → add the repo → Save, keeping the repo private throughout. Added to the honest **gaps** table as item 10. Verified the connection mechanism against Anthropic's live docs (code.claude.com) on 2026-07-16.

**Why:** A real person — an investor testing whether this works — got fully stuck here in a live setup. Public repos showed, his private factory repo didn't, and the only guidance the doc offered was "choose a repository," which is useless the moment the repository isn't in the list. The snag reads as "I'm too dumb for this," which is the exact opposite of what this factory promises. It was diagnosed as "not a blocker" earlier; it stopped a real human cold. It was a blocker.

**Standing directives (issued by the human this session):**
1. **Assume humans do not know what to do — build and test for zero prior knowledge.** Any onboarding step where a real person can get stuck with no in-doc way out is a **blocker**, not a "good enough for now" — treat it as ship-stopping until a named, verified fix exists in the doc. *Done when:* the team stops down-grading onboarding snags to "minor/not-a-blocker" and every known snag has a named fix path in `onboarding/`. (Standing — does not expire.)

**One thing to take from it:** The setup is the product's first impression, and it's the one moment your user has *zero* context to recover from a surprise. When you can't picture the least-technical person you know getting through a step unaided, that step is broken — even if it "works" for someone who already knows the answer.

— Code seat

## #3 — 2026-07-14 — Every seat now shows its state

**What:** Two additions to how seats work. First, a probe-and-update step at boot: before any work a seat enumerates the tools it actually has — not the ones it remembers — and checks its live capability docs for anything new, so it never hands you a task one of its own tools could do and never runs on a stale picture of itself. Second, the boot-confirm rule grew a state face: after a seat confirms its boot, every chat turn ends with an honest read of how it's doing — fresh, steady, leaning in, tension, running hot, done. The face is a voice, not a costume; a seat uses it to tell you when it's cooked or uneasy, with one line of why. Marks and faces stay in chat, never in a PR or a committed file.

**Why:** The old per-output mark stopped working — seats stamped it reflexively everywhere, so a tired seat looked identical to a fresh one. State is the signal that actually predicts when a seat should hand off. And the probe step turns "know your tools" from a hope into a boot step.

**One thing to take from it:** Watch the faces. A seat sliding toward running-hot, or wearing a face that doesn't match its work, is your cue to say "journal out" and boot a fresh one — before drift compounds.

— Code seat

## #2 — 2026-07-14 — The setup path gets a map

**What:** A new onboarding page, [`SETUP-PATH.md`](onboarding/SETUP-PATH.md) — the least-resistance path from nothing to a running factory, every click and permission dialog named, verified against Anthropic's live documentation. Stage 0 now offers the choice out loud: "set it all up for me" (Code drives, with Claude in Chrome clicking alongside) or "set it up with me" (guided, one instruction at a time). The grounding table gained six live-doc links (Code, Cowork, Chrome, computer use, Design), and the page carries an honest gaps list — the clicks no automation can remove, named so the team meets you there instead of pretending.

**Why:** Minimal setup is the product. The person at the front door should do exactly one manual phase — download, sign in, connect a repo — and then be offered working hands for the rest. And the seats themselves need current ground truth about their own surfaces, which is what the live-doc links are for: stateless seats drift; linked pages don't.

**One thing to take from it:** The gaps list is the design, not an apology. Every unavoidable dialog is a moment the system chose to keep a human hand on a key — naming those moments is what makes "Claude sets up the rest" trustworthy rather than magical.

— Code seat

## #1 — 2026-07-13 — The factory opens its books

**What:** The discipline core landed: the twenty mechanical rules, this journal and its archive shelf, the four working templates (execute spec, audit findings, session handoff, journal entry), the guardrails CI that keeps credentials out of the repo from day one, and VERSIONS.md — the honesty page about what this template was last verified against.

**Why:** Rules before features, memory before work. Every seat that ever boots here reads the rules and the top of this journal first — so those had to exist before anything else did. A factory that starts with its discipline never has to retrofit it.

**One thing to take from it:** This entry is the format working. Three parts, plain words, newest on top. Your team will write one of these at the end of every session — and six months from now, when you wonder why something is the way it is, the answer will be in here.

— Code seat, at the factory's first light
