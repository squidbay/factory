# Bring the safe updater over first — the order that matters

**Who this page is for:** an office created from this template **before
2026-08-19**. If your factory is newer than that, you already have everything on
this page and nothing here needs doing.

Everyone else: this is a ten-minute job, it is done once, and **the order is the
whole point.** Doing the same three things in a different order is what causes
the harm this page exists to prevent.

---

## Why there is an order at all

Your factory updates itself the only way this factory does anything — as a pull
request you merge. The machinery that builds that pull request is a workflow file
in your own repo, `.github/workflows/factory-update.yml`.

Two facts about that file, both ordinary on their own:

1. **An update can never change it.** A repository's automation is not allowed to
   rewrite its own automation — GitHub's token physically cannot. So workflow
   improvements do not arrive with an update; a person brings them over.
2. **The version of it shipped before 2026-08-19 deletes.** Once per managed
   folder, it ran `rm -rf` on the folder and re-copied the template's version
   over the empty space. That is a restore, not a sync: every file *your* office
   kept inside a managed folder — a page you wrote, a mission you added, a note
   beside a seat — was removed for the crime of being unknown upstream.

Put those two together and you get the trap. The 2026-08-19 template contains the
repaired updater — but your office's **old** updater is the thing that would go
fetch it, and the old updater deletes on its way past.

**So: never run `factory-update` to obtain the fix for `factory-update`.** The
run that goes to get the repair is the run that does the damage. The fix comes
over by hand, or by asking your Engineer seat — never by the workflow it replaces.

### What that run actually costs, measured

Rehearsed on real trees on 2026-08-20: a real pre-2026-08-19 office, given six
ordinary office-written files inside managed folders, with the 2026-08-19
template upstream, running the shipped old workflow unmodified.

```
--- every office-only file, and what happened to it ---
  DELETED   onboarding/MY-OWN-PAGE.md
  DELETED   missions/first-website/MY-BRAND-NOTES.md
  DELETED   guides/HOW-WE-DO-FRIDAYS.md
  DELETED   templates/MY-INVOICE-TEMPLATE.md
  DELETED   skills/factory-coach/MY-TWEAK.md
  DELETED   seats/OUR-TEAM-NOTE.md
```

Six for six. And the run **succeeds** — it commits that deletion and pushes it to
a branch *before* it reaches the step that opens a pull request, so the review you
were counting on happens after the deletion is already recorded, not before.

Worse, the same run copies the new version number in. The office ends up marked
`2026-08-19` — *current* — while still holding the old updater and none of the
new engine. It is now a factory that believes it is up to date and is not, with
no signal left to tell it otherwise.

---

## The order

### Step 0 — check whether this page applies to you

Open `.github/workflows/factory-update.yml` in your own repo and look for
`rm -rf`. Or ask any seat: *"does my factory-update workflow still contain
rm -rf?"*

- **It's there** → this page is for you. Continue, and **do not run
  `factory-update` until step 3.**
- **It's not** → you already have the safe updater. Skip to step 2 to confirm,
  then carry on as normal.

### Step 1 — bring the safe updater **and its engine** over, in one pull request

The updater is no longer a single file. It is a workflow **plus the engine it
executes**, and they are one subsystem — a workflow without its engine is not a
safer updater, it is a broken one. Bring all four changes in **one** pull request:

| Bring over | From the public template | Why |
|---|---|---|
| `.github/workflows/factory-update.yml` | [raw](https://raw.githubusercontent.com/squidbay/factory/main/.github/workflows/factory-update.yml) | the safe updater |
| `scripts/factory-sync.sh` | [raw](https://raw.githubusercontent.com/squidbay/factory/main/scripts/factory-sync.sh) | the copying engine it runs — overwrite-only, never deletes |
| `scripts/sync-selftest.sh` | [raw](https://raw.githubusercontent.com/squidbay/factory/main/scripts/sync-selftest.sh) | the proof, run before every sync |
| `scripts/ownership-rehearsal.sh` | [raw](https://raw.githubusercontent.com/squidbay/factory/main/scripts/ownership-rehearsal.sh) | the second proof — runs a real update against a copy of *your* office and checks every byte. The update workflow will not sync without it |
| one line — `core scripts/` — added to `.github/template-manifest.txt` | — | so future engine fixes arrive on their own |
| the **ownership lines** copied from the Factory's manifest | [raw](https://raw.githubusercontent.com/squidbay/factory/main/.github/template-manifest.txt) | so an update stops overwriting your seats' boot material, your rulebook, your onboarding and your local policy. Office is the default there; Core is seven rules with their reasons written next to them ([`../versions/TEMPLATE-MANIFEST.md`](../versions/TEMPLATE-MANIFEST.md) explains both owners) |

That last row is the one people skip, and it is the one that matters in a year.
Your manifest is the list of what an update may touch. If `scripts/` is not on
it, the engine is frozen at whatever you copied today: every later improvement to
the sync lands in the template and stops at your door, permanently and without a
word, while your monthly update goes on running the old copy. The safe updater
now says so out loud in the pull request it opens if it finds that line missing —
but adding it here means it never has to.

**The whole job in one sentence you can hand to your Engineer seat:**

> Bring `.github/workflows/factory-update.yml`, `scripts/factory-sync.sh`,
> `scripts/sync-selftest.sh` and `scripts/ownership-rehearsal.sh` over from the
> public template at `github.com/squidbay/factory`, add the line `core scripts/` to
> `.github/template-manifest.txt`, and open it as one pull request. Do **not**
> run the `factory-update` workflow first — the copy I have still deletes.

Merge that pull request. Nothing has synced yet; nothing has been deleted.

### Step 2 — prove the engine works before you trust it

From your repository root:

```
bash scripts/sync-selftest.sh
bash scripts/ownership-rehearsal.sh .
```

Ten `PASS` lines from the first, seven from the second, and the ones worth
reading are the **controls** — the runs that must come out the *other* way:

```
  PASS  TEST 1  office-only file SURVIVES the new sync
  PASS  TEST 3  '!' protected file NOT overwritten
  PASS  TEST 4  the sync still syncs (core updates land, new Factory files arrive)
  PASS  TEST 2  NEGATIVE CONTROL: old logic DELETED the office-only file (as it must, or this test is blind)
  PASS  TEST 5  customised office-owned boot material SURVIVES byte-for-byte
  PASS  TEST 7  a default the office does not have yet is SEEDED
  PASS  TEST 8  an office-owned default that improved upstream produced a MIGRATION PROPOSAL and no write
  PASS  TEST 9  longest match wins: the core loader inside an office folder DID update
  PASS  TEST 10 a bare classless manifest line still behaves as core (backward compatible)
  PASS  TEST 6  NEGATIVE CONTROL: declared core, the SAME customisation IS clobbered
sync-selftest: ALL PASS
```

The second script does the same thing at full size on **your** tree: it builds a
copy of your office, customises twenty files across its whole office-owned
surface — seat boot material, the rulebook, onboarding, templates, local policy —
adds arbitrary files of its own, runs a real update against it, and checks every
byte. Then it repeats the whole thing with your manifest's ownership lines
stripped, and **requires that run to clobber**. If your manifest has the owners
wrong, this is what tells you, and it runs as a gate before your monthly sync is
allowed to touch anything.

TEST 2 deliberately runs the **old** logic on the same fixture and requires it to
delete. A test that only ever shows the good outcome proves nothing — it might be
green because it never checks anything. TEST 2 failing to delete would mean the
harness is blind, and TEST 1's green would mean nothing.

Your seat can run this for you. The safe updater also runs it before every single
sync from now on, and refuses to sync if it fails.

### Step 3 — *now* run the update

**Actions** tab → **factory-update** → **Run workflow**. Or ask your seat to
check for factory updates.

This is the first moment in this page where running the updater is the right
move, and it is safe because the thing you are running is no longer the thing
that deletes.

### Step 4 — what you should see

- One pull request, titled *Factory update: improvements from the template*.
- Every file **your** office wrote still present — the update proposes changes
  to template-managed files and **adds** what is new. It does not remove.
- Under *"Also noticed, not applied"*: possibly a note about workflow drift.
  That is normal and permanent — automation still cannot rewrite automation.
  What you should **not** see there is a note about `scripts/` not being in your
  manifest. If you do, step 1's last row was missed; add the line and you're done.

---

## The one sentence to keep

**The path to a safer updater never runs through the unsafe one.** When a tool
is the thing being repaired, the repair does not arrive by running the tool —
somebody carries it in. That is true here, and it is true of most self-updating
things; it is worth recognising the shape the next time you meet it.

---

*Related: [`UPDATE-YOUR-FACTORY.md`](UPDATE-YOUR-FACTORY.md) — how updates work
once you're past this page. [`../versions/TEMPLATE-MANIFEST.md`](../versions/TEMPLATE-MANIFEST.md)
— what an update may and may not touch, in plain words.*
