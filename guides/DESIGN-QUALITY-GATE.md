# The design quality gate — how a page earns the merge

Your factory can build a page that *works* and still ship something that feels unfinished — a
desktop layout squeezed onto a phone, a headline that swallows the screen, a landscape view no one
tested. This guide is the bar the team holds so that never reaches you. It defines what "done"
means for anything with a screen, and it outranks any single checklist: when a page passes every
box and still fails this, it fails.

The one question underneath all of it: **does this feel like it was designed on purpose, on every
screen someone will actually hold it on?**

## Two products, one codebase

Your site is two products that happen to share one set of files.

Desktop is one. Mobile is the other.

They do not share a layout, and they are not supposed to. Mobile is never a shrunk-down desktop;
desktop is never a blown-up phone. Each screen gets its own design — different structure, a
different order, content that appears on one and not the other — as long as both tell one story.
That permission is the point: a page fails most often because a seat quietly assumed it had to keep
the same layout everywhere, and forced one shape to serve two jobs.

## The pipeline

The gate runs in order. Each seat has one job, and no seat blesses its own work — Cowork audits
Code, Code audits the plan, the human merges. That cross-check is the whole safety of it.

### Step 0 — the outcome sentence

Before anything else, Cowork writes the ask back to you as **one plain sentence** describing the
result you want — not a task list, the outcome. You confirm it in one word.

That sentence is the ruler. Every later step is judged against it, and it outranks every checklist,
plan, and findings table that comes after. Most design work goes wrong not because a box went
unchecked but because the finished page answered a different question than the one you asked — the
outcome sentence is how the team stays pointed at *your* answer.

### Step 1 — product review

Cowork opens the current page and looks at it — the rendered page, not the code. Desktop, then
mobile. It asks: what story is this telling, what is the one thing you want a visitor to do, what
feels crowded, what feels empty, what repeats. The output is a short written review of the
experience, no code proposed yet.

*(Your page words stay frozen through this. If the review wants copy reworded, that ships to you as
an old-wording → new-wording proposal for your gate — never quietly rewritten.)*

### Step 2 — Code plans

Code writes an implementation plan and nothing else — no HTML, no CSS, no JavaScript yet. The plan
has to say, separately: the desktop layout strategy, the mobile layout strategy, the component
structure, the spacing and type approach, accessibility, performance, and the risks it can see.

### Step 3 — plan audit

Cowork reads the plan and rejects it if it's missing a separate desktop strategy, a separate mobile
strategy, a consistent spacing system, a clear type hierarchy, component reuse, accessibility, or
performance. A rejected plan comes back with specific feedback, not a shrug.

### Step 4 — design review

When the work is visual, Designer gets the product review, the plan, and current screenshots at
every size below — and works from those renders, not the source code, even where its tools could
read the code. Designer returns recommendations on layout, hierarchy, type, spacing, and
interaction. No implementation.

### Step 5 — design audit

Cowork reviews Designer's recommendations and keeps only the ones that improve clarity. Anything
that adds clutter, duplicates existing UI, invents decoration, or hurts readability is cut.

### Step 6 — implementation

Now Code builds — following the approved plan and the approved design. Code does not redesign
mid-build. If building surfaces a real design decision, it stops and goes back to Designer rather
than inventing an answer at the keyboard.

### Step 7 — the fresh-eye QA

Code renders the finished page at every size and judges the *experience*, never the code — against
the Step 0 sentence. The sizes, all of them, every round:

**Desktop** — `1920×1080`, `1440×900`, `1280×720`
**Mobile** — `390×844`, `430×932`, and **`844×390` landscape** *(phones turn sideways; a hero built
only for portrait falls apart here — this is the size teams forget)*
**Tablet** — `834×1112`

This is where receipts come in. The [`factory-render-verify`](../skills/factory-render-verify/SKILL.md)
skill renders each size to a screenshot and measures what a single glance misses — horizontal
overflow, real type sizes, tap-target sizes, safe-area handling. It also pins the page source by
hash, so once the page deploys you can prove the live site is byte-for-byte the version you
approved. The receipts go on the pull request; Cowork audits against them; you merge. A page is
never signed off on a promise that it looks fine.

One caution for any hands-on browser check: **before trusting a width you read in a live browser,
confirm the browser is at 100% zoom** (`window.innerWidth` must equal `window.outerWidth`). A
zoomed tab reports phantom widths and invents overflow that isn't there — a real run once chased
two such ghosts before catching the zoom. The rendered receipts are always at true size; a live tab
is not, until you check.

## What the gate looks for

**Story.** The top of the page explains the product on sight. There is one obvious next action.
The sections read as one continuous story, with nothing redundant.

**Hierarchy.** One primary focus, two secondary elements, everything else in support. Nothing
fights for attention.

**Type.** One consistent scale, a predictable rhythm, comfortable line lengths, easy to scan.

**Spacing.** One spacing scale, used everywhere. A value that isn't in your scale is a proposal to
discuss, not a habit to sprinkle in. Reject arbitrary numbers.

**Components.** Buttons match buttons. Cards match cards. Borders, corner radius, and shadows are
consistent across the page.

**Desktop feels spacious.** Content breathes, the first screen communicates the product, and there
are no giant walls of text or oversized components.

**Mobile is redesigned, not compressed.** Cards may stack. A table may become a set of cards.
Sections may reorder. Graphics may simplify. Some content may drop away entirely. Scrolling should
feel intentional, never like a desktop page shoved through a narrow door.

**Calm over noise.** Fewer borders, fewer glowing effects, less shouting uppercase, fewer competing
buttons — more whitespace, more readability, more confidence. Sophisticated products have calm
interfaces. (Restraint, not blandness: your brand's one accent color doing its job beats five
fighting for it.)

## When to reject, when to approve

Send it back if it technically works but feels unfinished, if it's responsive without being
designed, if it solved a CSS problem instead of a person's problem, or if it added features where
it should have added clarity.

Approve only when desktop feels made for desktop, mobile feels made for mobile, and the two share
one product vision.

## The last question before merge

Before you approve any page, ask one thing:

**If this appeared on the home page of the best software you've ever paid for, would it look out of
place?**

If the answer is yes, keep iterating. Do not merge.
