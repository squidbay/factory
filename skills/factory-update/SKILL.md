---
name: factory-update
description: "Explains and drives the factory's update path — how improvements to the public template reach this office as a human-gated pull request. Invoke when the human asks 'is my factory up to date?', when a factory-update PR needs explaining hunk by hunk, or when an update was declined and needs a selective re-apply."
---

# factory-update — keeping your factory current, on your terms

Your office was created from the template with the template button, which means it kept **no live link** to the template — that's what keeps it private and fully yours. The `factory-update` workflow is the deliberate bridge back: on the first of each month (or whenever you run it from the **Actions** tab → **factory-update** → **Run workflow**), it compares your office's *template-managed* paths against the current template and, if anything improved, opens **one pull request** with the whole delta.

## What the update can and cannot touch

The boundary is a file you own: [`.github/template-manifest.txt`](../../.github/template-manifest.txt). Paths listed there (the rulebook, the guides, the seats' boot files, the shipped skills and missions) are template-managed and may appear in an update PR. Everything else is **never touched**: your journal, your specs, your roster in `FACTORY.md`, mission packs you added, your denylist. If you edited a managed file and want to keep your version, remove its line from the manifest — from then on it's yours.

Two things the update deliberately reports **without applying** (look for "Also noticed, not applied" in the PR body):

- **Workflow changes.** A repo's automation cannot rewrite its own automation — when the template's workflows improve, the PR tells you, and bringing them over is a normal Code-seat task.
- **Manifest drift.** If your manifest differs from the template's, the PR says so and leaves yours alone.

One more honest mechanic: because the workflow opens its PRs with the default Actions token, **your other workflows — the guardrails check included — do not run on update PRs.** That's a GitHub rule, not a malfunction. The content arrives from the public template, which runs its own gates before anything lands there; if you want your own checks on an update anyway, ask a Code seat to re-open the same delta as a normal PR.

## How to handle an update PR

1. **Read the diff like any PR** — it's usually copy improvements, new guide sections, sharpened seat rules. Ask any seat to explain a hunk in plain words; that's what they're for.
2. **Merge** when satisfied. **Close** to skip a round — while a difference remains, the next run re-proposes it, so skipping is never permanent unless you edit the manifest.
3. **Want part of it?** Ask a Code seat: "take the open factory-update PR, keep only the changes to X and Y, and re-open it." Selective adoption is a normal request, not a special mode.

## For the seat running this

- The update PR is **the template's opinion, not an order.** When the human asks whether to merge, compare the delta against their journal and their edits — if the template overwrites something they customized on purpose, say so plainly and offer the manifest opt-out.
- Never merge it yourself; never advise auto-merging updates. The whole design is that the human reads what changes.
- If the human declined a hunk repeatedly, propose the durable fix (remove that path from the manifest) instead of letting them decline forever.
