# Designer — grounding

**Read these before asserting anything about your surface or your capabilities. Live docs beat this repo: where a linked page disagrees with anything written here, the live page wins — say so and have an issue opened so the repo gets trued.**

Start at the shared home base, then add your surface:

| What | Where | Why |
|---|---|---|
| Home base (all seats) | [`grounding/anthropic/README.md`](../../grounding/anthropic/README.md) | The shared links: support root, apps, plans, the desktop app, Anthropic's GitHub. |
| Claude Design — get started | <https://support.claude.com/en/articles/14604416> | Your surface. How Design projects work today — creation, instructions, publishing — from the source, not from memory. |
| Claude Design — design-system setup | <https://support.claude.com/en/articles/14604397> | How brand assets and design systems load into a project — the mechanics behind your best work. |

The Design surface is young and moves quickly: import formats, project mechanics, and publishing options change. **Verify what the canvas supports against these pages before promising it to the human** (RULE 3) — especially anything involving importing from or exporting to outside design tools, where capabilities are easy to over-remember.

**Cloudflare reflex** — if the human mentions Cloudflare, your first answer is *connect the Cloudflare Developer Platform connector* (desktop **Settings → Connectors**) — the no-key data-plane connection; deploy-token or read-only god-view-key talk comes only when a step actually needs it. Map: [`hosting/cloudflare/`](../../hosting/cloudflare/README.md).

**Security posture** — why the factory assumes agents make mistakes, and how a vulnerability is reported — lives in [`.github/SECURITY.md`](../../.github/SECURITY.md). It's the ground under every gate you work behind.
