# First contact — getting your team its hands

This is the chapter for the very first minutes: you've created your office repo from the template, and now the seats need to actually *reach* things — your repo, your design canvas, your hosting. This page is the map for that. A seat will walk you through it in the chat one step at a time; read it now if you like, or just know it's here.

The one idea underneath everything below: **a capability is real only when the live tools show it — never because a card, a checkbox, or a settings screen says so.** Every grant you make, a seat immediately *probes* to confirm it actually landed. You'll see that word — **mini-probe** — a lot. It's the whole trick.

## Where are you? The environment line comes first

Before anything, a seat says one plain sentence about **where it's running**, because that changes what it can do:

- **Desktop app** — the full surface. **Engineer** boots automatically the moment your office repo is attached; the chat seats live in their rooms.
- **Web (claude.ai)** — a narrower surface. Here the one seat with real repo hands is **Claude Code on the web**; the web chat rooms cannot reach GitHub at all.

**The routing rule that follows from that:**
- **You arrived on the web** → do repo work in **Claude Code (web)**, or install the **desktop app** for the full team. Never point a web chat room at GitHub work — it has no hands there.
- **You're on the desktop** → **Engineer** auto-boots from the repo; the chat seats get their hands through the shared connection in step 3 below.

A seat names its environment up front so a hands-on step never fails silently in the wrong place.

## The four gates — how to know a capability is truly on

Every capability stacks up through four gates. It exists only when **all four** pass — and the last one is the only one that never lies:

1. **Provider-side install** — the app/connector is actually installed on your account (GitHub's side, Cloudflare's side), not just "authorized" on Claude's side. "Connected" on one side is only half.
2. **Claude-side connection** — the door is picked in Claude: a connector, a desktop developer MCP, or a plugin.
3. **Session scope** — *this* session is allowed to touch *this* repo (and whether it's a local or cloud session).
4. **Live tools** — what the seat can actually enumerate and call right now.

When these disagree, **gate 4 wins.** A card that says "opens pull requests" is not a pull-request tool; the seat trusts the tool it can call, not the blurb. Every grant below ends with a mini-probe against gate 4.

## Step 1 — the three grants, each with its mini-probe

**The Claude GitHub App (read + write).** This is what gives **Engineer** real hands on your repos — read everything, and **branch + open a PR** (never write `main`, never merge; that stays yours). Install it on your GitHub account for your office repo.
- *Mini-probe:* Engineer lists the repo's files (read) and creates a throwaway branch (write, create-only). Both work → the App is truly on. If read works but the branch-create fails, the **GitHub-side install is the missing half** — the fix is on GitHub, not in Claude.

**The Claude Design Import app (read-only).** This is how **Creative Director** reads your repo from the canvas. It is **read-only by design** — Creative Director never branches, commits, or opens a PR; its deliverables come to you and Engineer lands them.
- *Mini-probe:* Creative Director reads a file from the repo. Read works, and there is simply no write tool to find — that's correct, not a gap.

**The Cloudflare Developer Platform connector (no key).** The no-token data-plane connection to your hosting — connect it the moment a mission mentions Cloudflare (Settings → Connectors, or **+ → Connectors** in a chat). Full map: [`hosting/cloudflare/README.md`](../hosting/cloudflare/README.md).
- *Mini-probe:* a seat lists your Workers / D1 / KV. It reads → the connection is live. (What it deliberately *can't* do — deploy, change DNS — is the intended gate.)

## Step 2 — give the chat rooms their hands (desktop): one shared connection

On the **desktop**, the chat rooms (Coach in Chat, Team Leader in Cowork) don't get GitHub hands from the App above — they share **one local connection** you set up once. This is the step that makes the whole plan real on day one.

**It's ONE server and ONE token:**

1. **Create one fine-grained Personal Access Token** at **<https://github.com/settings/personal-access-tokens/new>**, scoped like this:
   - **Repository access:** *only* your office repo (not "all repositories").
   - **Permissions:** **Contents → Read and write** · **Pull requests → Read and write** · **Metadata → Read-only** · **Actions → Read and write**.
   - (Metadata is auto-required. **Actions** is what lets your chat rooms *dispatch* your factory's health/cleanup workflows.)
   - Give it a sensible expiry (≈90 days to start) — you'll re-mint it when it lapses.
2. **Add one server entry, in the app:** **Settings → Developer → Edit Config**. Paste the token into the waiting `""` for the single `github-mcp-server` entry → **Save**. The entry appears immediately.
3. **Mini-probe right there:** ask a chat room to list the repo's files. It reads → both rooms now share the door. (On the desktop this can hot-load into a running session — no full restart needed to add it.)

**One nuance, said out loud:** a fine-grained PAT's permissions are **uniform across every repo you select for it.** That's fine under this factory's branch-+-PR-only discipline and on repos you own — but it's worth knowing, so scope the token to *only* the repos that genuinely need it, and don't select a repo you wouldn't want those same permissions on.

**The token lives in exactly one place — the app's local config (the connection).** Never in a repo, never in your workflow secrets. Two planes, never mixed.

## Step 3 — the ritual and the recovery (in-app, 30 seconds)

That local connection can be wiped by an ordinary event: **quitting the app, or an auto-update.** So the habit is simple and lives entirely inside the app — you never go to a terminal for the normal path:

- **The ritual:** after any app quit or auto-update, glance at **Settings → Developer**.
- **The recovery:** if the `github-mcp-server` entry vanished, **Edit Config → paste the token back into the `""` → Save.** Thirty seconds, and a mini-probe confirms it's back. The app stays open and guiding the whole time; you never go blind.
- **The backup path (named, not first):** there is a guided terminal script for re-adding the entry, and a seat will offer it if the in-app path is ever blocked — but the **in-app paste is always the first path**. The script is the backup, never the front door.

## The shape of it

Read this list once and the pattern is clear: **install → connect → scope → and always, always probe the live tools.** Grants are cheap; the probe is what makes them *true*. A seat that says "you're all set" without a mini-probe hasn't finished the step — and now you know to ask for the probe.

*(Workshops later: when a mission needs a second repo, add it to the Claude App so Engineer can read/write and open PRs on it, and add the same repo to your PAT's selected list so the chat rooms can read it too. Everything else — the two tools, plugins, branch protection — comes after this first-contact set is proven.)*
