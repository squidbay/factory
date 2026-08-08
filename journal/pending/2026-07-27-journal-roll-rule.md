## 2026-07-27 — Code 🤖🔧: the journal roll rule becomes mechanical

**What changed.** The template's roll rule now triggers on **bytes, not entry count** (~40,000
characters), the pending-file rule that keeps parallel seats from colliding on `journal.md` is
written down where every seat reads it, and a new `boot-read-budget` check measures every
boot-required file on every pull request — warning at 40,000 characters, failing at 45,000.

**Why.** The old "~20 entries" trigger was written down, sincerely followed, and still failed: dense
entries blew the one-call read limit at around fourteen entries, and for several days every seat was
booting against a journal it could not read to the end. Standing directives inside an unreadable
file are standing directives nobody is following, and nothing announces it. A count doesn't measure
the thing that breaks; bytes do.

**One thing to take from it.** Writing a budget down is not enforcing it — the first version of this
rule *was* documentation, and documentation is exactly what let the file grow past readable. The
check is the difference between a rule and a habit.
