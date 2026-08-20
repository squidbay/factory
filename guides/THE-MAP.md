# The map — what your factory is made of, and what each seat can actually reach

**Why this file exists:** an Engineer seat once spent a session unable to find its own team's
marketing pages, then reported it "couldn't reach" the live site. Both were true, and neither
was a broken tool. The pages were on a branch nobody had written down, and the live URL sits
behind a network limit that only applies to *some* sessions. Nobody had drawn a map.

So: draw yours. Two tables, five minutes, and no seat gets lost the way ours did.

---

## Part 1 — where everything lives

**Fill this in for your factory.** Keep it current; a stale map is worse than none, because a
seat will believe it. The first two rows come with the factory; the rest you add as you build.

| Thing | Repo · branch · path | Notes |
|---|---|---|
| **The office** | *your factory repo* · `main` | The team's mind: rules, journal, specs, missions, boot kits. This repo. |
| **The workshop** | *your build repo* · `main` | What the team builds — your site, your app. Added when a mission needs one. |
| — the live site | *workshop* · **the branch your host serves** | ⚠️ **Write the branch down.** See the trap below. |
| — the styles / scripts | *workshop* · e.g. `assets/css/`, `assets/js/` | |
| *(add a row per product, service, or page you own)* | | |

### The trap this table exists to catch

**A repo's default branch is not always the branch that's live.** GitHub Pages commonly serves
from **`gh-pages`**, not `main` — so a seat that reads `main`, finds no `index.html`, and reports
"there are no pages here" is looking in a real place at a real repo and is still completely
wrong. Same shape for any host that serves from a build branch, a `docs/` folder, or a separate
deploy target.

**Two consequences a seat must hold:**

- **Searching `main` is not searching the repo.** Before concluding something doesn't exist,
  list the branches (RULE 3 — observe it, don't conclude it).
- **Editing the live site means a branch + PR against the *serving* branch**, not `main`. And
  check whether your guardrails CI runs on that branch — a workflow scoped to `main` does not
  guard `gh-pages`, so the branch that faces the public may be the *least* guarded one you have.

---

## Part 2 — reachability: which session can see what

**This is the part that looks like a broken tool and isn't.** Two Code sessions with identical
permissions have different network reach, because the environment button changes the network,
not just the machine.

| Target | Cloud session | Local session |
|---|---|---|
| This repo (read, branch, commit, PR) | ✅ | ✅ |
| Package registries, GitHub's git endpoints | ✅ | ✅ |
| **Your own live site** (`*.github.io`, your domain) | ❌ **blocked** | ✅ |
| Any other public web page — a competitor, a doc, an article | ❌ **blocked** | ✅ |
| Driving a real browser (click, type, screenshot a live flow) | ❌ | ✅ |
| The human's logged-in accounts, dashboards, their screen | ❌ | ✅ |
| Rendering **local files** with a headless browser | ✅ | ✅ |

**A cloud session's outbound network is sandboxed** to package registries and GitHub. A request
to your own deployed page comes back as a connection that never happened — commonly **HTTP
`000`**, an empty status, or a proxy refusal. That is a **policy wall, not an outage**: the site
is fine, the tool is fine, and retrying will not help. A seat that reads it as "the site is
down" will send its human chasing a deploy that never broke.

**The workaround, and it's a good one:** cloud sessions *can* render **local files**. So a seat
can check out the serving branch and run a headless browser against the files on disk —
screenshots, measurements, overflow checks, all of it — without ever touching the network. That
covers verifying what the page *source* produces. What it can't cover is the deployed artifact:
whether the deploy actually landed, whether a CDN is serving something stale, whether a
third-party script loads in the real world.

**So the split is:** **build and render-verify in cloud · see and drive the real web in Local.**

### The seat's job here

**Name the environment a step needs *before* attempting it.** Don't try it, fail, and then
explain — that's a wasted turn plus a scary-looking error for the human. The binding rule and the
exact words a seat should use live in [`CLAUDE.md`](../CLAUDE.md) §Cloud or Local; this table is the
reference behind it. The shape of the handoff:

> "This step needs a **Local** session — I'm in the cloud, which can't reach the open web or
> drive a browser. Click the environment button above the message box, choose **Local**, start a
> **fresh** chat, and paste this: **[restate the task so a cold session can run it]**."

**Always write that ready prompt.** A Local seat boots blank. "Ask me again there" hands the
human your homework.

---

## Keeping this map honest

- **Update it in the same PR that changes the thing.** A new repo, a new deploy target, a moved
  branch — the map row moves with it, or the map starts lying.
- **When a seat gets lost, the map is the bug.** Not the seat. Fix the row, then carry on.
- **Reachability is a property of the live session, not of this file.** If your session can do
  something this table says it can't, the session wins — say so and open an issue so this gets
  trued (the same rule every `seats/*/GROUNDING.md` states).
