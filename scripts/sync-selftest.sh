#!/usr/bin/env bash
# sync-selftest.sh — prove the inbound sync obeys the ownership boundary, and
# prove the test can fail.
#
#     Factory updates the operating system.
#     It does not redecorate the customer's office.
#
# A test that only ever shows the good outcome proves nothing: it might be
# passing because the harness never checks anything. So every claim here is
# paired with a control that must come out the other way.
#
#   TEST 1  (claim)     new logic  -> an office-only file SURVIVES
#   TEST 2  (control)   old logic  -> the same file is DELETED
#   TEST 3  (claim)     new logic  -> a "!" path is NOT overwritten
#   TEST 4  (claim)     new logic  -> Factory (core) changes DO land
#   TEST 5  (claim)     new logic  -> a customised OFFICE-owned file survives
#                                     byte-for-byte while core updates land
#   TEST 6  (control)   the SAME fixture with that path declared `core`
#                                  -> the customisation IS clobbered
#   TEST 7  (claim)     new logic  -> a missing office-owned default is SEEDED
#   TEST 8  (claim)     new logic  -> an office-owned file that improved
#                                     upstream produces a MIGRATION PROPOSAL
#                                     and no write
#   TEST 9  (claim)     longest match wins: a `core` loader inside an `office`
#                                     folder still updates
#   TEST 10 (control)   a bare (classless) manifest line still behaves as
#                                     `core` — backward compatibility
#
# If a control ever comes out the same way as its claim, the harness is blind
# and every green above it is meaningless. That is the point of running them.
#
# Usage: scripts/sync-selftest.sh          (no arguments, no network, no repo writes)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SYNC="$ROOT/scripts/factory-sync.sh"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

fail=0
ok()   { printf '  \033[32mPASS\033[0m  %s\n' "$1"; }
bad()  { printf '  \033[31mFAIL\033[0m  %s\n' "$1"; fail=1; }

# ─────────────────────────────────────────────────────────────────────────────
# Fixture A — the original non-destructive fixture (TESTS 1–4)
# The office carries one file the Factory has never heard of — the shape of any
# page an office writes for itself inside a managed folder.
# ─────────────────────────────────────────────────────────────────────────────
build_fixture() {
  local dir="$1"
  rm -rf "$dir"; mkdir -p "$dir/template/managed" "$dir/office/managed" "$dir/office/.github"

  echo "template version 2"            > "$dir/template/managed/shared.md"
  echo "from the template"             > "$dir/template/managed/template-only.md"
  echo "template's idea of the boot"   > "$dir/template/managed/BOOT-COMMON.md"

  echo "template version 1"            > "$dir/office/managed/shared.md"
  echo "OFFICE ONLY — nobody upstream knows this file exists" \
                                       > "$dir/office/managed/office-only.md"
  echo "THE OFFICE'S OWN BOOT — must not be reclaimed" \
                                       > "$dir/office/managed/BOOT-COMMON.md"

  cat > "$dir/office/.github/manifest.txt" <<'MEOF'
# a miniature manifest
managed/
!managed/BOOT-COMMON.md
MEOF
}

echo "sync-selftest — ownership boundary + non-destructive sync"
echo
echo "== Part 1: nothing gets deleted, '!' is honoured, updates still land =="
echo

build_fixture "$WORK/new"
( cd "$WORK/new/office" && "$SYNC" "$WORK/new/template" .github/manifest.txt --mode=nondestructive ) >"$WORK/new.log" 2>&1
echo "--- new logic (--mode=nondestructive) ---"; sed 's/^/    /' "$WORK/new.log"

[ -f "$WORK/new/office/managed/office-only.md" ] \
  && ok "TEST 1  office-only file SURVIVES the new sync" \
  || bad "TEST 1  office-only file was deleted by the new sync"

if [ "$(cat "$WORK/new/office/managed/BOOT-COMMON.md")" = "THE OFFICE'S OWN BOOT — must not be reclaimed" ]; then
  ok "TEST 3  '!' protected file NOT overwritten"
else
  bad "TEST 3  '!' protected file was overwritten by the Factory's copy"
fi

if [ "$(cat "$WORK/new/office/managed/shared.md")" = "template version 2" ] \
   && [ -f "$WORK/new/office/managed/template-only.md" ]; then
  ok "TEST 4  the sync still syncs (core updates land, new Factory files arrive)"
else
  bad "TEST 4  the sync stopped delivering Factory updates"
fi

echo
build_fixture "$WORK/old"
( cd "$WORK/old/office" && "$SYNC" "$WORK/old/template" .github/manifest.txt --mode=legacy ) >"$WORK/old.log" 2>&1
echo "--- old logic (--mode=legacy, the rm -rf that shipped) ---"; sed 's/^/    /' "$WORK/old.log"

[ ! -f "$WORK/old/office/managed/office-only.md" ] \
  && ok "TEST 2  NEGATIVE CONTROL: old logic DELETED the office-only file (as it must, or this test is blind)" \
  || bad "TEST 2  negative control did not delete — the harness is not actually testing anything"

# ─────────────────────────────────────────────────────────────────────────────
# Fixture B — the OWNERSHIP fixture (TESTS 5–10)
#
# A miniature office with the real shape: a folder that is office-owned, one
# thin loader inside it that stays Factory-owned, one bare classless line, and
# an office that has deliberately customised its boot material and added files
# of its own.
# ─────────────────────────────────────────────────────────────────────────────
build_ownership_fixture() {
  local dir="$1" manifest="$2"
  rm -rf "$dir"; mkdir -p \
    "$dir/template/seats/coach/coach" "$dir/template/engine" \
    "$dir/office/seats/coach/coach"   "$dir/office/engine" "$dir/office/.github"

  # --- the Factory's tree, one version ahead on everything ---
  echo "FACTORY BOOT MATERIAL v2"        > "$dir/template/seats/coach/BOOT-PROMPT.md"
  echo "FACTORY GROUNDING v2"            > "$dir/template/seats/coach/GROUNDING.md"
  echo "FACTORY DEFAULT — brand new"     > "$dir/template/seats/coach/NEW-DEFAULT.md"
  echo "LOADER v2 — read the repo"       > "$dir/template/seats/coach/coach/SKILL.md"
  echo "ENGINE v2"                       > "$dir/template/engine/run.sh"

  # --- the office's tree: deliberately customised ---
  echo "OUR OWN BOOT MATERIAL — hand written, do not reclaim" \
                                         > "$dir/office/seats/coach/BOOT-PROMPT.md"
  echo "FACTORY GROUNDING v1"            > "$dir/office/seats/coach/GROUNDING.md"
  echo "a page this office wrote for itself" \
                                         > "$dir/office/seats/coach/OUR-OWN-PAGE.md"
  echo "LOADER v1 — read the repo"       > "$dir/office/seats/coach/coach/SKILL.md"
  echo "ENGINE v1"                       > "$dir/office/engine/run.sh"
  # NEW-DEFAULT.md is deliberately absent — the office has never seen it.

  cp "$manifest" "$dir/office/.github/manifest.txt"
}

echo
echo "== Part 2: the ownership boundary =="
echo

# The real model: the seat folder is the office's, the loader inside it is ours,
# and `engine/` is a bare classless line (the pre-ownership manifest shape).
cat > "$WORK/manifest-owned.txt" <<'MEOF'
office seats/coach/
core   seats/coach/coach/
engine/
MEOF

# The control model: the SAME paths, but the seat folder declared core — which
# is precisely what every manifest said before ownership existed.
cat > "$WORK/manifest-flat.txt" <<'MEOF'
core seats/coach/
core seats/coach/coach/
engine/
MEOF

build_ownership_fixture "$WORK/own" "$WORK/manifest-owned.txt"
( cd "$WORK/own/office" && "$SYNC" "$WORK/own/template" .github/manifest.txt \
    --mode=nondestructive --report="$WORK/migrations.md" ) >"$WORK/own.log" 2>&1
echo "--- ownership model (office seats/coach/ + core loader) ---"; sed 's/^/    /' "$WORK/own.log"

if [ "$(cat "$WORK/own/office/seats/coach/BOOT-PROMPT.md")" = "OUR OWN BOOT MATERIAL — hand written, do not reclaim" ] \
   && [ "$(cat "$WORK/own/office/seats/coach/OUR-OWN-PAGE.md")" = "a page this office wrote for itself" ]; then
  ok "TEST 5  customised office-owned boot material SURVIVES byte-for-byte, and so does the office's own added page"
else
  bad "TEST 5  office-owned material was reclaimed by the Factory"
fi

if [ "$(cat "$WORK/own/office/seats/coach/NEW-DEFAULT.md" 2>/dev/null)" = "FACTORY DEFAULT — brand new" ]; then
  ok "TEST 7  a default the office does not have yet is SEEDED"
else
  bad "TEST 7  a brand-new office-owned default never arrived"
fi

if grep -q 'seats/coach/GROUNDING.md' "$WORK/migrations.md" 2>/dev/null \
   && [ "$(cat "$WORK/own/office/seats/coach/GROUNDING.md")" = "FACTORY GROUNDING v1" ]; then
  ok "TEST 8  an office-owned default that improved upstream produced a MIGRATION PROPOSAL and no write"
else
  bad "TEST 8  no migration proposal for the improved office-owned default (or it was written anyway)"
fi

if [ "$(cat "$WORK/own/office/seats/coach/coach/SKILL.md")" = "LOADER v2 — read the repo" ]; then
  ok "TEST 9  longest match wins: the core loader inside an office folder DID update"
else
  bad "TEST 9  the Factory-owned loader did not update — the longest-match rule is not working"
fi

if [ "$(cat "$WORK/own/office/engine/run.sh")" = "ENGINE v2" ]; then
  ok "TEST 10 a bare classless manifest line still behaves as core (backward compatible)"
else
  bad "TEST 10 a bare classless line stopped updating — old manifests would silently freeze"
fi

echo
build_ownership_fixture "$WORK/flat" "$WORK/manifest-flat.txt"
( cd "$WORK/flat/office" && "$SYNC" "$WORK/flat/template" .github/manifest.txt --mode=nondestructive ) >"$WORK/flat.log" 2>&1
echo "--- NEGATIVE CONTROL: the same office with seats/coach/ declared core ---"; sed 's/^/    /' "$WORK/flat.log"

if [ "$(cat "$WORK/flat/office/seats/coach/BOOT-PROMPT.md")" = "FACTORY BOOT MATERIAL v2" ]; then
  ok "TEST 6  NEGATIVE CONTROL: declared core, the SAME customisation IS clobbered (so TEST 5's green means something)"
else
  bad "TEST 6  negative control did not clobber — TEST 5 proves nothing"
fi

echo
if [ "$fail" -eq 0 ]; then
  echo "sync-selftest: ALL PASS"
else
  echo "sync-selftest: FAILURES ABOVE"
fi
exit "$fail"
