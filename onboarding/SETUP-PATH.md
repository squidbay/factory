# SETUP-PATH — the least-resistance path, every click named

**The promise this page keeps: minimal setup IS the product.** You get Code going first — one download, one sign-in, one repo. After that, Code (with Claude in Chrome beside it) can set up everything else *clickably*, and you choose how involved to be. Every dialog you will ever see is named below, so nothing surprises you and nothing is left to guesswork.

Verified against Anthropic's live documentation on 2026-07-14 — the linked pages are the source of truth, and if one disagrees with this page, the live page wins (see [`grounding/anthropic/README.md`](../grounding/anthropic/README.md)). Where a step exists only because Anthropic's or your operating system's own UX requires a human hand, it's listed honestly in **The gaps** at the bottom — the team writes copy around those moments; it never pretends they aren't there.

## What you need before the first click

- A **Claude paid plan** (Pro is the floor; a couple of optional powers below want Pro or Max) — plans: <https://support.claude.com/en/collections/5953830>
- A **GitHub account** (free is fine) — <https://github.com/signup>
- **Google Chrome** (for the browser lane, later) — optional on day one.

## Phase 1 — Code first (the only phase that's yours alone)

1. **Download the Claude desktop app** — <https://claude.com/download> → install → sign in with your Claude account. (Install help: <https://support.claude.com/en/articles/10065433>)
2. **Open the Code tab** in the app's sidebar.
3. **Connect GitHub** — Code walks you into GitHub's own sign-in, then an **"Authorize Claude"** page listing the repository permissions. Click **Authorize**. This is the one connection everything else rides on, and it's deliberately a human click — you own the keys. (How the GitHub app connection works: <https://code.claude.com/docs/en/github-actions>)
4. **Attach your factory repo** — in the repository selector, pick the copy of this template you created. New session, this repo.
5. **Say hello.** The factory speaks first — the repo's own instructions boot the Code seat automatically, and Stage 0 of [`STAGES.md`](STAGES.md) begins: three sentences of introduction, then one question: *what are we building?*

*Done looks like: Code introduced the team and asked its question. Total: one download, two sign-ins, one authorize click, one repo pick.*

## Phase 2 — the choice (Code asks; both answers are right)

Right after Stage 0, Code offers, explicitly:

> **"Set it all up for me"** — hands-off. Code sequences every remaining step itself and, once Claude in Chrome is installed (its own install is click one), drives the browser through the rest — clicking, typing, filling forms the way a person would — pausing ONLY at the dialogs in **The gaps** that must be your hand. You watch; you click when asked; it narrates as it goes.
>
> **"Set it up with me"** — guided. One instruction at a time, wait for your "done," then the next — the same rhythm as every stage. You do each click yourself and learn where everything lives.

You can switch modes any time by saying so. Either way the sequence below is the same — only whose finger is on the mouse changes.

## Phase 3 — what gets set up (each dialog named)

### A. Claude in Chrome — the browser lane

1. Chrome Web Store → the Claude extension → **"Add to Chrome"** → **"Add extension"** confirmation dialog. (<https://support.claude.com/en/articles/12012173>)
2. Sign in to the extension with your Claude account; pin it (puzzle-piece icon → pin).
3. First time Claude acts on a site, a **"Permission required"** card appears with three buttons: **Allow this action** (one action — safest) / **Always allow actions on this site** (only for sites you completely trust) / **Decline**. That card IS the permission model; grant per-site, review later under extension **Settings → Permissions**. (<https://support.claude.com/en/articles/12902446>)
4. Know the built-in guardrails: financial, banking, investment, crypto, adult, and pirated-content sites are blocked by default, and Claude asks before high-risk actions like purchasing or publishing. (<https://support.claude.com/en/articles/12902428>)

### B. Desktop permissions — for phone-dispatched and screen work *(optional; Pro/Max)*

1. Claude desktop app → **Settings → General → Computer use** toggle. (<https://support.claude.com/en/articles/14128542>)
2. **macOS only:** the OS then wants its own two switches — **System Settings → Privacy & Security → Accessibility** (lets Claude click and type) and **→ Screen Recording** (lets Claude see the screen). These two dialogs belong to macOS; no app can click them for you.
3. Per app, first use: an **"Allow for this session" / "Deny"** prompt. Approvals last the session (30 minutes for phone-dispatched sessions). Escape key stops everything, always.

### C. The chat-side seats — Cowork and the rest

1. In the chat: **+ → connect GitHub → sign in → select your factory repo → save.** The same ceremony Stage 2 teaches — this page just names the buttons.
2. **Settings → Skills → upload** the seat boot skills when a stage calls for them. (Skills need code execution enabled: Settings → Capabilities. <https://support.claude.com/en/articles/12512180>)

### D. Your pocket (optional, five minutes)

1. Install the **Claude mobile app** (iOS/Android) — sessions you start elsewhere follow your account; the Code tab on the phone can watch and steer them. (<https://code.claude.com/docs/en/claude-code-on-the-web>)
2. Install **GitHub Mobile** and turn on pull-request notifications — the merge button works from anywhere ([`MOBILE.md`](MOBILE.md)).

## The gaps — steps we cannot remove, only stand beside

Honest list. Each of these is a moment Anthropic's or your OS's own design requires a human, and the team's copy is written to meet you there rather than pretend otherwise:

| # | The unavoidable click | Why it can't be automated away |
|---|---|---|
| 1 | Account sign-ins (Claude, GitHub, extension) | Identity is yours; every surface asks once. |
| 2 | The GitHub **Authorize** page | The keys to your repo are granted by you, by design. |
| 3 | Chrome extension **Add to Chrome** | Browsers require the human to install extensions. |
| 4 | Each **site-permission** card in Chrome | The safety model IS the human choosing per site. |
| 5 | macOS **Accessibility / Screen Recording** toggles | OS-owned dialogs; the first grant can never be self-serve. |
| 6 | The **Computer use** toggle itself | The switch that lets Claude click can't be clicked by Claude. |
| 7 | **Skills upload** file picker | A desktop-app dialog outside the browser lane. |
| 8 | Logins and CAPTCHAs mid-task | Claude pauses and hands these to you, on purpose. |
| 9 | Plan gates | Computer use is Pro/Max; some features roll out gradually — the linked plan page is the truth. |

If a step you hit isn't on this list and felt like it should be, that's a finding — tell any seat and it becomes an issue.

---

*Independent open-source project; not affiliated with or endorsed by Anthropic. Claude is a trademark of Anthropic, PBC.*
