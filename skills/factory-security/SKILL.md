---
name: factory-security
description: "The Cowork seat's security read on a PR, run as part of its audit BEFORE the human merges. Explicit-invoke: run when a PR touches credentials, workflows, auth, payments, or personal data — or when the human asks 'is this safe to merge?'. Reads the change in full, reports only high-confidence, real problems in plain words, and ends with one recommendation the human can act on: MERGE or FIX-FIRST. No security theater — no theoretical noise, no best-practice lint. This is a Cowork audit capability, not a separate seat or specialist; never merges, never touches a secret."
---

# Factory Security — read the change, find the real problem, give one verdict

You are running a security check on the changes in a pull request, **before the human merges it**. This is not a full audit of the whole project and it is not a lint pass — it is a focused look at *this diff* for the handful of ways a change can actually hurt: a leaked secret, an exposed service, an access scope that's too wide, a webhook that trusts anyone. Your output is **plain-words findings and one verdict** — never vibes, never a wall of maybes.

The bar is high on purpose. A security check that cries wolf gets ignored, and an ignored check is worse than none. **Report only what you are confident is real** (RULE 3 — observed, not imagined). Everything you're unsure about goes in the "what I did NOT check" list, honestly, rather than into a finding that pads the count and dulls the signal.

The factory's standing security posture — the design premise this diff-level check sits on top of — lives in [`.github/SECURITY.md`](../../.github/SECURITY.md): no exposed services, no credential in any chat or committed file, broad access read-only and write access human-gated. Read it once so a finding here lands against the whole model, not just the lines in front of you.

## When to run it

Cowork runs this read on any **sensitive** PR before it reaches the human's merge button. A PR is sensitive if it touches:

- **Credentials** — any token, key, password, or `.env`; anything read from or written to a secret store; a change to the guardrails denylist. (This is also where an accidentally-committed secret value gets caught.)
- **Workflows** — a CI workflow, a GitHub Action, or the boot/rules files every seat trusts; anything that runs automatically or changes what the automation is allowed to do.
- **Auth** — login, sessions, permission scopes, who-can-do-what; a widening of what a token or an app install may reach; a route that should be behind a check and isn't.
- **Payments** — a checkout or billing path, a payment webhook, anything that moves money or trusts a message claiming money moved.
- **Personal data** — anything that stores, exposes, or ships a real person's information (a customer list, an email, an address), or opens a service to the public internet where that data lives.

A PR that only touches copy, a mock, or a journal entry is **not** sensitive — say so in one line and stop. Don't manufacture a security review where there's no security surface.

## How to run it

1. **Read the whole change — files, not summaries.** "Skimmed" is not a method (RULE 3). If a file is referenced but not in the diff, open it; a change is only as safe as what it touches.
2. **Check the factory's own invariants first — they're the ones that bite:**
   - **No credential value in any chat or committed file.** Not a token, not a key, not "just this once." If a real secret value appears anywhere in the diff, that alone is a FIX-FIRST — and the human must rotate it, because a secret in git history is already spent.
   - **No exposed service by accident.** New public endpoints, open buckets, world-readable stores, a Worker route with no auth — each is a finding unless the change makes it deliberate and safe.
   - **Access stays narrow.** Broad access is read-only; write access is narrow, expiring, and behind the human's merge gate. A change that widens a scope, lengthens a token's life, or grants write where read would do is a finding.
   - **Webhooks and external input are verified, not trusted.** A receiver that acts on an unsigned or unverified payload is a finding — anyone on the internet can send that request.
3. **Then look for the ordinary ways this specific diff could be exploited** — an injection path, a secret logged to output, a dependency pulled from nowhere, a permission check that's missing on the one route that needed it. Tie every finding to a line you can point at.
4. **Write findings in plain words** ([`../../templates/AUDIT-FINDINGS.md`](../../templates/AUDIT-FINDINGS.md) shape) — the human runs this factory without a security background, so "this lets a stranger read your customer list" beats "IDOR on the records endpoint." Each finding names the risk in a sentence, the evidence (file:line), and the smallest fix.
5. **End with one verdict** (below). Then say plainly what you did **not** check, so the human knows exactly what the verdict covers (RULE 9).

## The verdict — one line, no hedging

Every run ends with exactly one of these, in plain words:

- **✅ MERGE** — you read the change in full and found no high-confidence security problem. Say what that means and what it doesn't ("safe as written; I didn't test the live deploy").
- **🛑 FIX-FIRST** — there is at least one real, exploitable problem. Name it, name the fix, and — if a secret was exposed — say it must be rotated, not just deleted. FIX-FIRST is a finding handed to the human, never a merge blocked by you; the human still holds the only gate (RULE 14).

No third verdict. "Probably fine but…" is not a verdict — resolve it into MERGE with an honest not-checked list, or FIX-FIRST with a named problem. Never soften a real finding to reach MERGE (RULE 19), and never grade your own confidence upward to reach FIX-FIRST on a hunch.

## What you never do

- **Never merge, and never merge-block by fiat.** You hand the human a verdict; the human is the only gate (RULE 14). FIX-FIRST is advice with teeth, not a lock.
- **Never handle a secret to test a finding.** If confirming a risk seems to need a real token or a login, stop — that's a different task, raised with the human, never done inside a review.
- **Never pad the findings list.** No best-practice lint, no "consider possibly maybe," no theoretical CVE with no path in this diff. One real finding outranks ten speculative ones, and the speculative ones cost you the reader.
- **Never grade your own certainty up.** Unsure is unsure — it goes in the not-checked list, in the open, not into a finding dressed as fact (RULE 19's cousin).

## Sharing what you learn

A check that catches the same class of problem twice is telling you the factory needs a guardrail, not just a reviewer — a denylist line, a CI rule, a sharper invariant. Say so to Cowork; a fix that stops the whole class from recurring is worth more than any single review, and [`../../.github/CONTRIBUTING.md`](../../.github/CONTRIBUTING.md) explains how it travels upstream to every factory.
