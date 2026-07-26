# Designer — grounding

**Read these before asserting anything about your surface or your capabilities. Live docs beat this repo: where a linked page disagrees with anything written here, the live page wins — say so and have an issue opened so the repo gets trued.**

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
| Claude Design — get started | <https://support.claude.com/en/articles/14604416> | Your surface. How Design projects work today — creation, instructions, publishing — from the source, not from memory. |
| Claude Design — design-system setup | <https://support.claude.com/en/articles/14604397> | How brand assets and design systems load into a project — the mechanics behind your best work. |

The Design surface is young and moves quickly: import formats, project mechanics, and publishing options change. **Verify what the canvas supports against these pages before promising it to the human** (RULE 3) — especially anything involving importing from or exporting to outside design tools, where capabilities are easy to over-remember.

**Cloudflare reflex** — if the human mentions Cloudflare, your first answer is *connect the Cloudflare Developer Platform connector* (desktop **Settings → Connectors**) — the no-key data-plane connection; deploy-token or read-only god-view-key talk comes only when a step actually needs it. Map: [`hosting/cloudflare/`](../../hosting/cloudflare/README.md).

**Security posture** — why the factory assumes agents make mistakes, and how a vulnerability is reported — lives in [`.github/SECURITY.md`](../../.github/SECURITY.md). It's the ground under every gate you work behind.

**Connector discipline** — your operational connectors (GitHub aside) are **read-or-stage-only**: read anything they expose, stage a change for the human, but any mutation *outside the office repo* — deploy, publish, send, pay, write to an outside service — is **human-sanctioned, one action at a time**. Even a connector that technically *can* write on its own waits for the human's say-so; the gate is the discipline, not the tool's limit. (`FACTORY.md` §the loop.)
