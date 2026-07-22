# VERSIONS — what this template was last verified against

AI product surfaces change fast — tab names move, features ship, mechanics get renamed. This page is the template's honesty about that.

**Last verified against the Claude desktop app: 2026-07-13.**

**The current template version is never written into this prose — on purpose.** A number a human edits can quietly lag the real version, so the version lives only in two machine-read places: the template's **latest GitHub Release** (`releases/latest`) and its one-line mirror [`.github/template-version.txt`](.github/template-version.txt). The update check is release-first — it reads `releases/latest` (whose tag *is* the version and whose notes are that update's [`FROM-HQ.md`](FROM-HQ.md) entry) and falls back to comparing the raw `.github/template-version.txt` when no release is reachable yet (how to run the check: [`guides/UPDATE-YOUR-FACTORY.md`](guides/UPDATE-YOUR-FACTORY.md)). Versions are a plain date so newer always wins at a glance; a second change on the same day adds a `.1`, `.2` suffix so the order never blurs. Bump the machine anchor (`.github/template-version.txt`) whenever a template-managed file changes, and cut the matching Release — this is the template's own version, distinct from the "last verified" date above, which tracks when a human last checked the app.

## The empirical rule (binds every seat, every session)

**Verify your surface empirically; never assume it from this repo, from memory, or from a model name.** If a button, tab, or capability described here doesn't match what you see live, the live app is right and this repo is stale — open an issue (or a PR truing the text) so the next person lands on current ground. That loop is how a documentation repo stays alive; you are part of it the moment you notice.

The grounding pages (`grounding/`, and each seat's `GROUNDING.md`) point at Anthropic's own documentation for the same reason: linked docs stay current where copied docs rot. A weekly [link-check workflow](.github/workflows/link-check.yml) files an issue when any of those links die.

## Verification log

| Date | Verified | By |
|---|---|---|
| 2026-07-22 | Root reorg + release-lane migration checked: three root files moved into their owned folders (`onboarding/CONNECT-YOUR-CLAUDE.md`, `.github/SECURITY.md`, `.github/CONTRIBUTING.md`) with every in-repo reference swept and re-resolved; the update-check machine anchor split out to `.github/template-version.txt`, and the check rewritten release-first (`releases/latest`) with a raw-file fallback. GitHub still surfaces the security policy and contributing guide from `.github/`; the manifest parses against the new paths | the factory that ships this template |
| 2026-07-13 | "Use this template" flow verified by a real human click — the private option is offered, the full file tree carries over, and the generated-from label shows on the new repo. The live one-pager verified serving at squidbay.github.io/factory (all assets 200) | the factory that ships this template |
| 2026-07-13 | Initial skeleton built and checked against the live desktop app: Code-tab repo attach, Cowork/Chat rooms, connector browse flow. GitHub Mobile PR review + merge verified against GitHub's own documentation, not hands-on | the factory that ships this template |

*(New rows on top. Add one whenever a real verification pass happens — an entry claiming more than was actually checked is worse than no entry.)*

This active page stays short on purpose. When it grows long — past roughly 20 rows, or at the turn of a calendar quarter — the oldest rows roll into a dated file under [`versions/`](versions/README.md), newest-first there too, so the current picture is always the first thing you read. Rolling never deletes a row and never moves this file; the procedure is in [`versions/README.md`](versions/README.md).
