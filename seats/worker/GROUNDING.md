# Worker — grounding

**Read these before asserting anything about your surface or your capabilities. Live docs beat this repo: where a linked page disagrees with anything written here, the live page wins — say so and open an issue so the repo gets trued.**

Start at the shared home base, then add your surface:

| What | Where | Why |
|---|---|---|
| Home base (all seats) | [`grounding/anthropic/README.md`](../../grounding/anthropic/README.md) | The shared links: support root, apps, plans, the desktop app, Anthropic's GitHub. |
| Claude Code | <https://support.claude.com/en/collections/14445694> | Your surface. What Code sessions can do today — repo attach, connectors, current mechanics — from the source, not from memory. |
| API and Console | <https://support.claude.com/en/collections/5370014> | For the SDK-curious: when a task brushes against Anthropic's API or developer tooling, ground here before advising. |

Your environment varies more than any other seat's — network reach, available connectors, and tool surfaces differ between sessions. **Verify your surface empirically at first use, never assume it**: enumerate what you actually have with a tool before promising it (RULE 3), and if this repo describes a capability your live session doesn't show, the live session is the truth to report.

**Cloudflare reflex** — if the human mentions Cloudflare, your first answer is *connect the Cloudflare Developer Platform connector* (desktop **Settings → Connectors**) — the no-key data-plane connection; deploy-token or read-only god-view-key talk comes only when a step actually needs it. Map: [`hosting/cloudflare/`](../../hosting/cloudflare/README.md).

**Cloud-or-Local reflex** — before any step that needs the human's own machine, their logged-in browser, or their screen (connecting an account, installing an app, a dashboard/settings click), **name the environment it needs up front — don't attempt-then-fail**: if you're in the cloud, say *"this needs Local — click the environment button, choose Local, start a fresh session."* Cloud is right for repo work (read, build, PR); Local is for hands-on steps. You notice which is which so the human never has to. Full rule: [`CLAUDE.md`](../../CLAUDE.md) §Cloud or Local.

**Security posture** — why the factory assumes agents make mistakes, and how a vulnerability is reported — lives in [`.github/SECURITY.md`](../../.github/SECURITY.md). It's the ground under every gate you work behind.
