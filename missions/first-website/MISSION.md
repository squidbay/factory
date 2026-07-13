# Mission: first website

**From no site at all to a real page at a real address — shipped in days, honest from day one, and built to grow.**

## The brief

You don't have a website. Maybe you've been meaning to for years; maybe every quote you got was four figures and six weeks; maybe the do-it-yourself builders left you with something you didn't recognize as yours. This mission gets you live fast and *right*:

- **One honest page ships first.** Who you are, what you do, real numbers where you have them, and how to reach you. Not a placeholder — a finished page that passes the same quality gate the flagship mission uses. Done in days, not months.
- **You'll own it completely.** The page is plain HTML and CSS in a repo the team creates for you — you can open the file and read what your website is made of. No platform lock-in, no mystery.
- **Then it grows** — page by page, on the same discipline that rebuilds established sites (see [`website-overhaul/`](../website-overhaul/MISSION.md)): a strategy before more pages, a numbered priority behind every addition, the quality gate on every one.

The whole stack costs less than most people's streaming subscriptions: **$20/month for Claude Pro + $5/month for Cloudflare = a full AI team and a deployed website.** That's the complete bill.

Shipping small first is a feature, not a compromise. One live page teaches you the entire loop — spec, build, review, merge, deploy — on something that can't hurt you, and it gives every future page a working road to travel.

## What the team needs from you

- **The facts for one page**: your name or business name, what you do in your own words, the numbers you're proud of if you have them, and how a customer reaches you (phone, email, or a form — pick one to start).
- **A domain name**, or a few minutes to pick one — the team will help you check what's available and walk you through buying it, click by click, in plain words.
- **The $5/month hosting plan.** It's introduced exactly when it's needed, not before: the paved-road guide ([`hosting/cloudflare/`](../../hosting/cloudflare/README.md)) is where your website will live — you'll want it anyway, and it unlocks your team's whole runtime. Connecting it happens **inside the chat**: tap **+** → **Connectors**, sign in, and your Code seat handles the rest through the connection itself. No dashboards to hunt through. If a single deploy key is ever needed, the guide walks you through creating it once and putting it straight into the host's secret store — it never touches the repo or sits in a chat (see [`tokens/TOKEN-MODEL.md`](../../tokens/TOKEN-MODEL.md)).
- **Your merge finger.** Every change lands as a PR you review and approve — from your phone works fine. You are the only merge gate (RULE 14).

That's it. No software to install beyond the Claude desktop app you already have, and nothing technical to learn ahead of time — the team teaches as it builds, one PR description at a time.

## How it runs

1. **PR 1 — the workshop, from the team's own hands.** Code creates your **workshop repo** — the second space, where the thing you're building lives (your office repo stays the team's mind; see FACTORY.md). Code sets up the paved-road deploy so that from this moment, *merging means publishing*. You watch the first deploy land on a temporary address before your domain ever points anywhere.
2. **PR 2 — the one page.** Cowork specs it from your facts; Code builds it and self-audits against the five-point gate from the [`website-overhaul/`](../website-overhaul/MISSION.md) pack — unique title and description, a link-preview image and tags, structured data of the right type, semantic HTML with alt text, a sitemap entry. Yes, even for one page — *especially* for one page, because this page is briefly your entire presence on the internet, and a page without these is a defect. Cowork audits, you merge, it's live.
3. **PR 3 — your domain.** The team walks you through pointing your domain at the site, one instruction at a time, telling you exactly where each approval or setting will appear before it does. Then a seat *verifies* the site loads at your address and tells you what it observed — never "it should work now" (RULE 1, RULE 3).
4. **The celebration.** See below. Take it seriously — it's load-bearing.
5. **Then, growth — by the overhaul discipline.** Before page two, Cowork writes the strategy doc with its Top-10 priority list, exactly as [`website-overhaul/`](../website-overhaul/MISSION.md) prescribes, and every new page traces to a numbered priority. Your one-page site becomes a lead-generation site the same way established sites get rebuilt: deliberately, one finished page at a time, with the journal remembering every step.

## Done looks like

- **Your site is live at your own domain**, verified by a seat that loaded it and said what it saw — and by you, on your own phone.
- The one page passes **all five points** of the quality gate; paste the address into a link-preview checker and watch your card come up right.
- The workshop repo exists, you can open its files and read them, and one merged PR = one visible change on the live site — you've watched it happen.
- No secret value exists anywhere in either repo — keys live in the host's secret store, and the guardrail checks are green.
- The journal records the whole run, newest first, including the date your site went live.

## The celebration

The moment the site resolves at your own domain, send the link to three people — one who kept asking when you'd finally have a website, one potential customer, and one who's just going to be happy for you. Watch the preview card show up in the message thread: your name, your words, your page. Then read the git history of your workshop repo, short as it is — that's the story of you shipping a website with your own team, in days. Put the go-live date in the journal. Page two can wait until tomorrow; tonight, the answer to "do you have a website?" is yes.
