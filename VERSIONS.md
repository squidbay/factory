# VERSIONS — what this template was last verified against

AI product surfaces change fast — tab names move, features ship, mechanics get renamed. This page is the template's honesty about that.

**Last verified against the Claude desktop app: 2026-07-13.**

**Template version: 2026-07-21.** This one line is the update-check anchor. Your factory reads it here and on the master; if the master's is newer, an update is waiting (how to run the check: [`guides/UPDATE-YOUR-FACTORY.md`](guides/UPDATE-YOUR-FACTORY.md)). It's a plain date so newer always wins at a glance; a second change on the same day adds a `.1`, `.2` suffix (`2026-07-17.1`) so the order never blurs. Bump it whenever a template-managed file changes — this is the template's own version, distinct from the "last verified" date above, which tracks when a human last checked the app.

## The empirical rule (binds every seat, every session)

**Verify your surface empirically; never assume it from this repo, from memory, or from a model name.** If a button, tab, or capability described here doesn't match what you see live, the live app is right and this repo is stale — open an issue (or a PR truing the text) so the next person lands on current ground. That loop is how a documentation repo stays alive; you are part of it the moment you notice.

The grounding pages (`grounding/`, and each seat's `GROUNDING.md`) point at Anthropic's own documentation for the same reason: linked docs stay current where copied docs rot. A weekly [link-check workflow](.github/workflows/link-check.yml) files an issue when any of those links die.

## Verification log

| Date | Verified | By |
|---|---|---|
| 2026-07-13 | "Use this template" flow verified by a real human click — the private option is offered, the full file tree carries over, and the generated-from label shows on the new repo. The live one-pager verified serving at squidbay.github.io/factory (all assets 200) | the factory that ships this template |
| 2026-07-13 | Initial skeleton built and checked against the live desktop app: Code-tab repo attach, Cowork/Chat rooms, connector browse flow. GitHub Mobile PR review + merge verified against GitHub's own documentation, not hands-on | the factory that ships this template |

*(New rows on top. Add one whenever a real verification pass happens — an entry claiming more than was actually checked is worse than no entry.)*

This active page stays short on purpose. When it grows long — past roughly 20 rows, or at the turn of a calendar quarter — the oldest rows roll into a dated file under [`versions/`](versions/README.md), newest-first there too, so the current picture is always the first thing you read. Rolling never deletes a row and never moves this file; the procedure is in [`versions/README.md`](versions/README.md).
