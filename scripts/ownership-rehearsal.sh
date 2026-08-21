#!/usr/bin/env bash
# ownership-rehearsal.sh — run a REAL update against a REAL customised office
# and prove, byte by byte, that the boundary held.
#
#     Factory updates the operating system.
#     It does not redecorate the customer's office.
#
# scripts/sync-selftest.sh proves the engine's rules on miniature fixtures. This
# script proves the same claim on the actual repository trees, at full size,
# with the actual manifest — because a fixture can be right while the manifest
# that ships is wrong, and that failure would look exactly like success.
#
# ── What it does ─────────────────────────────────────────────────────────────
#   1. Creates a TEST OFFICE the way a real one is created: a full copy of the
#      Factory tree.
#   2. Gives that office a life. It CUSTOMISES office-owned material (the seat
#      boot prompts, the grounding, the shared boot file) and ADDS arbitrary
#      files of its own, in managed folders and outside them.
#   3. Advances the FACTORY: a core file changes, and an office-owned default
#      changes too — so the run can prove one lands and the other does not.
#   4. Runs the real sync, with the office's real manifest.
#   5. Checks every byte:
#        · every file the office customised is UNCHANGED
#        · every file the office added still EXISTS and is unchanged
#        · nothing was deleted
#        · the core change DID land (or the whole thing is a no-op that passes)
#        · the improved office-owned default was NAMED as a migration proposal
#        · no pre-existing file under an `office` folder was modified at all
#   6. Runs the NEGATIVE CONTROL: the identical rehearsal with every `office`
#      line rewritten to `core` — the pre-ownership manifest. The same
#      customisations must be CLOBBERED. If they survive, this rehearsal cannot
#      fail and its green above means nothing.
#
# Usage: scripts/ownership-rehearsal.sh [factory-root]     (default: this repo)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FACTORY="${1:-$ROOT}"
SYNC="$ROOT/scripts/factory-sync.sh"
MANIFEST_REL=".github/template-manifest.txt"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

fail=0
ok()   { printf '  \033[32mPASS\033[0m  %s\n' "$1"; }
bad()  { printf '  \033[31mFAIL\033[0m  %s\n' "$1"; fail=1; }
hdr()  { printf '\n\033[1m%s\033[0m\n' "$1"; }

[ -f "$FACTORY/$MANIFEST_REL" ] || { echo "ownership-rehearsal: no $MANIFEST_REL under $FACTORY" >&2; exit 2; }

# The files this office deliberately makes its own. Chosen because they are the
# ones a real office actually edits — the four seats' boot material, the shared
# boot file, and the grounding — plus pages nobody upstream has heard of.
CUSTOMISED=(
  "seats/_shared/BOOT-COMMON.md"
  "seats/coach/BOOT-PROMPT.md"
  "seats/cowork/BOOT-PROMPT.md"
  "seats/designer/OVERRIDES.md"
  "seats/worker/GROUNDING.md"
  "grounding/github/README.md"
)
ADDED=(
  "seats/cowork/doctrine/14-STANDING-OPERATOR-CORRECTIONS.md"
  "seats/coach/OUR-OWN-PLAYBOOK.md"
  "grounding/our-company/HOW-WE-TALK.md"
  "missions/first-website/OUR-VARIANT.md"
  "business/THE-PLAN.md"
)
# One Factory-owned file we expect to update, and one office-owned default we
# expect NOT to update but to be named instead.
PRESENT=()
CORE_PROBE="MECHANICAL-RULES.md"
OFFICE_PROBE="seats/coach/GROUNDING.md"

build_office() {                 # build_office <dest> <manifest-source>
  local office="$1" manifest="$2" f
  rm -rf "$office"
  cp -r "$FACTORY" "$office"
  rm -rf "$office/.git"
  cp "$manifest" "$office/$MANIFEST_REL"

  # --- the office lives a life ---
  # Only the files this tree actually has. An office is allowed to have removed
  # one of these, and a rehearsal that dies on a missing fixture file would
  # block that office's updates over its own housekeeping. PRESENT is filled on
  # the first build and reused, so the rehearsal and its control customise
  # exactly the same set.
  if [ "${#PRESENT[@]}" -eq 0 ]; then
    for f in "${CUSTOMISED[@]}"; do
      if [ -f "$office/$f" ]; then PRESENT+=("$f"); else echo "  (skipped, not in this tree: $f)"; fi
    done
    if [ "${#PRESENT[@]}" -lt 3 ]; then
      echo "ownership-rehearsal: only ${#PRESENT[@]} of the ${#CUSTOMISED[@]} fixture files exist in $FACTORY — too few to prove anything. Not reporting a pass." >&2
      exit 2
    fi
  fi
  for f in "${PRESENT[@]}"; do
    printf '\n<!-- THIS OFFICE MADE THIS FILE ITS OWN. If you are reading this in a diff, the boundary broke. -->\n' \
      >> "$office/$f"
  done
  for f in "${ADDED[@]}"; do
    mkdir -p "$(dirname "$office/$f")"
    printf 'A page this office wrote for itself. Nobody upstream has ever heard of it.\n' > "$office/$f"
  done
}

build_next_factory() {           # the Factory moves on
  local next="$1"
  rm -rf "$next"
  cp -r "$FACTORY" "$next"
  rm -rf "$next/.git"
  printf '\n<!-- FACTORY CORE UPDATE: this line is the operating system moving forward. -->\n' \
    >> "$next/$CORE_PROBE"
  printf '\n<!-- FACTORY improved this DEFAULT. It must NOT be written into a live office. -->\n' \
    >> "$next/$OFFICE_PROBE"
}

snapshot() {                     # snapshot <tree> <out>
  ( cd "$1" && find . -type f -not -path './.git/*' -print0 | sort -z \
      | xargs -0 sha256sum ) > "$2"
}

run_rehearsal() {                # run_rehearsal <label> <manifest> <office-out>
  local office="$3"
  build_office "$office" "$2"
  snapshot "$office" "$WORK/before.$1"
  ( cd "$office" && "$SYNC" "$WORK/next" "$MANIFEST_REL" \
      --mode=nondestructive --report="$WORK/migrations.$1.md" ) > "$WORK/sync.$1.log" 2>&1
  snapshot "$office" "$WORK/after.$1"
}

for probe in "$CORE_PROBE" "$OFFICE_PROBE"; do
  [ -f "$FACTORY/$probe" ] || { echo "ownership-rehearsal: this tree has no $probe — the rehearsal needs it as a probe. Not reporting a pass." >&2; exit 2; }
done

build_next_factory "$WORK/next"

# ═════════════════════════════════════════════════════════════════════════════
hdr "THE REHEARSAL — a customised office takes a real Factory Core update"
# ═════════════════════════════════════════════════════════════════════════════
run_rehearsal owned "$FACTORY/$MANIFEST_REL" "$WORK/office"

echo "  sync ran: $(grep -c . "$WORK/sync.owned.log" || true) lines of output; \
$(grep -c '^  seeded:' "$WORK/sync.owned.log" || true) seeded, \
$(grep -c '^  migration:' "$WORK/sync.owned.log" || true) migration proposals"
echo

# 1 — every customised file is byte-identical
survived=1
for f in "${PRESENT[@]}"; do
  if ! grep -q 'THIS OFFICE MADE THIS FILE ITS OWN' "$WORK/office/$f" 2>/dev/null; then
    echo "        clobbered: $f"; survived=0
  fi
done
[ "$survived" -eq 1 ] \
  && ok "every customised office-owned file survived, all ${#PRESENT[@]} of them (clause 5)" \
  || bad "office-owned customisation was reclaimed by the Factory"

# 2 — every added file still exists, unchanged
added_ok=1
for f in "${ADDED[@]}"; do
  [ -f "$WORK/office/$f" ] || { echo "        missing: $f"; added_ok=0; }
done
[ "$added_ok" -eq 1 ] \
  && ok "every arbitrary file the office added survived, all ${#ADDED[@]} of them" \
  || bad "a file the office added was removed"

# 3 — nothing was deleted at all
deleted="$(comm -23 <(cut -c68- "$WORK/before.owned" | sort) <(cut -c68- "$WORK/after.owned" | sort) || true)"
[ -z "$deleted" ] \
  && ok "nothing was deleted (the sync is still non-destructive)" \
  || { bad "the sync deleted files:"; echo "$deleted" | sed 's/^/        /'; }

# 4 — the Factory Core change DID land (otherwise this is a no-op that "passes")
grep -q 'FACTORY CORE UPDATE' "$WORK/office/$CORE_PROBE" \
  && ok "the Factory Core update LANDED in $CORE_PROBE (the sync is doing its job)" \
  || bad "the Factory Core update never arrived — this rehearsal proved nothing"

# 5 — the improved office-owned default was named, not written
if ! grep -q 'FACTORY improved this DEFAULT' "$WORK/office/$OFFICE_PROBE" \
   && grep -q "$OFFICE_PROBE" "$WORK/migrations.owned.md" 2>/dev/null; then
  ok "the improved office-owned default was NAMED as a migration proposal, not written"
else
  bad "the improved office-owned default was written into the office (or never reported)"
fi

# 6 — the general guarantee: no PRE-EXISTING file under an `office` folder was
#     modified. Additions under those folders are legal (that is seeding);
#     modifications are not. Computed here from the manifest directly, not from
#     the engine's own classifier, so this check is independent of the code it
#     is testing.
mapfile -t OFFICE_PREFIXES < <(grep -E '^[[:space:]]*office[[:space:]]+' "$FACTORY/$MANIFEST_REL" | awk '{print $2}')
violations=""
while IFS= read -r path; do
  # changed = present in both snapshots with different hashes
  before_hash="$(grep -F "  $path" "$WORK/before.owned" | head -n1 | cut -c1-64 || true)"
  after_hash="$(grep -F "  $path" "$WORK/after.owned"  | head -n1 | cut -c1-64 || true)"
  [ -n "$before_hash" ] || continue          # newly created = seeded, legal
  [ "$before_hash" = "$after_hash" ] && continue
  for pfx in "${OFFICE_PREFIXES[@]}"; do
    case "${path#./}" in
      "$pfx"*) violations="$violations
        ${path#./}  (under office rule '$pfx')" ;;
    esac
  done
done < <(cut -c68- "$WORK/after.owned")

if [ -z "$violations" ]; then
  ok "no pre-existing file under ANY 'office' rule was modified — ${#OFFICE_PREFIXES[@]} office rules checked (clause 2)"
else
  bad "the Factory modified pre-existing office-owned files:"; printf '%s\n' "$violations"
fi

# ═════════════════════════════════════════════════════════════════════════════
hdr "THE NEGATIVE CONTROL — the same office under the PRE-OWNERSHIP manifest"
# ═════════════════════════════════════════════════════════════════════════════
# Every `office` line rewritten to `core`. This is exactly the manifest every
# office had before this boundary existed. The same customisations must die.
sed -E 's/^([[:space:]]*)office([[:space:]]+)/\1core\2/' "$FACTORY/$MANIFEST_REL" > "$WORK/manifest-flat.txt"
run_rehearsal flat "$WORK/manifest-flat.txt" "$WORK/office-flat"

clobbered=0
for f in "${PRESENT[@]}"; do
  grep -q 'THIS OFFICE MADE THIS FILE ITS OWN' "$WORK/office-flat/$f" 2>/dev/null || clobbered=$((clobbered+1))
done
if [ "$clobbered" -eq "${#PRESENT[@]}" ]; then
  ok "NEGATIVE CONTROL: under the old flat manifest, all ${#PRESENT[@]} customised files were CLOBBERED — so the green above means something"
else
  bad "NEGATIVE CONTROL: only $clobbered of ${#PRESENT[@]} were clobbered — this rehearsal may be unable to fail"
fi

echo
if [ "$fail" -eq 0 ]; then
  echo "ownership-rehearsal: ALL PASS"
else
  echo "ownership-rehearsal: FAILURES ABOVE"
fi
exit "$fail"
