# The token model — who can see what, who can do what

**Start here: on day one, you don't need any of this.** The normal way your factory connects to GitHub is the one ritual from onboarding — in the chat, tap **+** → connect **GitHub** → sign in → select your factory repo → save — and that's a sign-in, not a key you manage. Everything below is the **advanced shelf**: upgrades for a factory that outgrows the connector — most never need them. The model is written down now so that if that day comes, it's a lookup, not a decision; the keys themselves stay uncreated until then.

You don't need to memorize this page. When a seat ever does ask you to create a key, it will point you here and walk you through it one step at a time. Read it once now so nothing on that day surprises you.

A **token** is a key. Like a physical key, the whole game is deciding what each key opens and where each key is kept. That's the entire subject. There are only two ideas and three keys, and this page is all of them.

---

## The two planes: seeing and acting

Every key your factory ever uses belongs to exactly one of two planes:

**The seeing plane — broad, but read-only.**
Keys on this plane can look at a lot (all your repos, your whole hosting account) but can *change nothing*. A seeing key in the wrong hands is a privacy problem, not a catastrophe — nothing can be broken, deleted, or deployed with it. Because they're harmless to your systems, seeing keys can be broad and long-lived.

**The acting plane — narrow, and expiring.**
Keys on this plane can change things — but only in *one specific place*, and they expire on a schedule. An acting key is scoped so tightly that even if it leaked, the damage is fenced to one repo or one operation. Because they're powerful, acting keys are kept small and short-lived, and renewing one occasionally is a feature, not a chore.

**The rule that makes both planes safe: never mix them.** A key is never both broad *and* able to act. The moment you want a key that "can see everything and also fix things," you've left the model — split it into two keys instead. This one habit is most of what "secure by default" means here.

And in every case, one thing never moves: **the merge button stays yours.** No key on either plane lets a seat merge to `main`. Keys change what a seat can see and propose; they never change who decides (RULE 14).

---

## The three keys — advanced upgrades, when needed

None of these exist in a fresh factory, and a fresh factory is not missing anything: the GitHub connector covers day-one work in full. Each tier below is an upgrade you reach for only when the factory outgrows what the connector reaches — and each one comes with a seat to walk you through it when (if) that happens.

| Tier | Plane | What it is | Where the value lives |
|---|---|---|---|
| **A — the reading key** | Seeing | A read-only GitHub key across your repos | The Claude app's connector settings |
| **B — the writing key** | Acting | A GitHub key that can write to **one repo only** — your office | The Claude app's connector settings |
| **C — god-view** | Seeing (mostly) | Hosting-account credentials, consumed only by automated workflows | GitHub Actions secrets, or the host's own secret store |

### Tier A — the reading key

A fine-grained GitHub token, **read-only**, covering your repos. You paste it into the Claude app's connector configuration, and from then on your chat seats (Cowork, Chat) can *read* your repos themselves — open your journal, check a plan, look at what Code shipped — without you copy-pasting files to them. It cannot write, and it cannot merge. This is the key that turns your chat seats from blind advisors into teammates who can see the same repo you do.

### Tier B — the writing key

A fine-grained GitHub token scoped to **exactly one repository: your office** (your private copy of this template — the team's memory). It can read and write contents, open pull requests, and work with Actions in that one repo. Nothing else, anywhere. This is what lets a chat seat propose changes — always as a branch and a pull request that *you* review and merge. Even the writing key cannot touch `main` directly once branch protection is on (see `hosting/github/README.md`), and it never covers your workshop or anything else you own.

### Tier C — god-view

Credentials for your hosting account, used so scheduled workflows can *audit* your real infrastructure — see everything, touch nothing. Two honest facts shape this tier:

- **Cloudflare is the friendly case.** Cloudflare lets you create a genuinely **read-only** token yourself, from its own dashboard, in about a minute — see the click-by-click recipe in `hosting/cloudflare/README.md`. A read-only host token is a seeing-plane key: safe to hold long-term.
- **Most other hosts are not.** Many popular hosts only issue full-power tokens — one key that can do *everything* to your account. A full-power key must never sit anywhere a seat could read it directly. The rule for those: **Actions secrets only** — the value goes into GitHub's encrypted secret store, and only automated workflows (whose code you merged) ever consume it. No seat sees the value; no chat carries it.

---

## Making a fine-grained GitHub token, click by click

This is the recipe for Tiers A and B. A seat will walk you through it live when the day comes; here it is in full so you can also do it alone.

1. On github.com, click your **profile photo** (top right) → **Settings**.
2. In the left sidebar, scroll to the bottom → **Developer settings**.
3. Click **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
4. **Token name:** something you'll recognize later, like `factory-read` or `office-write`.
5. **Expiration:** pick one deliberately (this is the "expiring" in the acting plane):
   - Tier A (read-only): a longer expiry is fine — up to a year.
   - Tier B (write): shorter is better — 90 days is a good rhythm. GitHub emails you before it expires; renewing takes two minutes and a fresh paste into the connector settings.
6. **Repository access** — this is the scoping step, the most important click on the page:
   - Tier A: **All repositories** (it's read-only, so broad is fine — that's the seeing plane).
   - Tier B: **Only select repositories** → choose your office repo, and *only* your office repo.
7. **Permissions → Repository permissions** — check exactly these and nothing more:
   - Tier A: **Contents: Read-only**. (GitHub adds **Metadata: Read-only** automatically — that's normal.)
   - Tier B: **Contents: Read and write** · **Pull requests: Read and write** · **Actions: Read and write**. (Metadata again comes along automatically.)
8. Click **Generate token**, and copy the value GitHub shows you — it's shown exactly once.
9. Paste it straight into its home (next section) and nowhere else. Don't park it in a note, an email, or a chat message on the way.

If you ever lose track of a token or feel uneasy about one, go back to the same Fine-grained tokens page and delete it. New key, two minutes, no harm done. Revoking a key is always cheap; that's the point of keys.

---

## Where key values live — and where they never do

Every credential value has exactly one home, and all three homes share the same property: **seats and repos can use what the key unlocks without ever seeing the key itself.**

- **The Claude app's connector settings** — home of Tiers A and B. You paste the token into the connector configuration in the app's Settings. That's a settings field, not a chat message: the seat gets the *ability*, never the *value*.
- **GitHub Actions secrets** — home of Tier C values and any deploy token used by a workflow. In the repo: **Settings → Secrets and variables → Actions → New repository secret**. The value is encrypted; workflows use it; nobody — human or seat — can read it back out.
- **The host's own secret store** — home of your *workshop's* runtime secrets (API keys your deployed site or Worker needs). On Cloudflare, that's the Variables and Secrets panel on the Worker itself — see `hosting/cloudflare/README.md`.

**Never a repo file.** Not in a config file, not in a "just temporarily" commit, not in an example with the real value filled in. Repos are memory — everything in them is written down forever, and on GitHub even deleted files linger in history. This isn't a discipline you have to maintain alone: **the guardrails CI in your office scans every pull request for anything that looks like a credential and fails the check if it finds one.** The machine enforces the rule so no one has to be perfect.

---

## The golden rule

> **No credential value ever appears in any chat message or any committed file.**

Every seat in your factory knows this rule and will refuse to break it — if a seat ever *asks* you to paste a key value into the chat outside the one exception below, that's a seat off its rules: decline, and boot a fresh one.

**The one honest exception, stated plainly:** two operations — deploying to Cloudflare and changing DNS — sit beyond what the Cloudflare connection can reach. For deploys, the recommended path avoids chat entirely: a deploy token set **once** as a GitHub Actions secret, consumed by a workflow (details in `hosting/cloudflare/README.md`). But there is a rare, coached moment where a seat may instead guide you to create a narrowly-scoped, short-lived token and paste it **once** into the chat so it can perform that one operation — after which you **delete that token immediately**. Pasted once, used once, burned. The seat will tell you it's that moment, tell you exactly what the token is scoped to, and remind you to burn it after. If any of those three things is missing, don't paste.

---

## One thing to learn

The reason this page can be short is that it never asks "do I trust Claude?" — it asks "what can this key open, and where does it live?" That's how professionals think about access, and it's a skill that transfers far beyond this factory: your bank app, your email, every service you'll ever connect to another service works on the same two questions. When your own project grows — a payment provider, an email sender, an analytics account — you already know what to do: decide whether the new key is for *seeing* or *acting*, scope it to the smallest thing that works, give the value its one proper home, and know that revoking it is always two minutes away. You'll never again need to feel nervous about a key, because you'll never again hold one you can't explain.
