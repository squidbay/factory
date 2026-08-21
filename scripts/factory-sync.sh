#!/usr/bin/env bash
# factory-sync.sh — apply the Factory's CORE paths onto this office, and leave
# the office's OWN material alone.
#
# This script is the ENGINE behind .github/workflows/factory-update.yml. The
# workflow calls it; scripts/sync-selftest.sh calls the same script. That is
# deliberate: the thing under test and the thing that ships are one file, so a
# green self-test cannot mean something different from what runs in CI.
#
# ── The law this file implements ──────────────────────────────────────────────
#
#     Factory updates the operating system. It does not redecorate the
#     customer's office.
#
# Everything below is that sentence made mechanical.
#
# ── Ownership: OFFICE IS THE DEFAULT, CORE IS A NARROW ALLOWLIST ──────────────
# Every managed path carries an owner. The manifest says which:
#
#   core PATH       FACTORY-OWNED. Updates arrive by OVERWRITE, every run.
#                   The bar for this class is mechanical necessity: SquidBay
#                   must stay authoritative over that exact material for the
#                   framework to work correctly across every installation. Not
#                   "it's important," not "we wrote it." The updater engine, the
#                   version anchor, the update system's own delivery channel,
#                   and the four thin seat loader contracts — that is the shape
#                   of it, and the list should stay short enough to read.
#
#   office PATH     OFFICE-OWNED AFTER INSTALLATION, and this is the DEFAULT for
#                   anything human-editable: seat boot material, grounding,
#                   overrides, local doctrine, onboarding, templates, tool
#                   descriptions, hosting notes, mission packs, the rulebook,
#                   the office's own README and local policy. The Factory SEEDS
#                   one of these only when the office does not have it yet, and
#                   NEVER writes it again. If the upstream default later
#                   improves, the sync says so — a migration proposal named in
#                   the update PR — and still does not write.
#
#   PATH            A bare line with no owner means `core`. That is a PARSER
#                   fallback so manifests written before ownership existed do
#                   not silently stop receiving updates — it is NOT the policy.
#                   The Factory's own manifest carries zero bare lines and CI
#                   fails if one appears, so the allowlist cannot grow by
#                   accident or by forgetting a word.
#
#   !PATH           PROTECTED. The sync never writes it, whatever its class.
#                   The office's own local opt-out — a convenience, not a
#                   defence. Ownership is the defence, and a growing pile of "!"
#                   lines is the symptom of a classification that wants fixing
#                   upstream instead of patching office by office.
#
# Anything not named in the manifest at all is the office's, is never seeded,
# and is never mentioned.
#
# ── Which rule applies to a file: the LONGEST match wins ──────────────────────
# Rules are matched against the destination path, and the most specific one
# decides. This is what keeps a narrow Factory-owned contract inside a broad
# Office-owned tree — and why a whole directory is never declared Core merely
# because one small thing inside it is framework machinery:
#
#     office  seats/coach/                  <- the boot material is the office's
#     core    seats/coach/coach/            <- the thin loader stays ours
#
# `seats/coach/coach/SKILL.md` matches both; the longer pattern wins, so
# the loader updates and the boot material behind it does not. Order in the file
# does not matter — only specificity — so a manifest cannot be broken by moving
# a line.
#
# ── Why ownership had to become explicit ──────────────────────────────────────
# Before this, the manifest answered one question: "which upstream paths get
# copied?" A whole folder like `seats/` was listed, so every file under it was
# overwritten on every run — including the four seats' boot prompts, grounding
# and overrides, which are the exact files an office customises. The only escape
# was for each office to discover the problem and add its own `!` line, which
# means the protection existed only where somebody had already been burned.
#
# The manifest now answers a different question: "who owns this path after
# installation?" That single reframe is the boundary.
#
# And the answer defaults to the office. An earlier pass at this flipped only
# the paths that had already caused visible harm and left everything else Core,
# which rebuilds the same problem one directory over: the customer's onboarding,
# templates, rulebook and README were still being reclaimed, just more quietly.
# Core is now an allowlist that has to be argued for, file by file.
#
# ── The two things this sync can never do ─────────────────────────────────────
#   • It never DELETES. A file of yours the Factory has never heard of is left
#     alone. (An earlier version `rm -rf`'d each managed folder and re-copied
#     it, which silently deleted every office-only file inside. On 2026-08-01 a
#     run of that logic committed such a deletion and pushed it to a branch.)
#   • It never writes a `!` path, and never overwrites an `office` path.
#
# ── The accepted trade-off, stated plainly ────────────────────────────────────
# Overwrite-only can never propagate a genuine upstream DELETION, and seed-once
# can never propagate an upstream EDIT to a default. If the Factory retires or
# improves an office-owned file, your office keeps its copy until a human acts —
# with the improvement named in the PR so the choice is visible. That is the
# cost, and it is the right side to err on: a stale file is visible and
# reversible, a reclaimed one is neither.
#
# ── The two modes ─────────────────────────────────────────────────────────────
#   nondestructive (default)  the model described above.
#   legacy                    the original rm -rf behaviour, reproduced exactly,
#                             ignoring ownership entirely. It exists for ONE
#                             reason: the self-test's negative control needs to
#                             demonstrate that the old logic really does delete,
#                             or "the new logic keeps the file" proves nothing.
#                             Never use it for a real sync.
#
# Usage:  factory-sync.sh <template-root> <manifest-file> [--mode=MODE] [--report=FILE]
#   --report=FILE   append migration proposals (office-owned defaults that
#                   improved upstream) to FILE, as markdown bullets.
# Run from the office root. Writes to the current directory.

set -euo pipefail

TEMPLATE_ROOT="${1:?usage: factory-sync.sh <template-root> <manifest-file> [--mode=nondestructive|legacy] [--report=FILE]}"
MANIFEST="${2:?usage: factory-sync.sh <template-root> <manifest-file> [--mode=nondestructive|legacy] [--report=FILE]}"
MODE="nondestructive"
REPORT=""

for arg in "${@:3}"; do
  case "$arg" in
    --mode=*)   MODE="${arg#--mode=}" ;;
    --report=*) REPORT="${arg#--report=}" ;;
    *) echo "factory-sync: unknown argument '$arg'" >&2; exit 2 ;;
  esac
done

case "$MODE" in
  nondestructive|legacy) ;;
  *) echo "factory-sync: --mode must be 'nondestructive' or 'legacy' (got '$MODE')" >&2; exit 2 ;;
esac

[ -d "$TEMPLATE_ROOT" ] || { echo "factory-sync: template root '$TEMPLATE_ROOT' is not a directory" >&2; exit 2; }
[ -f "$MANIFEST" ]      || { echo "factory-sync: no manifest at '$MANIFEST' — nothing is Factory-managed." >&2; exit 0; }

# ── Manifest parsing ─────────────────────────────────────────────────────────
# A line is:  [class] path   |   !path   |   # comment   |   blank
# Sets R_CLASS and R_PATH. Returns 1 for a line with nothing on it.
parse_line() {
  local line="$1" first rest
  case "$line" in ''|'#'*) return 1 ;; esac
  read -r first rest <<<"$line"
  [ -n "${first:-}" ] || return 1
  case "$first" in
    core|office)
      R_CLASS="$first"
      read -r R_PATH _ <<<"${rest:-}"
      ;;
    *)
      R_CLASS="core"
      R_PATH="$first"
      ;;
  esac
  [ -n "${R_PATH:-}" ] || return 1
  return 0
}

# ── Pass 1: read every rule once ─────────────────────────────────────────────
PROTECTED=()
RULE_PATH=()
RULE_CLASS=()

while IFS= read -r line || [ -n "$line" ]; do
  R_CLASS=""; R_PATH=""
  parse_line "$line" || continue
  case "$R_PATH" in
    '!'*) PROTECTED+=("${R_PATH#!}"); continue ;;
  esac
  RULE_PATH+=("$R_PATH")
  RULE_CLASS+=("$R_CLASS")
done < "$MANIFEST"

matches() {   # matches <pattern> <dest>
  local p="$1" d="$2"
  case "$p" in
    */) [ "${d#"$p"}" != "$d" ] && return 0 ;;   # directory prefix
    *)  [ "$d" = "$p" ] && return 0 ;;           # exact file
  esac
  return 1
}

is_protected() {
  local dest="$1" p
  for p in ${PROTECTED+"${PROTECTED[@]}"}; do
    matches "$p" "$dest" && return 0
  done
  return 1
}

# The longest matching rule decides who owns the file.
owner_of() {
  local dest="$1" i best_len=-1 best_class="core"
  for i in "${!RULE_PATH[@]}"; do
    if matches "${RULE_PATH[$i]}" "$dest"; then
      if [ "${#RULE_PATH[$i]}" -gt "$best_len" ]; then
        best_len="${#RULE_PATH[$i]}"
        best_class="${RULE_CLASS[$i]}"
      fi
    fi
  done
  printf '%s' "$best_class"
}

SEEN=""
seen_already() {
  case "$SEEN" in *"|$1|"*) return 0 ;; esac
  SEEN="$SEEN|$1|"
  return 1
}

note_migration() {
  local dest="$1"
  echo "  migration: $dest (office-owned, kept — the Factory's default changed upstream)"
  if [ -n "$REPORT" ]; then
    mkdir -p "$(dirname "$REPORT")"
    printf -- '- `%s` — your copy differs from the Factory'"'"'s improved default. This file is **yours**, so nothing was written. Compare it with the upstream version if you want the improvement.\n' \
      "$dest" >> "$REPORT"
  fi
}

# ── Applying one file ────────────────────────────────────────────────────────
apply_one() {
  local src="$1" dest="$2"

  seen_already "$dest" && return 0

  if is_protected "$dest"; then
    echo "  protected: $dest (kept — manifest '!' entry)"
    return 0
  fi

  case "$(owner_of "$dest")" in
    office)
      if [ ! -e "./$dest" ]; then
        mkdir -p "$(dirname "./$dest")"
        cp "$src" "./$dest"
        echo "  seeded: $dest (office-owned from now on — the Factory will not write it again)"
      elif cmp -s "$src" "./$dest"; then
        : # identical; nothing to say
      else
        note_migration "$dest"
      fi
      ;;
    *)
      mkdir -p "$(dirname "./$dest")"
      cp "$src" "./$dest"
      ;;
  esac
}

# ── Pass 2: walk the rules and apply ─────────────────────────────────────────
apply_rule() {
  local path="$1"
  local SRC="$TEMPLATE_ROOT/$path"

  if [ ! -e "$SRC" ]; then
    # In the manifest but gone from the Factory: note it, and never delete the
    # office's copy on the Factory's behalf.
    echo "note: '$path' is in your manifest but not in the Factory (skipped)"
    return 0
  fi

  case "$path" in
    */)
      if [ "$MODE" = "legacy" ]; then
        # The old behaviour, kept ONLY as the self-test's negative control.
        # It knows nothing about ownership — that is exactly what it proves.
        rm -rf "./$path" && mkdir -p "./$path" && cp -r "$SRC"/. "./$path"
      else
        mkdir -p "./$path"
        while IFS= read -r -d '' rel; do
          rel="${rel#./}"
          apply_one "$SRC/$rel" "$path$rel"
        done < <(cd "$SRC" && find . -type f -print0)
      fi
      ;;
    *)
      if [ "$MODE" = "legacy" ]; then
        # Single files behaved the same under the old logic as under the new one
        # except that ownership did not exist: protection was honoured, class
        # was not. Reproduced exactly.
        if is_protected "$path"; then
          echo "  protected: $path (kept — manifest '!' entry)"
        else
          mkdir -p "$(dirname "./$path")"
          cp "$SRC" "./$path"
        fi
      else
        apply_one "$SRC" "$path"
      fi
      ;;
  esac
}

for i in "${!RULE_PATH[@]}"; do
  apply_rule "${RULE_PATH[$i]}"
done
