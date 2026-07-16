# Connect your Claude to this repo (2 minutes, one time)

If a session just told you it can read your repo but **can't write** to it — or
can't see it at all — you're in the most common snag there is, and it is not
your fault. Claude's connection to GitHub has **two halves**, and they are
**different switches on different pages.** People flip the first, see "Connected,"
and assume they're done. They're not. Both must be on.

Do these in order, in your normal web browser. It takes about two minutes.

## Half 1 — AUTHORIZE: connect GitHub to your Claude account
1. Go to **claude.ai** and sign in.
2. Click your initials (bottom-left) → **Settings → Connectors**.
3. Find **GitHub** → click **Connect**.
4. Sign in to GitHub and approve what it asks.
5. If it asks which repositories, choose **All repositories** → the green button.

This is the half most people finish. On its own it is **not enough** — it lets
Claude *ask* for access; it does not *install* the app that grants it.

## Half 2 — INSTALL: put the Claude GitHub App on your account (the half that's usually missing)
1. Go to **github.com/settings/installations**.
2. Look under **Installed GitHub Apps**. **Claude** must appear **there**.
   - ⚠️ There is a separate **"Authorized GitHub Apps"** tab. Claude showing up
     under *Authorized* is **not** the same thing and is **not enough** — it must
     be under **Installed**.
3. If Claude is **not** under Installed: go to **github.com/apps/claude** →
   **Install** → choose your account → **All repositories** → the green button.

## Verify — this step is mandatory, not optional
1. Return to **github.com/settings/installations**.
2. Confirm **Claude** is listed under **Installed GitHub Apps**, with access to
   this repo (All repositories, or this repo by name).

If it's not under **Installed**, the connection is still only half-done and every
change a session tries to make will silently fail. Don't skip this check — it is
the one that catches the exact trap that wastes people's evenings.

## Then — and this matters — start ONE brand-new session
Old sessions that were open while the connection was broken are holding **dead
credentials**. They will keep failing even after you fix the switches above.

1. Open the Claude desktop app → **Code** tab.
2. **Ignore every old session — never resume them.** Click **New session**.
3. Pick this repo and let the fresh session lead. It will prove its own access
   before doing anything (that's built in now), so you'll *know* it's connected
   instead of hoping.

That's the whole fix. After this, your Claude team runs from this repo, and every
change it makes reaches you as a pull request — one that only **you** can merge.
