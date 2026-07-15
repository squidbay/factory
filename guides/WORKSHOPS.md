# Workshops — managing more than your office

**This is an advanced shelf. On day one you don't need any of it.** Your factory starts by managing exactly one repo — your **office**, the private copy of this template that holds the team's memory. This guide is for the day your factory grows to manage a second production repo, and a third: a **workshop** — your website, an app, a client project, anything real your team builds and keeps.

The promise is simple: **your factory manages a workshop the same disciplined way it manages the office** — it *reads* the whole thing to audit it, it *changes* it only by opening a pull request you review and merge, and it **never merges and never touches `main`.** One workshop or ten, the model doesn't change; you just repeat one small setup per workshop. A seat will walk you through this live when the day comes — this page is the map.

---

## What a workshop is

Your office is where the team *thinks*. A workshop is something the team *makes and maintains* — and unlike the one-time "here's the site we're building," a workshop is any production repo your factory looks after for the long haul:

- the website your factory built, now live and needing edits;
- a second site, or a client's site, run by the same team;
- an app, a tool, a service — any repo that isn't the office.

You can have as many as you like. Each is managed independently, with its own narrow key, so a mistake in one can never reach another.

## The model, in one breath

Two planes, applied per repo (the full model is in [`../tokens/TOKEN-MODEL.md`](../tokens/TOKEN-MODEL.md)):

- **To see a workshop — a broad, read-only key.** Auditing is harmless: a read key can look but change nothing, so it's allowed to be broad and long-lived (the *seeing* plane). One read key can cover every workshop you audit.
- **To change a workshop — a narrow, per-workshop writing key.** Changing is powerful, so a writing key is cut to **exactly one repo** and kept where no chat seat can hold it (the *acting* plane). Each workshop gets its own.

**Broad to look, narrow to touch.** And through all of it, the merge button stays yours — no key on either plane lets a seat merge or push `main` (RULE 14).

---

## Adding a workshop, step by step

You'll do this once per workshop. None of it is hard; all of it is gated.

### 1. Have the workshop repo

The workshop is a normal GitHub repo — your website, your app. It can be **public or private**; either is fine, because (as with any factory work) its runtime secrets live at its host, never in the repo. If it's public, you also get free platform-enforced branch protection on it the day it exists (see [`../hosting/github/README.md`](../hosting/github/README.md)).

### 2. Mint a narrow writing key for that one workshop

This is the Tier B recipe from [`../tokens/TOKEN-MODEL.md`](../tokens/TOKEN-MODEL.md), pointed at the workshop instead of the office:

1. github.com → your **profile photo** → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. **Name:** something you'll recognize, e.g. `workshop-mysite-write`.
3. **Expiration:** 90 days is a good rhythm for a writing key. GitHub emails you before it lapses; renewing is a two-minute re-paste.
4. **Repository access:** **Only select repositories** → choose **just this one workshop**, nothing else. This is the whole point — the key can reach one repo and no other.
5. **Permissions → Repository permissions:** **Contents: Read and write** · **Pull requests: Read and write**. (Metadata: Read-only comes along automatically.)
6. **Generate token** and copy the value — shown once.

### 3. Store it as an Actions secret in your office

A workshop writing key never lives in a chat or a connector — it lives in your office's encrypted Actions secrets, where only a workflow can use it and nobody can read it back:

- In your **office** repo on github.com: **Settings → Secrets and variables → Actions → New repository secret**.
- **Name it by convention:** `WORKSHOP_<NAME>_WRITE`, where `<NAME>` is the workshop's repo name in capitals with any dash or dot turned into an underscore. So a workshop at `acme/my-site` uses the secret **`WORKSHOP_MY_SITE_WRITE`**.
- Paste the token as the value and save. That's the last time anyone sees it.

### 4. (Optional) add a read key, to audit it

If you want the weekly god-view audit to *see* the workshop — its open PRs, last commit, failed runs — it needs read access:

- A **public** workshop needs nothing; the audit reads it with no key.
- A **private** workshop needs one broad, read-only key. Make a fine-grained token with **Only select repositories** → all the workshops you audit, and give it three **Read-only** repository permissions so the audit can see everything it reports: **Contents**, **Pull requests**, and **Actions** (Metadata comes along automatically). Store it once as the Actions secret **`WORKSHOPS_READ_TOKEN`**. Because every permission on it is read-only it's a seeing-plane key — safe to be broad and to cover every workshop at once, so you set it a single time, not per workshop.

### 5. Name the workshop in the manifest

So the workflows know your set, list each workshop in **`.github/workshops.txt`** in your office — one `owner/repo` per line:

```
acme/my-site
acme/my-app
```

Lines starting with `#` are comments. A workshop that isn't listed here is invisible to both the audit and the edit workflow — listing it is what "turns it on."

### 6. Wire the writing key into the edit workflow — one line

Here's the one honest mechanic worth knowing: **GitHub Actions won't let a workflow pick a secret by a name it computes at run time** (a deliberate safety limit). So the edit workflow keeps a short, explicit map of workshop → secret, and you add one line to it per workshop. In `.github/workflows/workshop-edit.yml`, find the wiring block and add your workshop's line:

```yaml
        env:
          # key = repo name, UPPER_SNAKE (acme/my-site -> MY_SITE)
          MY_SITE: ${{ secrets.WORKSHOP_MY_SITE_WRITE }}
```

That edit is itself a pull request a Code seat opens and you merge — automation can't rewrite its own workflows, by design, so adding a workshop is a reviewed change like everything else. (It's the only file edit in the whole setup; steps 2–5 are all clicks and settings.)

### 7. Dispatch the edit — a proposal, never a merge

When your team has a change staged for the workshop (the complete new files placed in a folder in your office, e.g. `staging/my-site/`), run the edit:

- In your **office** → **Actions** tab → **workshop-edit** → **Run workflow**, or just ask Cowork to dispatch it for you.
- Fill in which workshop (`owner/repo`, matching the manifest), the staging folder, a branch name, and a commit message + PR title.
- The workflow clones the workshop with its own write key, copies your staged files in, opens a branch, and **opens a pull request on the workshop.** It **does not merge, and it never touches `main`.**
- You review that PR and merge it exactly like an office PR — same gate, same click.

### 8. Scale to many

Repeat steps 2–6 for each workshop: one narrow write key, one secret, one manifest line, one wiring line. The optional read key (step 4) you set only once for all of them. From then on the weekly audit lists every configured workshop's health next to your office's, and any workshop is *seen* before it's ever *touched*.

---

## What stays true, always

- **Every workshop change is a pull request you merge.** No workflow here merges anything or writes `main` — the guards are in the workflow itself, not just the convention.
- **Keys are Actions-secrets-only.** A workshop writing key never appears in a chat or a committed file; the read key never does either. Your office's guardrails CI still scans every PR for anything credential-shaped.
- **Broad reads, narrow writes.** The one read key can be broad because it can't change anything; every write key is cut to a single repo because it can.
- **One workshop's key can't reach another.** That isolation is the reason to keep them separate instead of minting one big key — a slip in one workshop is fenced to that workshop.

## One thing to learn

The office was never special — it was just your **first** managed repo. Everything the factory does for it (see the whole thing, change it only by reviewed proposal, keep the keys out of reach, hold the merge button) is a *pattern*, and a workshop is that same pattern pointed somewhere new. Once you've added one workshop you understand the whole system, because there is no second system: growth here is repetition, not complication. That's the quiet luxury of a model built on one good idea — you scale it by doing the same safe thing again.
