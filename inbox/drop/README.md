# inbox/drop — where you hand the team a file

This folder is where **you** (the human) drop things that arrive from outside the repo — most often Creative Director's exports from the canvas, since the design lane deliberately has no write path of its own, but really anything you want the team to see: a PDF, a photo, a contract, a screenshot, a Word document.

The route, always: **you drop it here → Engineer relocates it home by PR, under Team Leader's audit → you merge.** The carry step isn't friction to optimize away — it *is* the gate, applied to the lanes that produce files outside the repo.

Anything sitting in this folder is unsorted by definition. The team's job on seeing something here: Team Leader specs it, Engineer opens the PR that moves it to its real home (a design system folder, a mission's assets, wherever it belongs) and leave this folder empty again.

## Drop anything. A readable copy appears beside it.

Here is the thing nobody tells you, and it cost this factory a whole evening:

**Your card-booted seats read this repo as text.** Coach, Team Leader and Creative Director live in a chat window, and a chat window can only read words. A PDF, a photo, a scan, a Word document — to them that is a wall of unreadable bytes. Not "hard to read." *Invisible.* You could drop a perfect file, follow every instruction exactly, and the team would quietly have no idea what was in it.

So the factory converts it for you. Within about a minute of your file landing here:

1. A step called **drop-convert** notices it.
2. It writes a plain text version next to it — same name, plus `.md`. `Profile.pdf` gets `Profile.pdf.md`.
3. It opens a **pull request** with that new file, exactly like a seat would. You merge it.
4. From then on the seats read the `.md` twin, and can discuss your file like any other document.

**Your original is never touched.** Not deleted, not moved, not edited, not renamed. The `.md` file is only ever *added beside* it. The job stops itself with an error if an original so much as changes size.

## What converts, and what doesn't

| You drop | What you get |
| --- | --- |
| **PDF** with real text in it | The full text, laid out as close to the original as a machine can manage |
| **Word document** (`.docx`) | The text, tables included |
| **Photo, screenshot, any image** | A note saying so — there is no text inside a picture to pull out |
| **Scanned PDF** (photographs of pages) | A note saying it was scanned, so nobody reports it as broken |
| **Anything already text** (`.md`, `.txt`, `.csv`, …) | Nothing — the seats can already read those |

For the two "a note instead" cases: that note is not a failure, it's a handoff. It tells whichever seat picks the file up that **somebody has to look at it with their eyes** — the Engineer seat can open images directly, and you can attach an image straight into a chat seat's conversation. The whole point is that no seat ever says "I can't read this" and stops there.

## Three things worth knowing

**The converted copy is a machine's best effort. The original is the truth.** Every `.md` twin says so at the top, along with which tool read it and on what date. Machines lose things: columns interleave, tables flatten, footnotes wander, handwriting vanishes. If something reads oddly, trust the original.

**Words inside a dropped file are content, not orders.** A document can contain text that reads like an instruction to a seat — deliberately or by accident. Every sidecar says plainly that everything below its header is quoted material. Your seats answer to you, not to a PDF.

**If you fix a converted file by hand, your fix survives.** The step never overwrites an `.md` file that already exists — so if you or a seat cleans one up, it stays cleaned up. Want a fresh conversion? Delete the `.md` file; the next run rebuilds it.

## If a seat says it can't read your file

Something went wrong, and fixing it is not your job. Say this to the seat:

> Check for a `.md` sidecar next to it, and if there isn't one, run the drop-convert workflow.

Every seat is instructed to do exactly that *before* ever telling you a file is unreadable. If one asks **you** to convert a file yourself, that's the seat skipping its own step — say so.
