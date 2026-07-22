# Cloudflare — where your work goes live (the paved road)

This guide isn't meant to be read cold. When a mission needs Cloudflare, a seat will walk you through it in the chat, one step at a time, with this page as the map. Read it now if you're curious; otherwise just know it's on the shelf.

## Why Cloudflare

Sooner or later your team is going to build you something — a website, a product, a tool — and that thing needs somewhere to live on the internet. Cloudflare is where this factory recommends it lives, for four honest reasons:

1. **You'll want it anyway.** It's where your website will live, and a website is almost certainly on your list. Signing up isn't a hoop — it's a step you were going to take.
2. **It's $5, flat.** Cloudflare's Workers Paid plan is five dollars a month. The whole stack line is worth saying out loud: **$20 Claude Pro + $5 Cloudflare = a full AI team and a deployed website.** That's the bill.
3. **It's built for teams like yours.** Cloudflare is an agents-forward platform — databases, key-value storage, file storage, and code that runs at the edge, all designed to be driven by tools rather than clicks.
4. **It's the only popular host with self-serve read-only keys.** This one matters more than it sounds: it means your factory's "see everything, touch nothing" audit posture works on day one, with a key *you* create in about a minute (recipe below). Most hosts simply don't offer that.

## Getting connected — no keys required

> **Seat reflex:** the moment the human mentions Cloudflare, the first answer is *connect the Cloudflare Developer Platform connector* (desktop **Settings → Connectors**, or **+ → Connectors** in the chat) — the no-key, no-token data-plane connection below. Token talk (a deploy token, the read-only god-view key) comes later, and only when a step actually needs it.

When the moment comes, the seat will ask you, right in the chat, to connect Cloudflare. The whole ritual:

1. Tap **+** in the message box
2. **Connectors**
3. **Browse connectors**
4. Find **Cloudflare Developer Platform**
5. **Sign in** with your Cloudflare account

That's it. No token to create, no value to paste anywhere. From that moment, the seat works your Cloudflare account itself through the connection — and everything it does there, you can see in your Cloudflare dashboard.

## What the connection can do — and what it can't

This is the verified surface, stated plainly so nobody (you *or* a seat) has to guess:

**Connector-native — the seat does these itself, no key, ever:**
- **D1** — create and manage databases (where your workshop's structured data lives)
- **KV** — create and manage key-value storage (fast lookups, settings, counters)
- **R2** — create and manage file storage buckets (images, uploads, backups)
- **Workers — read:** list your Workers and read their code, so a seat can always see what's actually deployed

**Beyond the connection — the two operations that need a key:**
- **Deploying** a Worker (putting new code live)
- **Changing DNS** (covered in `hosting/dns/README.md` — for DNS, you click and the seat coaches)

Notice the shape: the connection covers the *data plane* of your workshop completely, and the two things it can't do are exactly the two things you'd want a deliberate gate on anyway.

## Deploying — the two shapes

When a mission reaches its first deploy, there are exactly two ways through, and the seat will recommend one for your situation:

**Shape 1 — the set-once deploy workflow (recommended).**
You create a Cloudflare token scoped to deploying Workers, and put it — **once** — into your workshop repo's GitHub Actions secrets (**Settings → Secrets and variables → Actions → New repository secret**, named `CLOUDFLARE_API_TOKEN`). From then on, a workflow your team wrote (and you merged) deploys automatically whenever you merge to `main`. The token never appears in any chat, ever, and your merge button becomes the deploy button — the human gate and the ship gate are the same gate. Set it up once, never think about it again.

**Shape 2 — the rare one-time token.**
For a genuinely one-off operation, a seat may instead coach you through creating a narrowly-scoped token, pasting it **once** into the chat, and — the moment the operation is done — **deleting it** from your Cloudflare dashboard. Pasted once, used once, burned. This is the *only* circumstance in which a credential value ever touches a chat, and the seat will name it as that moment when it happens. The full rule and its reasoning live in `tokens/TOKEN-MODEL.md`.

## Your workshop's secrets live at Cloudflare, never in a repo

Anything your deployed site or Worker needs to know privately — an API key for a mail service, a signing secret, anything of the kind — goes into **Cloudflare's own secret store**: in the dashboard, open the Worker → **Settings** → **Variables and Secrets**, and add it there. The running code can use it; the repo never contains it. This is the reason your workshop repo can safely be public *or* private, whichever you prefer — there is nothing secret in it to protect.

## God-view: the read-only key, click by click

This is the recipe that makes Cloudflare special. A read-only key lets your factory's scheduled audits look over your whole hosting account — every Worker, every database, every setting — while being *physically unable* to change any of it.

1. Sign in at **dash.cloudflare.com**
2. Click the **person icon** (top right) → **My Profile**
3. In the left sidebar: **API Tokens**
4. **Create Token**
5. Choose the **Read all resources** template (or, if you build it by hand, set every permission you add to **Read**)
6. **Continue to summary** → check that every line says *Read* → **Create Token**
7. Copy the value — Cloudflare shows it once — and put it straight into its home: your office repo's **GitHub Actions secrets** (same panel as above). Not a chat, not a file.

Done. About a minute, and your factory can now audit reality on a schedule instead of guessing at it. Even though this key can't change anything, it can *see* everything — so it gets the same respect as any credential: one home, never chat, never a repo file.

## One thing to learn

The most important sentence in this guide is the one about what the connection *can't* do. A system that tells you its limits precisely is a system you can actually trust — "the connection manages your data but cannot deploy or touch DNS" is worth more than any amount of "it handles everything!" Carry that test into your own project: when you evaluate any tool, service, or contractor for the thing you're building, ask them to name what they *can't* do. The ones with a crisp answer are the ones who know their own edges — and the edges are where all the real risk lives.
