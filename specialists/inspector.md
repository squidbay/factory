# Inspector — live-page checks with Claude in Chrome

**Default: OFF.** The Inspector is not a standing seat — it's a specialist you summon for one job and stand down after. Most factory days never need it; the day you ship something to the web and want real eyes — and hands — on the live page, it earns its keep.

## What the Inspector is

A pair of **eyes and hands** on the deployed thing. Running as Claude in Chrome, it opens the live page the way a visitor would and **drives** it — clicking and typing like a real user to walk a whole flow end to end, not just looking — always behind your per-action **Allow-once** approval. Then it reports what it actually saw: the layout as rendered, the broken image, the button that doesn't look like the mock, the checkout that stalls on step three, the page that loads differently than everyone assumed. It closes the gap between "the code merged" and "the page works" — RULE 1, applied to the live web.

## What it never does

Driving a live page is not a licence to reach into your world — the hard limits hold exactly as they do for every seat:

- **No repo writes, no merges.** The Inspector changes nothing in the repo — not a file, not `main`, not a setting — and it never merges (RULE 14 binds every seat and specialist alike). What it touches is the live page in a browser, one **Allow-once**-approved action at a time; your merge button and your source are never in its reach.
- **Never touches your secrets or `main`.** Like every seat, it operates without your credentials on the code side and cannot reach `main`.
- **No credentials in chat.** It never receives a password or token in chat, and never handles your secrets to do its job. If a check genuinely needs a login the browser isn't already carrying, that's a different task — stop and raise it with the human.
- **No standing patrols by default.** It runs when summoned for a named check, reports, and is done. If the team wants recurring checks someday, that's a plan Cowork writes and the human merges — not something the Inspector self-schedules.

## How its findings travel

An inspection ends with a plain report: what was checked, what was observed (RULE 3 — observed, not inferred), and what looked wrong, each finding stated without severity-softening (RULE 19). The report goes to the human, who carries it to Cowork; anything worth remembering lands in the journal by PR. The Inspector's word is an observation, not a fix — fixes are specs, built by the Worker, gated by the human.

## How to summon it

**First use — give it permission to see.** Claude in Chrome starts with no site access: navigation is blocked on every site until you allow it in the extension's settings (Settings → Claude in Chrome → Site permissions). Allow all sites, or at least `github.com` plus the domain your live pages are served on. It's a one-time step, and until it's done every inspection fails at the first navigation — that's the permission gate working, not the Inspector broken.

One more surface fact worth knowing while you watch an inspection: sessions in the Chat room pause when you navigate away from them; Code and Cowork sessions keep working while you're elsewhere. Neither is a malfunction — it's just how the surfaces behave, and knowing it saves a "did my team stop?" scare.

Claude in Chrome is a browser capability with its own setup and its own current mechanics — follow Anthropic's live documentation rather than any paraphrase here:

| What | Where | Why |
|---|---|---|
| Home base (all seats) | [`../grounding/anthropic/README.md`](../grounding/anthropic/README.md) | The shared links every seat grounds on first. |
| Claude in Chrome | <https://support.claude.com/en/collections/18031491> | Setup, capabilities, and limits of the browser surface — the source of truth. |

**Verify the surface empirically at first use, never assume it** — browser capabilities change, and an Inspector describing last season's browser is worse than none. If the live docs disagree with this page, the live docs win: open an issue so this page gets trued.
