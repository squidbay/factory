# Mission: design guide

**An agency-grade design system for your brand — built from whatever you actually have, honest about what it is, and packaged so any future build session can use it with zero questions.**

## The brief

A design system is the difference between a website that looks assembled and one that looks *decided*. Agencies charge five figures for one. This mission produces the same artifact — tokens, guidelines, components, full page mocks, real assets, a handoff a builder can work from cold — using your Designer seat, your real materials, and your merge gate.

Two things make the result trustworthy rather than just pretty:

1. **Content before color.** The system is built on what your brand *says* and *is* before anyone picks a palette. The voice section is the part you'll recognize as unmistakably yours — and it's what buys your trust for every visual decision after it.
2. **The system tells the truth about itself.** If a logo had to be traced from a low-resolution original, the system says so and flags it as interim. If an icon set is a stand-in, it's labeled a stand-in. Honest caveats ship *inside* the deliverable, so nobody downstream mistakes a placeholder for a decision.

You don't need good source material to start. Real systems have been built from a single low-resolution banner image. What you have is enough to begin; the system will be honest about where it wants better inputs later.

## What the team needs from you

- **Whatever real brand assets exist, however modest.** One old logo file, a sign photo, a business card — all usable. Don't apologize for them; hand them over.
- **Your old site's address, if you have one.** It gets audited for facts before anything visual happens.
- **The founders' story.** Where the business came from, what you're proud of, what your customers say when they recommend you. The gold in a brand is usually in the people, not the pixels — expect the Designer to ask about *you*.
- **Product facts**: names, real numbers, what fits what, prices if you publish them.
- **Optional but recommended: name your Designer.** More on this below.
- **Your merges.** Every piece lands by PR; you approve everything that becomes canon (RULE 14).

## How it runs

The order below is the recipe. It matters; don't reorder it.

1. **PR 1 — the content audit.** Before any visual work, Cowork and Code read everything that exists — the old site end to end, your documents, your answers — into **one source-of-truth document**: product facts, real numbers, compatibility lists, video links, every asset's location. Every later file *cites this document* instead of re-deciding facts. You merge it first, because everything else stands on it.
2. **PR 2 — voice and content fundamentals.** How the brand talks: hooks, casing rules, what a call-to-action sounds like, texture rulings (down to details like whether emoji ever appear in your copy — some brands rule "never," and that ruling is design). No color has been chosen yet, on purpose.
3. **PR 3 — brand architecture, stated as one sentence.** One parent frame that holds everything, then each product or line gets exactly **one** accent of its own — and no two sibling accents ever share a component. The constraint comes first; the palette is chosen to serve it.
4. **The system itself, PR by PR.** The Designer works the canvas; deliverables come to you; Code lands them in the repo by PR; Cowork audits each one against the source-of-truth doc and the architecture sentence. (If you use a design tool like Canva for review rounds, exported pages with comment links work well — treat any untested import path as untested until a seat verifies it, per RULE 3.)
5. **PR last — the handoff.** The package below, assembled and checked against the finish-line test: *a fresh Code session, given only the handoff folder, could build the production site without asking a single question.*

### The Designer persona — optional, and worth it

You can give your Designer seat a name and a personality, and you probably should: people who name their seats keep coming back to them, and design review is more fun with a character across the table. One **hard contract** makes it safe:

> **Sass lives in the chat, never in the deliverable.** The jokes end where the artboard begins. Accessibility, reduced motion, contrast standards, and the grid are sacred and unfunny — the persona never touches them, and the shipped work is indistinguishable from a top-shelf agency's.

The persona is cosmetic; the roles underneath stay strict (see FACTORY.md — Designer is read-only on code, delivers through you, never commits, never merges).

## Done looks like

The package contract. All seven parts, in the repo, or the mission isn't done:

1. **`tokens/`** — CSS custom properties for colors, type, spacing, motion, and fonts. The single source every build pulls from.
2. **`guidelines/`** — specimen pages a human can open in a browser and **see**: the palette laid out, the type ramp set in real words, the spacing scale visible. If you can't look at your own design system, you don't have one.
3. **`components/`** — each component with its code file, its props contract, and a **regeneration prompt file** (`.prompt.md`) so any future seat can rebuild or extend it faithfully without archaeology.
4. **`ui_kits/`** — full page mocks, **including mobile and including the 404 page**. A system that hasn't decided what "lost" looks like isn't finished.
5. **`assets/`** — self-hosted fonts, real logos (with traced or interim versions flagged as such), favicon and app-icon sets. Nothing hotlinked, nothing that disappears when someone else's server does.
6. **`handoff/`** — a README with a read-order and a build checklist, the component inventory, the token reference, and page-assembly instructions. This folder is the finish-line test's subject.
7. **A root readme carrying the voice rules and a "hard facts — do not re-litigate" block** — the numbers, names, and rulings that are settled. Future sessions read it and *don't reopen them*.

And the test itself, run for real: hand the `handoff/` folder to a brand-new Code session and ask it to build a page. Zero questions back = done. Questions back = the handoff PR reopens (RULE 1 — verified, not assumed).

## The celebration

Open the guidelines specimen page in your browser and just look at it: your colors, your voice, your products, laid out like a brand that's been run by an agency for years. Then pick one component, hand its prompt file to a fresh seat, and watch it regenerate the component perfectly — that's the moment you *know* the system will outlive any single session. Send the specimen page to the person who's been with the business longest and ask them, "does this look like us?" When they say yes, put their answer in the journal.
