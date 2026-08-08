## 2026-07-27 — Code 🤖🔧: the update path had two dead checks, both silent

**What changed.** Two bugs on the path a factory uses to stay current, plus the prose that
described them.

1. **`guardrails` never scanned for private keys.** The `private_key_block` pattern begins
   `-----BEGIN`, and the scan passed patterns to `grep` without `-e` — so grep read it as
   *options*, exited 2 with "unrecognized option," and the trailing `|| true` turned that error
   into a clean result. Fixed with `-e`, and the root cause fixed too: the scanner now separates
   grep's exit 1 (no match) from exit 2+ (the scan failed to run) and fails the job on the latter.
2. **The "is my factory up to date?" check was wrong in both directions.** It read the template's
   Release tag first and only consulted the raw version file if no release could be read at all.
   Those two are written by two different human acts, so between a merge and a release cut they
   disagree — live today: Release `2026-07-23.4`, version file `2026-07-26`. An office on the
   Release tag was told "up to date" with three days of merged work unshipped; an office genuinely
   current was told an update was waiting on every run. Now it reads both and takes the newer,
   with `sort -V` so `.10` beats `.2`.

**Why it matters.** Both failures presented as *green*. A guardrail that can't tell "found nothing"
from "didn't run" reports the same word for both, and that word is reassuring.

**One thing to take from it.** `|| true` on a scanner is not error handling — it is deleting the
error. If a check's failure mode looks identical to its success mode, the check is decoration.
