# When you need a hand — the helper path

Sometimes the guides aren't enough. The connection won't come together, a session
keeps failing, and you've got a friend, a colleague, or a support contact who
knows their way around GitHub and is offering to help. Good — let them. There is
a safe shape for that help, it's been proven in the field, and it keeps one thing
absolutely fixed: **your repo stays yours, and you stay the only person who can
merge anything into it.**

## The shape (this is the whole thing)

1. **You add the helper as a collaborator** on your repo, with write access.
   GitHub → your repo → **Settings → Collaborators → Add people**. This is a
   grant *you* make, on *your* screen, and you can revoke it the moment the
   rescue is done (same page, **Remove**).
2. **The helper works from their own computer, signed in as themselves** — a
   local session with their own git login. They never touch your Claude
   connection, your browser, or your passwords. Your account setup stays
   entirely in your hands.
3. **The helper builds the fix on a branch and opens a pull request** onto your
   repo. Branch + PR — exactly the way your own seats deliver work.
4. **You click Merge.** Always you. The helper's write access lets them
   *propose*; it does not let the proposal land without you. Read the PR
   description (it should explain itself in plain words), then merge it — from
   your desktop or your phone.

That's the entire rescue path. It works even when your Claude↔GitHub connection
is completely broken, because the helper's path to your repo doesn't go through
your connection at all.

## What a helper can NEVER do — even a trusted one

- **Never link accounts on your behalf.** Connecting your Claude to your GitHub
  ([`../CONNECT-YOUR-CLAUDE.md`](../CONNECT-YOUR-CLAUDE.md)) happens on *your*
  screens, signed in as *you*. A helper can read the steps to you; the clicks
  are yours. Nobody else should ever be signed in as you, anywhere.
- **Never merge.** Not to save time, not because "it's obviously fine." The
  merge button is the one gate this whole factory turns on, and it never leaves
  your hand — rescue mode included.
- **Never push to `main`.** Everything arrives as a pull request you can read
  first. A helper who asks to push straight to `main` is asking you to give up
  the one protection that matters most; the answer is no.

## How rescue files travel (learned the hard way)

When a helper needs to hand you a script or a file to run, it travels as a
**downloadable file** — or a link you can fetch it from — **never as a big
copy-paste block in chat.** Pasted blocks that contain code-inside-code break
silently when copied: the text truncates at a hidden boundary, the command fails
with a confusing error, and it *looks like you did it wrong* when you didn't.
This exact failure burned a real evening, three pastes in a row, before the same
fix delivered as a file worked on the first try.

Two rules keep it safe and smooth:

- **Files, not pastes.** If it's more than a line or two, it arrives as a file
  you download (or fetch from a link), not text you copy out of a chat window.
- **Run what you actually see.** Downloads sometimes rename files
  (`fix-it.sh` can land as `fixit.sh`). Whoever wrote the instructions should
  tell you to check the downloaded file's real name and use *that* in the
  command — if the instructions don't match what's in your folder, trust your
  folder.

## When to reach for this

Try [`../CONNECT-YOUR-CLAUDE.md`](../CONNECT-YOUR-CLAUDE.md) first — it fixes
the most common problem (the half-connected GitHub App) in about two minutes,
no helper needed. Reach for the helper path when you've done that, started a
fresh session, and things still fail — or when you'd simply rather have a
person alongside for the first climb. There's no shame in it; the path exists
because real people have needed it, used it, and come out the other side with
a working factory and the merge button still firmly theirs.
