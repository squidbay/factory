#!/usr/bin/env bash
# sync-selftest.sh — prove the inbound sync is non-destructive, and prove the
# test can fail.
#
# A test that only ever shows the good outcome proves nothing: it might be
# passing because the harness never checks anything. So this runs BOTH:
#
#   TEST 1 (the claim)            new logic  -> the office-only file SURVIVES
#   TEST 2 (the negative control) old logic  -> the same file is DELETED
#   TEST 3 (protection)           new logic  -> a "!" path is NOT overwritten
#   TEST 4 (the sync still syncs) new logic  -> template changes DO land
#
# If TEST 2 ever passes-as-survival, the harness is broken and TEST 1's green is
# meaningless. That is the point of running it.
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

# ── Build a miniature template and a miniature office ────────────────────────
# The office carries one file the template has never heard of — the shape of
# any page an office writes for itself inside a managed folder.
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

  cat > "$dir/office/.github/manifest.txt" <<'EOF'
# a miniature manifest
managed/
!managed/BOOT-COMMON.md
EOF
}

echo "sync-selftest — office-only file under a managed directory"
echo

# ── TEST 1 + 3 + 4: the new, non-destructive logic ───────────────────────────
build_fixture "$WORK/new"
( cd "$WORK/new/office" && "$SYNC" "$WORK/new/template" .github/manifest.txt --mode=nondestructive ) >"$WORK/new.log" 2>&1
echo "--- new logic (--mode=nondestructive) ---"; sed 's/^/    /' "$WORK/new.log"

[ -f "$WORK/new/office/managed/office-only.md" ] \
  && ok "TEST 1  office-only file SURVIVES the new sync" \
  || bad "TEST 1  office-only file was deleted by the new sync"

if [ "$(cat "$WORK/new/office/managed/BOOT-COMMON.md")" = "THE OFFICE'S OWN BOOT — must not be reclaimed" ]; then
  ok "TEST 3  '!' protected file NOT overwritten"
else
  bad "TEST 3  '!' protected file was overwritten by the template's copy"
fi

if [ "$(cat "$WORK/new/office/managed/shared.md")" = "template version 2" ] \
   && [ -f "$WORK/new/office/managed/template-only.md" ]; then
  ok "TEST 4  the sync still syncs (updates land, new template files arrive)"
else
  bad "TEST 4  the sync stopped delivering template updates"
fi

echo

# ── TEST 2: the NEGATIVE CONTROL — the old logic, on the same fixture ────────
build_fixture "$WORK/old"
( cd "$WORK/old/office" && "$SYNC" "$WORK/old/template" .github/manifest.txt --mode=legacy ) >"$WORK/old.log" 2>&1
echo "--- old logic (--mode=legacy, the rm -rf that shipped) ---"; sed 's/^/    /' "$WORK/old.log"

[ ! -f "$WORK/old/office/managed/office-only.md" ] \
  && ok "TEST 2  NEGATIVE CONTROL: old logic DELETED the office-only file (as it must, or this test is blind)" \
  || bad "TEST 2  negative control did not delete — the harness is not actually testing anything"

echo
if [ "$fail" -eq 0 ]; then
  echo "sync-selftest: ALL PASS"
else
  echo "sync-selftest: FAILURES ABOVE"
fi
exit "$fail"
