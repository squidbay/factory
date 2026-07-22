# Journal — the factory's memory

**Newest entry first. Every working session adds one: WHAT was done, WHY, and one thing the human should take from it.** Seats are stateless — they wake up blank, do one job, and disappear. This file is what survives. Reading the top two or three entries is how anyone, human or Claude, catches up. If it's not in the journal, the factory doesn't remember it.

Standing directives — the human's active orders to the team — live in the newest entries and stay in this file until fulfilled or withdrawn. Older history rolls into [`journal/`](journal/README.md) when this file grows past ~20 entries.

---

## #2 — 2026-07-23 — Environment-naming and boot symmetry (template 2026-07-23.3)

**What:** A two-part doc true, cut as template version **2026-07-23.3** (FROM-HQ #14). (1) The Cloud-or-Local rule now has the seat **name the environment a step needs before trying it** — not attempt-in-the-cloud-then-fail — in `CLAUDE.md` §Cloud or Local and in `seats/worker/GROUNDING.md` (a new Cloud-or-Local reflex), with a plain-words line added to `onboarding/SETUP-PATH.md` so the human knows their Code seat can use their computer *for* them (Local = your machine, browser logins work; cloud = Anthropic's servers, repo work only). (2) Boot symmetry in `FACTORY.md` (Boot doors) + onboarding (`ONBOARD-YOUR-TEAM.md`, `STAGES.md`): every human seat — Manager (Chat), Cowork, Designer — now boots by a one-time skill, the Designer canvas skill picker having gone live 2026-07-23; only Code boots on the repo root. No new mechanisms — the `designer-boot` skill already exists; the docs were trued to describe the now-live door.

**Why:** A hands-on step attempted in the cloud fails silently and reads as a broken factory; naming the right place up front makes it one clear sentence instead. And with three of four seats already booting by a skill, singling Designer out made the team look more complicated than it is — one door, one exception (Code) is the honest picture.

**One thing to take from it:** when a capability goes live, sweep every doc that described the old workaround — the instruction you forget to update is the one a newcomer plans around.

— Code seat

## #1 — 2026-07-13 — The factory opens its books

**What:** The discipline core landed: the twenty mechanical rules, this journal and its archive shelf, the four working templates (execute spec, audit findings, session handoff, journal entry), the guardrails CI that keeps credentials out of the repo from day one, and VERSIONS.md — the honesty page about what this template was last verified against.

**Why:** Rules before features, memory before work. Every seat that ever boots here reads the rules and the top of this journal first — so those had to exist before anything else did. A factory that starts with its discipline never has to retrofit it.

**One thing to take from it:** This entry is the format working. Three parts, plain words, newest on top. Your team will write one of these at the end of every session — and six months from now, when you wonder why something is the way it is, the answer will be in here.

— Code seat, at the factory's first light
