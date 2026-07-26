# Journal — the factory's memory

**Newest entry first. Every working session adds one: WHAT was done, WHY, and one thing the human should take from it.** Seats are stateless — they wake up blank, do one job, and disappear. This file is what survives. Reading the top two or three entries is how anyone, human or Claude, catches up. If it's not in the journal, the factory doesn't remember it.

Standing directives — the human's active orders to the team — live in the newest entries and stay in this file until fulfilled or withdrawn. Older history rolls into [`journal/`](journal/README.md) when this file grows past ~20 entries.

---

## #2 — 2026-07-26 — The inbox learns to speak to the seats

**What:** `inbox/drop/` now converts what you put in it. A new step, `.github/workflows/drop-convert.yml`, watches that folder; when a binary lands without a readable twin, it writes one beside the original — `Profile.pdf` becomes `Profile.pdf.md` — and opens a pull request with it. PDFs go through `pdftotext`, Word documents through a built-in reader, and images get a note saying a seat has to *look* at them. Originals are never deleted, moved, or edited, and the job fails on the spot if one changes. `inbox/drop/README.md` explains it for someone who has never opened a terminal, and all four seat boot prompts gained the same instruction: check for a `.md` sidecar before ever telling the human you can't read a dropped file, and dispatch the conversion yourself if there isn't one.

**Why:** The chat seats read this repo as text. A PDF, a photo, a scan — to them that is unreadable bytes, and nothing in the system said so out loud. A person could follow the drop procedure perfectly and the team would silently have no idea what was in the file. That is exactly what happened upstream: a resume PDF was merged into `inbox/drop/` for a seat that could never open it. The fix had to be a conversion step, not a rule telling humans to convert things themselves — a chore handed back to the human is not a fix.

**One thing to take from it:** *When a system can't do something, make it say so — or better, make it do the thing.* The failure here wasn't that seats can't read PDFs; that's just a fact. The failure was that the gap was **silent**. Anywhere your factory quietly can't see something, you'll eventually spend an evening confused about why nothing works. Look for the silence, not just the errors.

— Code / Worker seat 🤖🔧

## #1 — 2026-07-13 — The factory opens its books

**What:** The discipline core landed: the twenty mechanical rules, this journal and its archive shelf, the four working templates (execute spec, audit findings, session handoff, journal entry), the guardrails CI that keeps credentials out of the repo from day one, and VERSIONS.md — the honesty page about what this template was last verified against.

**Why:** Rules before features, memory before work. Every seat that ever boots here reads the rules and the top of this journal first — so those had to exist before anything else did. A factory that starts with its discipline never has to retrofit it.

**One thing to take from it:** This entry is the format working. Three parts, plain words, newest on top. Your team will write one of these at the end of every session — and six months from now, when you wonder why something is the way it is, the answer will be in here.

— Code seat, at the factory's first light
