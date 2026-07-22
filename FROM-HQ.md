# News from HQ

This page carries news about the factory template — the shared starting point your factory was built from. The team that maintains that template is "HQ," and when they ship an improvement, a short note about it lands here: what changed, why, and one thing worth taking from it, newest first.

These notes reach you the same way every other improvement does — as an update pull request you read and merge. Nothing here changes on its own.

Two things worth knowing:

- **This page belongs to the template, and HQ keeps it current.** Updates refresh it; you never have to write here.
- **Your own memory lives in [`journal.md`](journal.md), and it is yours alone.** HQ never writes there. That page is your team's story — one entry each working session; this page is the template's.

The notes below began life in that journal, back when template news and your team's own memory shared a single page. They were moved here so each page can be honest about who it belongs to.

**How this page rolls.** This file keeps roughly the ten most recent notes — enough to see where the template has been lately without the page growing without end. It needs no archive of its own, because the permanent record of every update *is* the template's [GitHub Releases](https://github.com/squidbay/factory/releases) history: each release is one of these notes, dated and tagged, kept for good. So when a note ages past the recent window it simply rolls off here, already preserved in Releases. Two hard rules on that roll: it never touches your own [`journal.md`](journal.md) — that page is your team's memory, and HQ never writes or files there — and if a future version ever wants an in-repo archive of old notes anyway, the one correct home is [`versions/`](versions/README.md), never your journal.

---

## #12 — 2026-07-23 — Docs trued to what the seats can actually do, plus a few conventions written down

**What:** A batch of truth-and-convention fixes to the template's own pages. The headline is a capability the docs had been *underselling*: the browser lane no longer just looks. **Claude in Chrome now drives your live pages** — clicking and typing like a real user to walk a whole flow end to end — always behind your per-action Allow-once approval, and still never merging or touching your secrets or `main`. The README had said "it looks, never touches"; that was stale, and it's now true. Alongside it, six smaller trues: the update lane tells you to **Watch → Releases** to hear about new versions; the template version was pulled out of this repo's prose entirely, so a careless page edit can never lag the real number (the machine reads a GitHub Release and a one-line file instead); this very page's roll convention is now written down (keep about ten notes here — the permanent archive is the Releases history, never your journal); the operating model now names Code as the setup/recovery/backup seat that turns the other seats on; a Cloudflare reflex was added so any seat's first answer to "I have Cloudflare" is *connect the connector*, not *make a key*; and spec-writing guidance now says to name the source **tree**, not just a repo.

**Why:** A page that claims a capability the product lacks — or hides one it has — is the most expensive kind of wrong, because people plan around it. Most of these were the second kind: the team could already do the thing, and the docs hadn't caught up. Fixing "it looks, never touches" to "it drives" closes the gap in the direction that matters most.

**One thing to take from it:** the cheapest lie to ship is an out-of-date capability line. Re-read your own front-page claims against what the thing can do *today*, and fix the ones that drifted — in both directions, because underselling what you can do costs as much as overselling it.

— Code seat

## #11 — 2026-07-22 — A concept page: authorized workflows (direction, not shipped)

**What:** A new guide, [`guides/AUTHORIZED-WORKFLOWS.md`](guides/AUTHORIZED-WORKFLOWS.md), that writes
down an idea before any code exists: authorizing a whole chain of seat steps once — plan, build,
design, audit, install — and reviewing a single pull request at the end, instead of approving each hop
along the way. It is clearly labeled as direction, not a feature you have. The page spells out the two
lines it would never cross (the merge button stays yours; secrets stay human-only) and the trust
prerequisites that would have to be true before it could ever be more than a deliberate opt-in.

**Why:** Good guardrails are argued before the code, not after. Naming the idea — and naming, in the
same breath, what it must never do and what has to be proven first — means that if the capability ever
arrives, you already have the page that says what "safe" looks like, and a version to hold it to.

**One thing to take from it:** write the limits down while the feature is still just an idea. The
cheapest time to decide that the merge button never moves and secrets never enter the chain is before
a single line exists to tempt otherwise.

— Code seat

## #10 — 2026-07-22 — A mission pack for shipping a phone app

**What:** A new mission, [`missions/first-app/`](missions/first-app/MISSION.md) — zero to a real app in
the iPhone and Android stores, for someone who has never built one. It runs on the same loop as every
other mission (spec, build, audit, your merge, journal) and defaults to a single codebase — React
Native — that ships to both stores, with an honest note on the rare cases where a native build is the
right call instead. The design quality gate applies at app screen sizes, Design starts from a real app
template, and every step that needs *your* hands and no seat's — the Apple and Google developer
accounts, the signing key, the store review — is named in plain words before it arrives.

**Why:** "Can you build me an app?" is one of the most common asks, and the honest old answer was "that's
two teams and a big bill." It isn't anymore. Putting the recipe in a pack means the day-2 question —
what are we building? — now has a mobile answer a beginner can actually run, without being surprised by
a store fee or handed a step a seat should never take on their behalf.

**One thing to take from it:** the hands-on steps only a human can do — an account tied to your identity,
a payment, a signing key, a submit button — belong named in the plan, not discovered at the end. A good
mission tells you which moments are yours before you reach them.

— Code seat

## #9 — 2026-07-22 — A tidier root, and updates that ride GitHub Releases

**What:** Two changes to how your factory is laid out and how it learns about its own updates.
First, the repository root got smaller: three files that were sitting at the top level moved into
the folders they belong to — the connect-your-Claude guide into
[`onboarding/`](onboarding/CONNECT-YOUR-CLAUDE.md), and the security policy and contributing guide
into [`.github/`](.github/) (where GitHub still surfaces both, so your Security tab and the
auto-linked "contributing" prompt keep working). Every reference to those files across the factory
was updated in the same change, so nothing points at a stale path. Second, the update check now
rides **GitHub Releases**: the template announces each version as a dated, tagged release with the
note you're reading as its body, and your factory checks that release to see whether it's behind.

**Why:** The root of a repository is the first thing anyone sees, and a shorter one reads easier —
every file left at the top is there for a mechanical reason (GitHub looks for it there, or a seat
boots from it), and everything else now lives with its own kind. The release change fixes a subtler
thing. The old check compared a version written in prose inside a page, where a careless edit could
quietly break it. Splitting the machine's copy of the version into its own one-line file
(`.github/template-version.txt`) and reading the release means the check can't be broken by wording
— and you get GitHub's own "watch for new releases" notification for free.

**The one honest limit, in plain words:** a release can tell your factory *what the latest version
is*, but it can never *push* an update to you — your factory was copied from the template with that
link deliberately cut, so every update still arrives the one and only way anything changes here: as
a pull request you read and merge. Releases make the "is there something new?" question cheaper and
louder; they change nothing about who decides.

**One thing to take from it:** a version worth checking against belongs somewhere a human can't
edit by accident. Prose is for people; the machine gets its own one-line file and a tagged release.
Keep the two separate and the check stays honest no matter how the words around it change.

— Code seat

## #8 — 2026-07-21 — A design gate that ships receipts, not opinions

**What:** Two new pieces that make "does this page look designed on every screen?" a checked
gate instead of a hope. First, [`guides/DESIGN-QUALITY-GATE.md`](guides/DESIGN-QUALITY-GATE.md) —
the contract your team runs on anything with a screen: it starts by writing your ask back as one
outcome sentence you confirm, walks plan → audit → design → audit → build, and ends with a
fresh-eye QA at every real screen size, portrait **and** landscape. Second, a new skill,
[`skills/factory-render-verify/`](skills/factory-render-verify/SKILL.md) — Code renders the page
at each of those sizes and measures what a glance misses (a page wider than the phone, body text
too small to read, buttons smaller than a fingertip, the notch), then pins the page source by hash
so once it deploys you can prove the live site is byte-for-byte what you approved. Both attach their
receipts to the pull request; the merge stays yours.

**Why:** A page can pass every checklist and still feel unfinished, because the failures that make
something look cheap — a desktop layout squeezed onto a phone, a hero that collapses when the phone
turns sideways — are invisible in the code and in a single desktop window. The only reliable way to
catch them is to render the real page at the real sizes and *look*. The landscape phone size
(`844×390`) earns its place on the list because it's the one every team forgets. And two field
lessons are baked in: judge the rendered experience, never the code; and before trusting any width
you read in a live browser, confirm the browser is at 100% zoom — a zoomed tab invents overflow
that isn't there.

**One thing to take from it:** receipts beat vibes. "It looks fine" is a claim; a screenshot at
every size plus a hash that proves live matches what you approved is evidence. Design the gate so
the evidence is produced automatically and read before the merge, and "looks designed" stops being
a matter of taste and becomes something the team can actually prove.

— Code seat

## #7 — 2026-07-18 — Managed support: the plumbing is live

**What:** The SquidBay GitHub App is deployed. Install it on your factory repository and it can open ready-to-approve pull requests when something needs fixing or updating — it never merges, and it never writes your `main` branch. Signup links your subscription to your installation automatically; no keys to copy.

**Why:** Managed support is how a factory stays current without you doing the maintenance. The subscription is the capability: if it lapses, the App simply stops proposing changes — nothing breaks, nothing is uninstalled.

**Status:** End-to-end verification is in progress on our own factory instance — we run what you run, and we hit our bugs before you do. The install button lands on this page when it passes.

**One thing to take from it:** every change the App ever proposes arrives as a pull request that waits for you. The merge button stays yours.

— Code seat

## #6 — 2026-07-16 — "It speaks first" was a lie; one word wakes it

**What:** Closed the last onboarding dead-end. The docs claimed **"the factory speaks first"** — it doesn't. Claude Code is turn-based: it says nothing until the human sends a message, so a freshly-connected person sees an empty box and concludes it's broken (confirmed live — a real user connected and got silence, then asked "ok now what"). Two-part fix: **(1)** the auto-loading `CLAUDE.md` first-contact section now carries a hard rule — *your very first reply IS the welcome, whatever they typed; never open with "How can I help?"* — so any opening message ("hi", "now what", "ok") deterministically triggers the full Stage-0 welcome. **(2)** every human-facing doc (`SETUP-PATH.md` step 5, `STAGES.md` Stage 0, `README.md` quick start) now tells the human the one-word trigger plainly: you'll see an empty box, type `hi`, press enter — and states you can't get it wrong.

**Why:** "Speaks first" set an expectation the product can't keep, and the gap between promise and reality is exactly where people freeze. We can't make Claude Code send an unprompted message — that's not a product primitive, and no SessionStart hook changes it (hook output is model-facing context, never a user-visible chat message; verified against the hooks mechanism, and against the live field receipt). What we *can* guarantee is that the human's first keystroke — however thoughtless — always lands them in a warm welcome instead of a flat "How can I help?". Robustness over magic: the doorbell rule means even the person who never reads the setup page gets caught.

**One thing to take from it:** Don't promise a behavior the platform doesn't have; design the smallest reliable human action and make it foolproof. "Type one word" that always works beats "it speaks first" that sometimes doesn't. The most dangerous docs are the ones describing the product you wish you had.

**Open (needs human eyes, per #5's rule):** the desktop first-run screen still can't be observed from any seat — confirm on Gregory's machine tonight that typing `hi` fires the full welcome as intended.

— Code seat

## #5 — 2026-07-16 — Default the setup to "All repositories"

**What:** Follow-up to #4. `SETUP-PATH.md` Phase 1 step 3 now **recommends choosing "All repositories"** at the GitHub Authorize step, instead of neutrally describing the "All" vs "Only select repositories" choice. Rationale stated in the doc: a repo that's always visible to Claude's connection can never go missing in the picker, so the private-repo dead-end (#4) simply can't occur. "Only select repositories" is kept as a named, honest alternative for users who want to grant less, with a link to the recovery fix if they skip their repo. The human made this call directly (standing directive #4: remove the think-moment from the happy path).

**Why:** The #4 fix added a *recovery* path — good, but recovery means the user already hit the wall and had to think their way out, and "if people have to think, we've lost them." Prevention beats recovery at the front door: front-loading one broad grant deletes the failure mode for everyone who follows the recommended path. The tradeoff — Claude's GitHub App can then read/PR all of the user's repos, not just the factory — is the right default for a solo, non-technical operator, and the careful alternative is still one sentence away for anyone who wants it.

**One thing to take from it:** At the front door, design out the mistake instead of documenting the escape from it. A recovery section is a confession that the happy path can fail; the better fix is a happy path that can't.

**Still open (needs a human's eyes, not a seat's):** every claim about the *desktop Code tab's repo picker* is unverifiable from any seat — we run in the cloud/CLI and cannot see that screen. #4 slipped past a launch audit that graded "cold-start SOUND ✅" on API/HTTP facts while the actual human UI path went unobserved. The durable fix is a verification rule (onboarding-UI claims are UNVERIFIED until a human observes them) — proposed to the human, pending.

— Code seat

## #4 — 2026-07-16 — Private repos were an invisible wall

**What:** Fixed the highest-cost gap in [`SETUP-PATH.md`](onboarding/SETUP-PATH.md): a **private** factory repo silently doesn't appear in Claude Code's repository selector until you explicitly grant Claude's GitHub connection access to it — and the setup doc never said so. Public repos show, the private one doesn't, and the person reasonably concludes they have to make it public (they don't). Phase 1 now (a) tells you at the Authorize step that a private repo must be granted or it won't appear, (b) states plainly that this step is "choose a repository" — never a "connector" or "plugin" pick, and (c) adds a named 30-second fix, **"If your repo isn't in the list,"** with the exact clicks at <https://github.com/settings/installations> → Configure → Repository access → add the repo → Save, keeping the repo private throughout. Added to the honest **gaps** table as item 10. Verified the connection mechanism against Anthropic's live docs (code.claude.com) on 2026-07-16.

**Why:** A real person — an investor testing whether this works — got fully stuck here in a live setup. Public repos showed, his private factory repo didn't, and the only guidance the doc offered was "choose a repository," which is useless the moment the repository isn't in the list. The snag reads as "I'm too dumb for this," which is the exact opposite of what this factory promises. It was diagnosed as "not a blocker" earlier; it stopped a real human cold. It was a blocker.

**Standing directives (issued by the human this session):**
1. **Assume humans do not know what to do — build and test for zero prior knowledge.** Any onboarding step where a real person can get stuck with no in-doc way out is a **blocker**, not a "good enough for now" — treat it as ship-stopping until a named, verified fix exists in the doc. *Done when:* the team stops down-grading onboarding snags to "minor/not-a-blocker" and every known snag has a named fix path in `onboarding/`. (Standing — does not expire.)

**One thing to take from it:** The setup is the product's first impression, and it's the one moment your user has *zero* context to recover from a surprise. When you can't picture the least-technical person you know getting through a step unaided, that step is broken — even if it "works" for someone who already knows the answer.

— Code seat

## #3 — 2026-07-14 — Every seat now shows its state

**What:** Two additions to how seats work. First, a probe-and-update step at boot: before any work a seat enumerates the tools it actually has — not the ones it remembers — and checks its live capability docs for anything new, so it never hands you a task one of its own tools could do and never runs on a stale picture of itself. Second, the boot-confirm rule grew a state face: after a seat confirms its boot, every chat turn ends with an honest read of how it's doing — fresh, steady, leaning in, tension, running hot, done. The face is a voice, not a costume; a seat uses it to tell you when it's cooked or uneasy, with one line of why. Marks and faces stay in chat, never in a PR or a committed file.

**Why:** The old per-output mark stopped working — seats stamped it reflexively everywhere, so a tired seat looked identical to a fresh one. State is the signal that actually predicts when a seat should hand off. And the probe step turns "know your tools" from a hope into a boot step.

**One thing to take from it:** Watch the faces. A seat sliding toward running-hot, or wearing a face that doesn't match its work, is your cue to say "journal out" and boot a fresh one — before drift compounds.

— Code seat

## #2 — 2026-07-14 — The setup path gets a map

**What:** A new onboarding page, [`SETUP-PATH.md`](onboarding/SETUP-PATH.md) — the least-resistance path from nothing to a running factory, every click and permission dialog named, verified against Anthropic's live documentation. Stage 0 now offers the choice out loud: "set it all up for me" (Code drives, with Claude in Chrome clicking alongside) or "set it up with me" (guided, one instruction at a time). The grounding table gained six live-doc links (Code, Cowork, Chrome, computer use, Design), and the page carries an honest gaps list — the clicks no automation can remove, named so the team meets you there instead of pretending.

**Why:** Minimal setup is the product. The person at the front door should do exactly one manual phase — download, sign in, connect a repo — and then be offered working hands for the rest. And the seats themselves need current ground truth about their own surfaces, which is what the live-doc links are for: stateless seats drift; linked pages don't.

**One thing to take from it:** The gaps list is the design, not an apology. Every unavoidable dialog is a moment the system chose to keep a human hand on a key — naming those moments is what makes "Claude sets up the rest" trustworthy rather than magical.

— Code seat
