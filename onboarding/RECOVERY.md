# RECOVERY — when something goes wrong (it will, and it's fine)

Written for a person, not an engineer. Find your situation, follow the steps, and remember the design premise on the front page: agents make mistakes — the factory is built so their mistakes are cheap and yours are reversible.

## "I merged something bad"

Nothing is lost — git never forgets, and undo is a first-class move:

1. Open the repo → **Pull requests** → the merged PR (phone works fine for all of this).
2. At the bottom of the merged PR is a **Revert** button. Tap it — GitHub writes the undo-PR *for you*.
3. Merge the revert PR. The repo is back exactly where it was; both the mistake and the undo stay in history, which is a feature — the journal entry explains what happened for future-you.
4. Tell Cowork. It'll fold the lesson into the next spec.

## "My seat won't boot after an app update"

The app updated; your uploaded skill copy is a snapshot from before. Two minutes:

1. Claude app → **Settings → Skills** → remove the seat's old skill.
2. Upload it fresh from your repo (`seats/{seat}/{seat}-boot/`).
3. Boot it in the right room. If it reads the journal back to you, it's alive.

If it's the **Code** seat misbehaving: there's nothing to re-upload — it boots from the repo itself. Close the session, open a new one, re-attach the repo.

## "A seat is acting weird — confident but wrong, or forgetting the rules"

Don't argue with it — a drifting seat that's told to re-read the rules keeps drifting. The ritual (RULE 17):

1. Say **"journal out."** The seat writes an honest entry, including what it got wrong.
2. Close the session. Open a fresh one. The new seat boots from the repo, reads that entry, picks up clean.

## "New computer / lost phone"

Everything that matters is in the repo — that was the point all along:

1. New device: install the Claude desktop app and sign in; install GitHub Mobile on the new phone and sign in.
2. Attach your office repo in the Code tab. It boots. Re-upload the chat seats' skills (Settings → Skills, from `seats/`).
3. Lost phone specifically: from any browser, sign out of that device in your GitHub and Claude account settings, then carry on. No credential lives on the phone that isn't revocable in two clicks — that's the token model working ([`../tokens/TOKEN-MODEL.md`](../tokens/TOKEN-MODEL.md)).

## "I'm just lost"

Say exactly that — to any seat, in any room. Every seat on this team is briefed as your backup: reassure, explain, redirect with the exact words and the right room. Confusion is a question, not a failure, and nobody here ever makes you feel dumb for asking it.

## When in doubt, the universal move

**Journal out, fresh seat.** It fixes more than it has any right to — because the repo is the memory, and every fresh seat wakes up exactly as informed as your factory's records are honest.
