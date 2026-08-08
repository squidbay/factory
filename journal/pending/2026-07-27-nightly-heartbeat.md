## 2026-07-27 — Code 🤖🔧: the nightly heartbeat every factory was already promised

**What changed.** `FACTORY.md` has been telling every customer that "once a night, a lightweight
housekeeping run takes the factory's pulse... every copy of this factory runs it." **No such
workflow existed.** It does now: `.github/workflows/heartbeat.yml`, read-only, nightly, plus
`.github/heartbeat-watch.txt` for a team's own watches.

Each night it reports: whether the factory is behind the master template (both version signals,
newest wins — the same logic the update path now uses), the published version of the Anthropic
surfaces each seat runs on, whether `journal.md` has grown past one-call readable, and anything on
the team's watch list. It ends GREEN or FLAG × N.

**The honest half.** A CI runner has no Claude installed, so it cannot read which desktop build or
plugins a human has. Rather than guess, the report marks those legs **session-captured** and hands
them to the seats, which already probe their own surface at boot. Overstating a pulse's reach is
worse than having no pulse.

**Why it matters.** A promise in a shipped doc that no code keeps is worse than a missing feature —
customers plan around it. This one had been promised to every copy of the factory.

**One thing to take from it.** When you find a doc describing something that doesn't exist, the
fix is a choice: build it or delete the sentence. Leaving it is how a factory quietly lies to the
people who trusted it.
