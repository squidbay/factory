# Mission: organize my business

**Get the whole business out of your head and into the repo — what exists, where it lives, who has keys — until any "where is…?" question is a one-minute lookup.**

## The brief

Most small businesses run on the owner's memory: which registrar holds the domain, which email owns the bank login, where the insurance PDF went, who set up the payment account and with what address. It works until it doesn't — a password reset that goes to an inbox nobody checks, a renewal that lapses because the reminder lived in a departed employee's calendar, a "quick question" that eats an afternoon.

This mission moves that load into your office repo, where it's versioned, reviewable, and never forgets. Three deliverables and one habit:

1. **The business documented** — what exists and where it lives.
2. **The accounts and credentials inventory** — every account and key the business depends on, by **name and location only**. The inventory records that a key exists, what it opens, where its value is stored, and who can touch it. **The value itself never leaves its vault** — never into the repo, never into a chat. That's the standing model in [`tokens/TOKEN-MODEL.md`](../../tokens/TOKEN-MODEL.md), and the repo's guardrail workflow enforces it mechanically: a PR containing something that looks like a secret fails its checks before you ever see it.
3. **The operational journal habit** — decisions and changes recorded as they happen, newest first, so "why did we do it that way?" has an answer with a date on it.
4. **Recurring chores turned into specs** — the monthly, quarterly, and yearly rituals written as specs the team can run, so a chore becomes "run the spec" instead of "try to remember all the steps."

The payoff is boring and enormous: the business stops depending on any one person's recall — including yours.

## What the team needs from you

- **A brain-dump session or three.** You talk, in the Cowork room, in plain words: every account, tool, subscription, domain, device, filing, and obligation you can think of. Nobody expects it complete on the first pass — the inventory is built to grow.
- **Access to look, not to touch.** Where the team can read something itself (a connected service, a document you share), it verifies rather than transcribes your memory (RULE 3 — observe it with a tool, or say you don't know). Where it can't see, it writes down what you said and marks it *unverified* until someone checks.
- **Your existing password manager or vault.** If you don't have one, setting one up becomes this mission's first spec — the inventory needs somewhere real to point at.
- **Ten minutes at the merge queue** every day or two. Every document lands by PR; you merge (RULE 14).

## How it runs

1. **PR 1 — the map of the business.** Cowork interviews you and writes `docs/BUSINESS.md`: what the business is, the entities and registrations, the products or services, the people, the physical and digital places things live. Plain language throughout — this document is for the day someone *else* needs to understand your business fast.
2. **PR 2 — the inventory.** Cowork drafts `docs/INVENTORY.md` from the brain-dump: one row per account or key — **service · what it's for · account name/identifier · where the credential lives (which vault, which entry) · who can access it · renewal or billing date if any · verified-on date**. Values never appear; locations always do. Code adds a guardrail check if one isn't already active, so the rule is enforced, not just stated.
3. **PR 3 — verification passes.** Row by row, a seat or you confirms each entry is real and current — a login page reached, a renewal date read off the actual account — and stamps the verified-on date. Unverifiable rows stay flagged rather than quietly trusted (RULE 11: flags travel first). Dispatch can chase down the stragglers as scoped research jobs.
4. **PR 4 and onward — chores into specs.** Each recurring task gets written as a spec from [`templates/EXECUTE-SPEC.md`](../../templates/EXECUTE-SPEC.md): the trigger ("first week of the quarter"), the steps, what done looks like, and which seat runs it. Renewals, filings, backup checks, "review the inventory" itself — each one becomes a document the team executes instead of a thing you carry.
5. **The habit, from day one.** Every working session ends with a journal entry ([`templates/JOURNAL-ENTRY.md`](../../templates/JOURNAL-ENTRY.md)). Decisions, changes, oddities — recorded when they happen. If it isn't in the journal, it didn't happen.

This mission never finishes so much as it *settles*: the documents become the place where changes land first, and the quarterly inventory-review spec keeps them true.

## Done looks like

- **The one-minute test, passed live:** pick any account or asset the business depends on and ask yourself "where is X and who can touch it?" — the answer comes off `docs/INVENTORY.md` in under a minute, without opening a vault and without asking anyone.
- Every inventory row carries a verified-on date, and none of them contains a secret value — the guardrail check is green on every merged PR.
- `docs/BUSINESS.md` would genuinely orient a smart stranger (or a future seat) in one reading.
- At least three recurring chores exist as specs, and at least one has been run *from* its spec, start to finish, by the team.
- The journal has entries from multiple sessions, newest first, and you've caught yourself checking it instead of your memory at least once.

## The celebration

Run the one-minute test out loud with someone else holding the stopwatch — spouse, business partner, whoever gets the 2 a.m. call if you're unreachable. Pick the account *they* worry about. When the answer comes off the repo in under a minute, you've just watched the business stop being a single point of failure. Write the time in the journal entry. Then take the evening off — the repo remembers now, so you don't have to.
