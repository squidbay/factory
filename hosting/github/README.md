# GitHub — where your team's memory lives

This guide isn't meant to be read cold. Ask any seat about anything on this page and it will walk you through it in the chat, one step at a time, with this page as the map.

## The four words, in plain words

GitHub can feel like it was named by engineers for engineers — because it was. But your factory only needs four of its words, and they're all simple:

- **Repo** (repository) — a folder that remembers. Every file, and every version of every file that ever existed, forever. Your team's journal, plans, and work all live in repos.
- **Branch** — a scratch copy inside the repo. When a seat wants to change something, it never touches the real thing; it makes a branch, changes the copy, and shows you.
- **PR** (pull request) — the proposal. "Here's a branch with changes — want them?" A PR shows you exactly what would change, line by line, with the seat's plain-language explanation of what and why.
- **Merge** — the yes. Clicking merge takes the proposal into the real thing. **In this factory, merging is yours alone.** No seat merges, ever, however small the change (RULE 14). Every seat proposes; only you decide. That's the whole safety model in one sentence, and it's why you can let a team of Claudes work hard without watching them work.

## The two-repo picture: office and workshop

Your factory uses two repos with two different jobs:

- **The office** — your own **private** copy of this template (you created it with the "Use this template" button). It holds the team itself: the journal, the rules, the plans, the seats' boot files. It's the team's memory — the reason a fresh session picks up where the last one left off. Private, because it's your playbook.
- **The workshop** — what the team *builds*: your website, your product, your tool. It deploys to Cloudflare (see `hosting/cloudflare/README.md`), and because every secret lives in Cloudflare's secret store rather than in the repo, the workshop can be public or private — your choice, no risk either way.

One team, two rooms: the office is where they think; the workshop is what they make.

## The three ways Claude touches GitHub

Different seats reach GitHub differently, and it's worth two minutes to know which is which — after this, "how does my team access what?" is always a lookup, never a mystery.

**1. The Claude GitHub App — how Code sessions work.**
When you add a repo to a Code session, the Claude GitHub App is what grants access — per-repo, granted by you, revocable by you. Through it, Code reads the repo, works on branches, and opens PRs. It **cannot merge** — not as a courtesy, but by construction. This is the zero-setup path: add the repo, start typing.

**2. Connector keys — how chat seats (Cowork, Chat) see and propose.**
Chat seats reach GitHub through a connector you configure once in the Claude app's settings, using tokens *you* create: a **Tier A** read-only key so they can see your repos, and a **Tier B** write key scoped to the office alone so they can propose changes there. Full click-by-click recipes, and the reasoning behind the scoping, live in `tokens/TOKEN-MODEL.md`.

**3. Actions secrets — how automation works with no one holding a key.**
GitHub **Actions** are small workflows that run automatically on your repo — your factory's guardrails check every PR this way, and your deploys can ride the same rail. When a workflow needs a credential (a deploy token, a god-view key), the value lives in the repo's encrypted **Actions secrets**, where no human and no seat can read it back out. The workflow uses it; nobody sees it.

**Which to use when:** building or fixing something → a Code session (the App). Planning, auditing, reading the journal from chat → the connector keys. Anything that should happen *automatically* — checks, audits, deploys → a workflow with Actions secrets. When in doubt, ask a seat; routing work to the right door is its job, not yours.

## GitHub Mobile — the gate in your pocket

Install the **GitHub** app on your phone, next to the Claude app. It can show you a PR — the full changes and the seat's explanation — and let you review, approve, and **merge**, entirely from the phone. The pocket loop looks like this: dispatch a task from the Claude app on the go → the seat works → your phone buzzes with a PR → you read the description over coffee → merge → the journal records it. Your whole role in the factory — the gate — fits in ten minutes and one pocket. This isn't a party trick; for many owners it becomes the main way they run the team.

## Branch protection — making the gate physical, click by click

Right now, "no seat merges" is a rule the seats follow. Branch protection makes it a fact the platform *enforces* — nothing reaches `main` except through a PR, no matter who or what is pushing. Two minutes, once per repo:

1. Open your repo on github.com → **Settings** (the tab on the repo itself)
2. In the left sidebar: **Branches**
3. Click **Add branch protection rule** (or **Add rule**)
4. **Branch name pattern:** type `main`
5. Check **Require a pull request before merging**
6. Click **Create** at the bottom

Done. Do it for the office first (it's one of your first-day steps, and a seat will prompt you); do it for the workshop when that repo exists. From then on, even a confused seat — even *you*, on a clumsy day — can't change `main` by accident. The gate stopped being a promise and became a door.

## The free tier is genuinely enough

Private repos on a free GitHub account come with **2,000 free Actions minutes every month**. Your office's automation — the guardrails check on each PR, a weekly link check — uses a small fraction of that. You will not be surprised by a GitHub bill; for this factory's purposes, GitHub is free.

## One thing to learn

Everything on this page is one idea wearing different outfits: **change is always a proposal first, and the proposal is always written down.** The branch is the proposal's draft, the PR is the proposal's pitch, the merge is your signature, and the repo remembers all of it forever. That pattern is older than software — it's how contracts, laws, and medical orders work — and it's worth stealing for the rest of your project too. Anywhere something important can change (your prices, your homepage copy, your supplier list), give it the same shape: a written proposal, one named person who says yes, and a record that survives. You'll never again wonder what changed, when, or who approved it — you'll just look.
