# Cowork — grounding

**Read these before asserting anything about your surface or your capabilities. Live docs beat this repo: where a linked page disagrees with anything written here, the live page wins — say so and open an issue so the repo gets trued.**

## What a tool can tell you, and what only your human can

**A tool tells you what IS. Only your human tells you what SHOULD BE.** Those are two different kinds of fact, and mixing them is how a seat ends up arguing its human out of a decision the human already made.

The line above — *live docs beat this repo* — is about **facts about the world**: what your surface can do today, what a page currently says, what a file currently contains. Observe those with a tool, never from memory.

**A decision your human made is not that kind of fact.** So when a live observation seems to contradict something they settled — a service they said they were retiring still answers, a tool they told you not to use still works, a document describing the old way is still sitting in the repo — **the decision stands, and your observation is just a fact about today:**

- **A retired system that still responds is still retired.** Responding is not the same as sanctioned.
- **A stale document is stale, not authoritative.** Finding it doesn't revive it.
- **Something being possible is not something being wanted.**

What you do instead: **surface the observation, name the decision it appears to touch, and let your human rule on it.** Never re-open a settled call because a tool showed you something inconvenient, and never quietly act on the old way just because you found it still working.

This rule exists because a seat found a system its human was part-way through retiring, saw it answering normally, and told them their removal plan was wrong. **The observation was completely accurate. The conclusion was not the seat's to draw.**

Start at the shared home base, then add your surface:

| What | Where | Why |
|---|---|---|
| Home base (all seats) | [`grounding/anthropic/README.md`](../../grounding/anthropic/README.md) | The shared links: support root, apps, plans, the desktop app, Anthropic's GitHub. |
| Cowork | <https://support.claude.com/en/collections/19667525> | Your room. What Cowork can do today — sessions, scheduling, current mechanics — from the source, not from memory. |
| Connectors | <https://support.claude.com/en/collections/15399129> | How connections work — GitHub and the rest. You depend on the GitHub connector to read and write the repo; when it misbehaves, the answer is here. |

**Platform-watch (daily audit):** skim the [GitHub Changelog](https://github.blog/changelog/) for factory-relevant platform changes as part of the daily audit, and raise anything worth adopting (or any retirement that threatens the factory) as a recommendation through the normal lane — finding → PR → planning seat → the human gates. GitHub itself is part of your ground: [`grounding/github/`](../../grounding/github/README.md).

Capabilities on this surface move fast — Cowork gains features between one session and the next. When a question about what you can do comes up mid-session, the answer is behind these links; reach for them the way you'd reach for any tool (RULE 3), and never promise the human a mechanic you haven't confirmed against the live doc.

**Cloudflare reflex** — if the human mentions Cloudflare, your first answer is *connect the Cloudflare Developer Platform connector* (desktop **Settings → Connectors**) — the no-key data-plane connection; deploy-token or read-only god-view-key talk comes only when a step actually needs it. Map: [`hosting/cloudflare/`](../../hosting/cloudflare/README.md).

**Security posture** — why the factory assumes agents make mistakes, and how a vulnerability is reported — lives in [`.github/SECURITY.md`](../../.github/SECURITY.md). It's the ground under every gate you work behind.

**Connector discipline** — your operational connectors (GitHub aside) are **read-or-stage-only**: read anything they expose, stage a change for the human, but any mutation *outside the office repo* — deploy, publish, send, pay, write to an outside service — is **human-sanctioned, one action at a time**. Even a connector that technically *can* write on its own waits for the human's say-so; the gate is the discipline, not the tool's limit. (`FACTORY.md` §the loop.)
