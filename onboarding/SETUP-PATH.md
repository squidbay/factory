# SETUP-PATH — the least-resistance path, every click named

**The promise this page keeps: minimal setup IS the product.** You get Code going first — one download, one sign-in, one repo. After that, Code (with Claude in Chrome beside it) can set up everything else *clickably*, and you choose how involved to be. Every dialog you will ever see is named below, so nothing surprises you and nothing is left to guesswork.

Verified against Anthropic's live documentation on 2026-07-14 (the private-repo access path in Phase 1 added and verified 2026-07-16) — the linked pages are the source of truth, and if one disagrees with this page, the live page wins (see [`grounding/anthropic/README.md`](../grounding/anthropic/README.md)). Where a step exists only because Anthropic's or your operating system's own UX requires a human hand, it's listed honestly in **The gaps** at the bottom — the team writes copy around those moments; it never pretends they aren't there.

## What you need before the first click

- A **Claude paid plan** (Pro is the floor; a couple of optional powers below want Pro or Max) — plans: <https://support.claude.com/en/collections/5953830>
- A **GitHub account** (free is fine) — <https://github.com/signup>
- **Google Chrome** (for the browser lane, later) — optional on day one.

## Phase 1 — Code first (the only phase that's yours alone)

1. **Download the Claude desktop app** — <https://claude.com/download> → install → sign in with your Claude account. (Install help: <https://support.claude.com/en/articles/10065433>)
2. **Open the Code tab** in the app's sidebar.
3. **Connect GitHub — and grant the RIGHT repositories.** Code walks you into GitHub's own sign-in, then an **"Authorize Claude"** page. When it asks which repositories Claude may access, you'll see a choice between **"All repositories"** and **"Only select repositories."** If you choose "Only select repositories," you **must add your factory repo to that list** — and if your factory repo is **private, it will not appear anywhere later unless you grant it right here.** This is the one connection everything else rides on, and it's deliberately a human click — you own the keys. (How the GitHub App connection works: <https://code.claude.com/docs/en/github-actions>)
4. **Attach your factory repo** — in the repository selector, pick the copy of this template you created. New session, this repo. This step is only *"choose a repository"* — you will **not** be asked to pick a "connector" or a "plugin," and neither of those boots your factory; attaching the repo does. **If your factory repo is private and it's missing from the list while your public repos show up, that is the single most common snag — and it is not your fault.** Claude simply hasn't been granted access to that private repo yet. Fix it in about 30 seconds, without making anything public — see **"If your repo isn't in the list"** immediately below.
5. **Say hello.** The factory speaks first — the repo's own instructions boot the Code seat automatically, and Stage 0 of [`STAGES.md`](STAGES.md) begins: three sentences of introduction, then one question: *what are we building?*

*Done looks like: Code introduced the team and asked its question. Total: one download, two sign-ins, one authorize click, one repo pick.*

### If your repo isn't in the list — the private-repo fix (and you keep it private)

**The symptom:** you connected GitHub, your **public** repos appear in the selector, but your **private** factory repo is missing. **Nothing is broken, and you do NOT need to make it public.** A private repository is invisible to any app you haven't explicitly shared it with — that's GitHub protecting your private code by default, working exactly as designed. Claude's GitHub connection just hasn't been granted this one repo yet. Grant it once:

1. On your computer, go to **<https://github.com/settings/installations>**.
2. Next to **Claude** (it may read "Claude Code" or "Anthropic"), click **Configure**.
3. Under **Repository access**, either choose **All repositories**, or keep **Only select repositories** and click **Select repositories** → add your private factory repo. Click **Save**.
4. Back in the Claude Code repository selector, refresh it — your private repo is now in the list. Pick it and continue to step 5 above.

That one grant hands Claude *just this repo* and nothing else. Your factory stays private; it's now simply visible to the one tool that runs it.

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

### E. The update lane — the one toggle that makes template updates work

Your factory keeps no live link to the template (that's what keeps it private and yours); the **factory-update** workflow is the deliberate bridge back, and it delivers each improvement as a **pull request you approve**. For that to work, GitHub has to let a workflow open a PR — and it ships new repos with that permission **off**. This is the single switch between you and one-click template updates, so flip it once, up front:

> **Your repo on GitHub → Settings → Actions → General → Workflow permissions → check "Allow GitHub Actions to create and approve pull requests" → Save.**

**The failure it prevents:** with the box unchecked, the first `factory-update` run pushes its branch and then **fails at the step that opens the PR**, with the error *"GitHub Actions is not permitted to create or approve pull requests."* Nothing is broken — the toggle was just never flipped. Turn it on, re-run, and the PR opens. (This is the same one-checkbox-once instruction already noted in [`skills/factory-update/SKILL.md`](../skills/factory-update/SKILL.md) and [`hosting/github/README.md`](../hosting/github/README.md) — surfaced here at the front door so you flip it before your first update run, not after it fails.)

**Whose finger:** this checkbox is **yours to click — the verified instruction.** The hands-off path, where Claude in Chrome flips it for you alongside the rest of setup, is **[TARGET-STATE — UNVERIFIED]**: where the update lane is going, not a capability to rely on today. Until it's verified on the live surface, the manual checkbox is the real step.

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
| 10 | Granting the GitHub App access to a **private** repo | Private code is invisible to any app until you explicitly share it — GitHub's default, by design. This is why a private factory repo won't appear in the selector until you grant it (Phase 1, "If your repo isn't in the list"). |

If a step you hit isn't on this list and felt like it should be, that's a finding — tell any seat and it becomes an issue.

---

*Independent open-source project; not affiliated with or endorsed by Anthropic. Claude is a trademark of Anthropic, PBC.*
