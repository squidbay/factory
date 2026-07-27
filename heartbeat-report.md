# 🫀 Factory heartbeat — 2026-07-27 00:24 UTC

Read-only pulse. Nothing here was changed, installed, or sent anywhere.

## Your factory

| | Version |
|---|---|
| This factory is on | `2026-07-26` |
| Master's latest Release | `2026-07-23.4` |
| Master's version file | `2026-07-26` |

**GREEN — your factory is current** (`2026-07-26`). Nothing to do.

*(Note: the master's Release tag and version file disagree — `2026-07-23.4` vs `2026-07-26`. Expected between a merge and a release cut; the newer wins.)*

## Your seats

What the published Anthropic surfaces are at tonight. Your seats run on
these; when one moves, capabilities move with it.

| Seat | Surface it runs on | Latest published | How it's checked |
|---|---|---|---|
| **Code** 🤖🔧 | Claude Code | `2.1.220` | machine — npm registry |
| **Cowork** 🤖🧭 | Claude Cowork | *session-captured* | the seat reports at boot |
| **Coach** 🤖📋 | Claude chat | *session-captured* | the seat reports at boot |
| **Designer** 🤖🎨 | Claude Design canvas | *session-captured* | the seat reports at boot |
| *(building on the API)* | Agent SDK | `0.3.220` | machine — npm registry |

**Why some rows say *session-captured*.** A CI runner has no Claude
installed and no session to look at, so it genuinely cannot read which
desktop build you have or which plugins are enabled in your app. Rather
than print a guess, the heartbeat names those legs and leaves them to the
seats: **each seat probes its own surface at boot and says what it found**
(that step is already in every seat's boot order). If a seat has not
reported in a while, that silence is the signal — ask it.

**Nothing here is installed automatically.** Updating the desktop app or
adding a plugin is a human action, and often a Local-session one. The
heartbeat's job is to make sure you *know*, not to act.

## Housekeeping

- `journal.md` is 1628 characters — comfortably readable in one call.
- 1 journal entry is waiting in `journal/pending/` for a splice.

---

## 🟢 GREEN — nothing needs you tonight.
