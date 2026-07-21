# Security

## The posture, plainly

This project's design premise is that **agents make mistakes** — so the architecture assumes it, rather than hoping otherwise:

- **No exposed services.** A factory is a git repo plus the Claude desktop app. There is no server of ours to compromise, no webhook listening, no dashboard with your keys behind it.
- **No credential in any chat or committed file — by construction, then by CI.** The token model ([`tokens/TOKEN-MODEL.md`](../tokens/TOKEN-MODEL.md)) keeps values in GitHub Actions secrets or the host's secret store; the [guardrails workflow](workflows/guardrails.yml) fails any commit that looks like it carries one, from your first commit onward. The single sanctioned exception (a rare one-time deploy/DNS token) is designed to be **burned immediately after use**.
- **Broad access is read-only; write access is narrow, expiring, and human-gated.** Seats that see everything can change nothing; seats that change things do it by pull request, and only a human merges — with branch protection making that structural, not aspirational (Stage 1).
- **The office repo is private by default** (created via the template button, which never inherits public visibility), and the workshop keeps its secrets in the host's store — so even a public workshop leaks nothing.
- **Drift is a handled case.** A seat behaving oddly is closed and respawned from the repo (RULE 17), not argued with — which bounds how far a confused agent can wander.

What this system deliberately does **not** do: run unattended writes anywhere, expose an agent to inbound traffic, hold long-lived powerful tokens in any conversation, or let any automated actor merge.

## Threat model (the short version)

The realistic risks for a factory owner are: a credential pasted where it doesn't belong (mitigated by the token model + CI + the burn ritual), a malicious or sloppy contribution (mitigated by the human co-sign rule and maintainer gate), and a drifted seat acting on stale beliefs (mitigated by grounding-first boots, the tripwire, and the respawn ritual). Nothing here defends against a compromised GitHub or Anthropic account itself — protect those with strong auth like the accounts they are.

## Reporting a vulnerability

Found something — in the workflows, the token model, the onboarding's security claims? **Open a GitHub Security Advisory** on this repo (Security tab → Report a vulnerability) so it stays private while it's live. If it can't wait, an issue that says only "security — requesting private contact" will get a maintainer to you without publishing details. We commit to acknowledging within a week, fixing honestly, and crediting you unless you'd rather we didn't.
