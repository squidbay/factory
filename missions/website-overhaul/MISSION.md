# Mission: website overhaul

**Replace the site you have with a site that earns you customers — and that you can open, read, and understand, file by file.**

## The brief

Most small-business sites were built by someone else, years ago, in a system the owner can't see into. This mission replaces that with a **lead-generation site**: every page exists to move a real visitor toward contacting you, buying from you, or finding the people who sell for you. Nothing decorative gets priority; nothing ships half-done.

Two commitments make this mission different from "get a new website":

1. **You will understand your own site.** It's built static-first — plain HTML, CSS, and a little JavaScript — so you can open any file and read what your website is made of. No framework until a real need forces one. When something needs changing in five years, you own an asset, not a hostage situation.
2. **Every page ships finished, or it doesn't ship.** This mission carries a per-page quality gate (below) that covers what search engines, social previews, *and* AI assistants need to find you and represent you correctly. There is no "we'll add SEO later." A page without these is a defect.

That second point matters more every year: people increasingly ask an AI assistant "who makes X near me?" instead of scrolling results. The gate below is how your pages become the answer — **every page legible to humans, search engines, and other AIs.**

## What the team needs from you

- **Your current site's address** — the team reads it end to end before touching anything.
- **The facts of the business**: what you sell, real prices if you'll publish them, what makes you measurably better (numbers beat adjectives — "$X vs. their $Y," "measured Z% improvement"), and who your buyer actually is.
- **Where a lead should land**: a phone number, a form destination, a list of the people or businesses that sell for you.
- **A design system, if you have one.** If you don't, run [`design-guide/`](../design-guide/MISSION.md) first — pages built without one get restyled twice.
- **Ten minutes a day at the merge queue.** The team builds; you review and merge, from your phone if you like. You are the only merge gate (RULE 14).
- About **$5/month** for hosting on the paved road, if you're not already set up (see [`hosting/cloudflare/`](../../hosting/cloudflare/README.md)).

## How it runs

**Strategy comes before pages — always.** The first thing committed to the repo is a researched strategy document, and every page traces back to it. "Don't invent priorities; read the list" is most of this mission's discipline.

1. **PR 1 — the strategy doc.** Cowork researches your market: what your buyers actually search for, what competitors rank for, where the gaps are. (Dispatch can gather raw leads; Cowork verifies before anything enters the plan.) The result is a strategy document with a **Top-10 priority list** — the ten pages or improvements that matter most, in order, each with the reason it earned its rank. You merge it. From then on, **every page PR names the numbered priority it serves.** A page PR with no number gets sent back.
2. **PR 2 — the workshop.** Code stands up the workshop repo (the second space — see FACTORY.md) and the paved-road deploy, so from the very first page, merging means publishing. Hosting connects through the chat itself — the guide in [`hosting/cloudflare/`](../../hosting/cloudflare/README.md) walks every step, and any key created along the way lives in the host's secret store, never in a repo.
3. **Pages, one PR each, in Top-10 order.** For each page: Cowork writes the spec, Code builds it and **self-audits against the done-gate below** (RULE 1 — the checklist result goes in the PR), Cowork audits the audit, you merge. Every PR description teaches: what changed, why, and one thing worth learning.
4. **The cutover.** When the new site covers what the old one did — plus the Top-10 — the domain points at the new site. This is its own PR and its own decision; nothing moves until you say so.
5. **The journal remembers.** Each session ends with an entry; the strategy doc gets a checkmark per shipped priority, so progress is visible at a glance.

### The done-gate — every page, no exceptions

Every page ships with **all five**, or the page PR is incomplete. A page without these is a defect; there is no add-SEO-later.

1. **A unique `<title>` and meta description** — written for the human deciding whether to click.
2. **An OG image and OG tags** — so the link looks right when someone shares it in a text or a feed.
3. **JSON-LD structured data of the right type** — picked from this table:

   | Page kind | JSON-LD type |
   |---|---|
   | Product page | `Product` + `Offer` (with real prices — showing a price where competitors won't is how you win the rich result) |
   | Question hub / FAQ | `FAQPage` |
   | Install or how-to guide | `HowTo` |
   | Demo or video page | `VideoObject` |
   | Location page (a place people visit, or a partner who sells for you) | `LocalBusiness` |
   | Sitewide (once, usually the home page) | `Organization` |

4. **Semantic HTML** — a real `<h1>`–`<h3>` hierarchy, `<main>`, `<nav>`, `<footer>`, and alt text on every image.
5. **A `sitemap.xml` entry.**

### The AI-answer layer

Search engines are no longer the only readers. The same pages get quoted by AI assistants — if they can parse them. So, on every page:

- **Quantified claims live on stable URLs.** A number an AI can cite, at an address that won't move.
- **H2 headings are phrased as the questions people actually ask** — the page answers the question right under the heading that asks it.
- **Data ships as HTML tables, never as PDFs.** A spec sheet locked in a PDF is invisible to most of the things that might recommend you.

### The voice rule

Numbers first. Lead with the measured result; proof over adjectives; directive calls to action ("Find your dealer," "See the price") — never "Learn More."

## Done looks like

- The new site is live on your domain, replacing the old one.
- **Every page passes the five-point gate** — and you can verify it yourself: paste any page's address into a social post preview and a rich-results test and watch both come back right.
- The strategy doc sits in the repo with its Top-10 list, each shipped item checked, each check pointing at the PR that shipped it.
- You can open any file in the workshop repo and read what your website is made of.
- A test lead — submitted by you — arrives where leads are supposed to arrive.
- The journal tells the whole story, newest first.

## The celebration

Text the link to someone whose opinion you care about, and watch the preview card unfurl — your image, your words, your site. Then ask an AI assistant a question a customer would ask about what you sell, and see whether your page is the answer. The first time it is, screenshot it. That screenshot goes in the journal — it's the mission's trophy, and the team earned it with you.
