#!/usr/bin/env bash
# factory-sync.sh — apply the template's managed paths onto this office.
#
# This script is the ENGINE behind .github/workflows/factory-update.yml. The
# workflow calls it; scripts/sync-selftest.sh calls the same script. That is
# deliberate: the thing under test and the thing that ships are one file, so a
# green self-test cannot mean something different from what runs in CI.
#
# ── Why this file exists ──────────────────────────────────────────────────────
# The old inline logic in factory-update.yml did this, once per managed
# directory:
#
#     rm -rf "./$path" && mkdir -p "./$path" && cp -r "$SRC"/. "./$path"
#
# That is not a sync, it is a RESTORE. Every file your office keeps under a
# managed directory that the template has never heard of is deleted, silently,
# because it was not in the template's copy of that directory. On 2026-08-01 a
# run of that logic committed exactly such a deletion and pushed it to a branch.
#
# ── The two modes ─────────────────────────────────────────────────────────────
#   nondestructive (default)  overwrite-only. Template files are copied over
#                             yours; files of yours that the template lacks are
#                             LEFT ALONE. Nothing is ever deleted.
#   legacy                    the old rm -rf behaviour, reproduced exactly.
#                             It exists for ONE reason: the self-test's negative
#                             control needs to demonstrate that the old logic
#                             really does delete, or "the new logic keeps the
#                             file" proves nothing. Never use it for a real sync.
#
# ── Protected paths ───────────────────────────────────────────────────────────
# A manifest line beginning with "!" marks a path the sync must never WRITE,
# even though it sits under a managed directory. Use it for files this office
# has deliberately customised and does not want the template to reclaim.
#   !seats/_shared/BOOT-COMMON.md   -> that exact file is never overwritten
#   !seats/cowork/doctrine/         -> nothing under that directory is written
#
# ── The accepted trade-off, stated plainly ────────────────────────────────────
# Overwrite-only can never propagate a genuine upstream DELETION. If the
# template retires a file, your office keeps its copy until a human removes it.
# That is the cost, and it is the right side to err on: a stale file is visible
# and reversible, a deleted one is neither.
#
# Usage:  factory-sync.sh <template-root> <manifest-file> [--mode=MODE]
# Run from the office root. Writes to the current directory.

set -euo pipefail

TEMPLATE_ROOT="${1:?usage: factory-sync.sh <template-root> <manifest-file> [--mode=nondestructive|legacy]}"
MANIFEST="${2:?usage: factory-sync.sh <template-root> <manifest-file> [--mode=nondestructive|legacy]}"
MODE="nondestructive"

for arg in "${@:3}"; do
  case "$arg" in
    --mode=*) MODE="${arg#--mode=}" ;;
    *) echo "factory-sync: unknown argument '$arg'" >&2; exit 2 ;;
  esac
done

case "$MODE" in
  nondestructive|legacy) ;;
  *) echo "factory-sync: --mode must be 'nondestructive' or 'legacy' (got '$MODE')" >&2; exit 2 ;;
esac

[ -d "$TEMPLATE_ROOT" ] || { echo "factory-sync: template root '$TEMPLATE_ROOT' is not a directory" >&2; exit 2; }
[ -f "$MANIFEST" ]      || { echo "factory-sync: no manifest at '$MANIFEST' — nothing is template-managed." >&2; exit 0; }

# ── Pass 1: collect protected paths ("!" lines) ──────────────────────────────
PROTECTED=()
while IFS= read -r line || [ -n "$line" ]; do
  case "$line" in ''|'#'*) continue ;; esac
  line="${line%% *}"
  case "$line" in '!'*) PROTECTED+=("${line#!}") ;; esac
done < "$MANIFEST"

is_protected() {
  local dest="$1" p
  for p in ${PROTECTED+"${PROTECTED[@]}"}; do
    case "$p" in
      */) [ "${dest#"$p"}" != "$dest" ] && return 0 ;;   # directory prefix
      *)  [ "$dest" = "$p" ] && return 0 ;;              # exact file
    esac
  done
  return 1
}

copy_one() {
  local src="$1" dest="$2"
  if is_protected "$dest"; then
    echo "  protected: $dest (kept — manifest '!' entry)"
    return 0
  fi
  mkdir -p "$(dirname "./$dest")"
  cp "$src" "./$dest"
}

# ── Pass 2: apply the managed paths ──────────────────────────────────────────
while IFS= read -r path || [ -n "$path" ]; do
  case "$path" in ''|'#'*) continue ;; esac
  path="${path%% *}"
  case "$path" in '!'*) continue ;; esac   # handled in pass 1

  SRC="$TEMPLATE_ROOT/$path"
  if [ ! -e "$SRC" ]; then
    # In the manifest but gone from the template: note it, and never delete the
    # office's copy on the template's behalf.
    echo "note: '$path' is in your manifest but not in the template (skipped)"
    continue
  fi

  case "$path" in
    */)
      if [ "$MODE" = "legacy" ]; then
        # The old behaviour, kept ONLY as the self-test's negative control.
        rm -rf "./$path" && mkdir -p "./$path" && cp -r "$SRC"/. "./$path"
      else
        mkdir -p "./$path"
        while IFS= read -r -d '' rel; do
          rel="${rel#./}"
          copy_one "$SRC/$rel" "$path$rel"
        done < <(cd "$SRC" && find . -type f -print0)
      fi
      ;;
    *)
      copy_one "$SRC" "$path"
      ;;
  esac
done < "$MANIFEST"
