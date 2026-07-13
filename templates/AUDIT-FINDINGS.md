# Template — audit findings

**Written by the auditing seat (usually Cowork auditing Code's PR, or Code auditing Cowork's plan — the seats audit each other on purpose).** Every finding is stated plainly and gets a disposition in the same document (RULES 19–20): the auditor never grades its own finding's severity to soften it, and never leaves a finding without a home.

---

```markdown
# AUDIT — <what was audited> — YYYY-MM-DD

**Auditor: <seat>. Method: <what was actually checked, empirically — files read in full, checks re-run, links followed. "Skimmed" is not a method.>**

## Verdict (one line)
<Safe to merge / not yet, and the single sentence why.>

## Findings

### F1 — <the problem, named plainly>
- **Evidence:** <file:line, output, or observation — what makes this true.>
- **Disposition:** <FIX NOW (in this PR) · ASSIGNED (owner + named when) · CLOSED (reason, one line).>

### F2 — …

## What was NOT checked
<The honest list — anything out of the audit's reach, so the human knows what the verdict does and doesn't cover (RULE 9).>
```
