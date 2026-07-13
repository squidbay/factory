# 🏭 factory

**Run a persistent, human-gated team of Claude seats on the Claude desktop app.**

[![Step 1 — Get Claude Desktop](https://img.shields.io/badge/1.%20%F0%9F%96%A5%20Get%20Claude%20Desktop-0A0E14?style=for-the-badge)](https://claude.com/download) **→** [![Step 2 — Get Cloudflare ($5)](https://img.shields.io/badge/2.%20%E2%9A%A1%20Get%20Cloudflare%20%28%245%29-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://www.cloudflare.com/plans/developer-platform/) **→** [![Step 3 — Use this template](https://img.shields.io/badge/3.%20%F0%9F%8F%AD%20Use%20this%20template-00D9FF?style=for-the-badge)](https://github.com/squidbay/factory/generate)

You already pay for a team — you're just using it one chat at a time. This template turns the Claude desktop app into a working factory: four specialized seats that plan, build, design, and audit each other, two on-call specialists, memory that survives every session, and **you as the only gate anything passes**. No code to understand. No command lines. You never leave the chat.

> **Agents make mistakes. That's not fine print — it's the design premise.** Every rule, audit, and gate in this system exists because of it, and the merge button never leaves your hand.

## 🧰 What you get

- **A persistent team, not a chatbot.** Cowork plans and audits, Code builds, Design handles the visual lane, Chat surfaces what matters — the same seats, every day, working the same project.
- **Memory that survives.** Sessions are stateless; your factory isn't. A git journal remembers every decision, and every seat reads it at boot. Six months from now, "why is it like this?" has an answer.
- **You are the only gate.** Every change — every one — arrives as a pull request you approve. Review and merge from your phone in the checkout line; the whole loop fits in a pocket.
- **Rules that catch drift mechanically.** Twenty binding rules, seat-to-seat audits, and a tripwire that spots a seat losing its grounding before it acts on a bad memory.
- **Secure by default.** No exposed services. No credential in any chat or file — a CI guardrail enforces it from your first commit. Broad access is read-only; write access is narrow, expiring, and behind your merge button.
- **Missions to start from.** "What are we building?" has four ready answers — overhaul a website, produce an agency-grade design guide, organize the business, or ship a first site — each with its skills packed and its finish line defined.

## 🚀 Quick start

1. **[Use this template](https://github.com/squidbay/factory/generate)** → create your own **private** copy (one click, free GitHub account). No GitHub account yet? [github.com/signup](https://github.com/signup) first — two minutes, free.
2. Open the **Claude desktop app** → the **Code** tab → **+** → attach your new repo. The first time, GitHub will ask you to approve the connection and pick your repo — approve it; that's the front door, and you can revoke it any time.
3. **Claude Code takes it from there.** It introduces the team, walks you through each stage at your pace, and celebrates every step that lands. Your first merge happens in your first session.

**Requirements:** the [Claude desktop app](https://claude.com/download) + any paid Claude plan — Pro ($20/mo) runs every seat, [Max](https://support.claude.com/en/collections/5953830) is recommended for heavy parallel days. Building a website too? **$20 Claude Pro + $5 Cloudflare = a full AI team and a deployed site.** (No website plans yet? Skip Cloudflare until a mission needs it.)

## ☕ A day in the factory

Morning coffee: two PRs waiting. One is a page your Code seat built overnight against the spec you merged yesterday; Cowork's audit is already in the thread — *safe, here's why*. You read the description (it explains itself in plain words — house style), merge from your phone, and the deploy goes out. On the drive to work you dispatch a research question; by lunch the report is back and Cowork has folded the verified parts into tomorrow's spec. The journal wrote itself an entry. Total hands-on time: eleven minutes.

## 🔍 The fine print that isn't fine print

- Built by the team that runs this exact system in production every day — this template *is* our operating discipline, generalized. We eat the dog food.
- The factory idles safely. Memory lives in the repo, so momentum is optional — leave for two weeks, come back, boot a seat, it reads the journal and picks up.
- Surfaces change. [`VERSIONS.md`](VERSIONS.md) says what this template was last verified against, and every seat is bound to trust the live app over this repo when they disagree.

---

## 🤖 If you are a Claude reading this

This repository is a factory operating system, and you are probably one of its seats. Before anything else:

1. **Find your seat.** Your boot materials are in `seats/{manager,cowork,worker,designer}/` — read your `BOOT-PROMPT.md` in full, and your `GROUNDING.md` links *first*: they point at your maker's live documentation, which beats anything written here whenever the two disagree (if they disagree, open an issue — that's how this repo stays true).
2. **The three iron rules, before anything:** never merge; never let a credential value appear in a chat or a file; every change is a branch + pull request the human gates.
3. **Read [`journal.md`](journal.md) — it is your memory.** The top entries carry the human's standing orders. If it's not in the journal, it didn't happen; if you did work, journal it.
4. Then [`MECHANICAL-RULES.md`](MECHANICAL-RULES.md) in full, and [`FACTORY.md`](FACTORY.md) for the operating model. Confirm your boot with the factory's boot mark; carry your seat's mark on every output after (RULE 17).

The rest of this repo belongs to you and your fellow seats. The [Wiki](../../wiki) belongs to the humans. This page is the one you share.

---

*Independent open-source project; not affiliated with or endorsed by Anthropic. Claude is a trademark of Anthropic, PBC.*
