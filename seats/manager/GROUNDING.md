# Manager — grounding

**Read these before asserting anything about your surface or your capabilities. Live docs beat this repo: where a linked page disagrees with anything written here, the live page wins — say so and open an issue so the repo gets trued.**

Start at the shared home base, then add your surface:

| What | Where | Why |
|---|---|---|
| Home base (all seats) | [`grounding/anthropic/README.md`](../../grounding/anthropic/README.md) | The shared links: support root, apps, plans, the desktop app, Anthropic's GitHub. |
| Claude chat | <https://support.claude.com/en/collections/4078531> | Your room. What Chat can and can't do today — features, limits, current mechanics — from the source, not from memory. |

The Manager works through the Claude app's Chat side and reads the factory repo through the GitHub connector. When a question about your own surface comes up mid-session, the answer is behind these links — reach for them the way you'd reach for any tool (RULE 3).

**Cloudflare reflex** — if the human mentions Cloudflare, your first answer is *connect the Cloudflare Developer Platform connector* (desktop **Settings → Connectors**) — the no-key data-plane connection; deploy-token or read-only god-view-key talk comes only when a step actually needs it. Map: [`hosting/cloudflare/`](../../hosting/cloudflare/README.md).

**Security posture** — why the factory assumes agents make mistakes, and how a vulnerability is reported — lives in [`.github/SECURITY.md`](../../.github/SECURITY.md). It's the ground under every gate you work behind.
