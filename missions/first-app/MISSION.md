# Mission: first app

**From an idea to a real app in the iPhone and Android stores — one codebase, the same quality gate your website would get, and every store step that needs your hands named before it arrives.**

## The brief

You want an app — something people download, not a website they visit. Maybe you've priced it and every quote was five figures and three months; maybe you were told you'd need one team for iPhone and another for Android. You don't. This mission ships a real app to both stores, built on a discipline you can watch and a bill you can read:

- **One honest screen ships first.** What the app does, the one thing it does well, and a way to reach you — a finished screen that passes the same quality gate the website missions use, measured at real phone sizes. Something you can hold and hand to a friend, not a placeholder.
- **One codebase, both stores.** The default here is **React Native** — you write the app once and it runs on iPhone *and* Android, from a single repo the team creates for you. You can open the files and read what your app is made of. No platform lock-in, no two separate builds to keep in step.
- **When to go native instead — the honest version.** React Native carries the large majority of first apps all the way to both stores. Reach for a native build (Swift for iPhone, Kotlin for Android, two codebases) only when the app leans hard on one platform's deepest features — heavy 3D or AR, frame-perfect games, serious background processing, or tight hardware integration a shared layer can't reach. For a first app that shows information, takes input, and talks to a service, React Native is the right call and the cheaper one. If your idea is in the native camp, a seat will say so plainly before you commit, not after.
- **Then it grows** — screen by screen, on the same discipline that rebuilds established products: a priority behind every addition, the quality gate on every one.

The recurring bill is small and honest: **$20/month for Claude Pro** runs the whole team. The stores add their own one-time and yearly fees, paid to Apple and Google directly — **an Apple Developer Program membership is $99/year, a Google Play Developer account is a one-time $25** — and those are named again, in plain words, at the exact step you pay them. There is no surprise line later.

Shipping one screen first is a feature, not a compromise. It teaches you the entire loop — spec, build, review, merge, build for the store — on something small, and it gives every future screen a working road to travel.

## What the team needs from you

- **The idea for one screen**: what the app does in your own words, the single most important thing a person should be able to do in it, and how someone reaches you (an email or a link to start).
- **Two store accounts, which only you can create** — because they're tied to your legal identity and your payment, and no seat may ever stand in for you there:
  - an **Apple Developer Program** account (your Apple ID, $99/year) for the iPhone store, and
  - a **Google Play Console** account ($25, paid once) for the Android store.
  - The team walks you to each signup, tells you what each screen will ask before it asks, and waits. You click; the seat never does.
- **Your app's signing keys stay yours.** Publishing an app means signing it with a credential that proves it's really from you. That key lives in the store's own vault (Apple's and Google's managed signing, or the build service's secret store) — never in the repo, never pasted in a chat (the same rule as every other secret; see [`tokens/TOKEN-MODEL.md`](../../tokens/TOKEN-MODEL.md)). A seat sets up everything around the key; the key itself is created under your account.
- **Your merge finger.** Every change lands as a PR you review and approve — from your phone works fine. You are the only merge gate (RULE 14).

That's it. No Mac required: the recommended React Native path builds both apps in the cloud, so a Windows or Chromebook owner ships to the iPhone store too. Nothing technical to learn ahead of time — the team teaches as it builds, one PR description at a time.

## How it runs

1. **PR 1 — the workshop, from the team's own hands.** Code creates your **workshop repo** — the second space, where the app itself lives (your office repo stays the team's mind; see FACTORY.md) — and scaffolds the React Native project so it runs on a phone simulator from the first commit. You watch the starter app open on a simulated phone before a single store account exists.
2. **The look — Design starts from an app template.** For anything with a screen, the [design quality gate](../../guides/DESIGN-QUALITY-GATE.md) runs, and it runs at **app screen sizes** — portrait phone (`390×844`, `430×932`), tablet, and the landscape check on any screen that rotates. Design begins from **Claude Design's app templates** rather than a blank canvas — a real mobile starting point (navigation, screens, states) that the gate then holds to the same bar as any page: readable type, finger-sized targets, nothing clipped at the notch.
3. **PR 2 — the one screen.** Cowork specs it from your idea; Code builds it and self-audits against the gate; Design's work is reviewed and audited; the render receipts come back attached to the PR. Yes, even for one screen — *especially* for one screen, because this screen is briefly your entire app. Cowork audits, you merge.
4. **PR 3 — the store builds, and the steps that are yours.** Code produces the signed builds for both stores and prepares each listing (name, description, the screenshots the render step already made). Then come the steps only you can take, each named before it arrives:
   - You **enroll in the Apple Developer Program** ($99/year) and **open your Google Play Console** account ($25 once), under your own identity.
   - You **create or approve the signing credentials** under your account; the seat wires them into the build, never seeing the key itself.
   - You **submit each app for review** — Apple's and Google's reviewers check every new app, and that review takes days, not minutes. A seat prepares the submission; you press submit; the reviewer is a human on their end, not us.
5. **The celebration.** See below. Take it seriously — it's load-bearing.
6. **Then, growth — by the overhaul discipline.** Before screen two, Cowork writes the strategy with its priority list, exactly as [`website-overhaul/`](../website-overhaul/MISSION.md) prescribes for pages, and every new screen traces to a numbered priority. Your one-screen app becomes a real product the same deliberate way established ones get built — one finished screen at a time, with the journal remembering every step.

## Done looks like

- **Your app is live in both stores** — installable on a real iPhone and a real Android phone — verified by you downloading it onto your own phone, and by a seat that reports the build and submission state it observed, never "it should be approved by now" (RULE 1, RULE 3).
- The one screen passes **the design quality gate** at every app screen size, portrait and (where it rotates) landscape, with the render receipts attached to the PR that shipped it.
- The workshop repo exists, you can open its files and read them, and one merged PR = one change you can see in the next build — you've watched it happen.
- No secret value exists anywhere in the repo — the signing key lives in the store's vault or the build service's secret store, and the guardrail checks are green.
- The journal records the whole run, newest first, including the date each store approved you.

## The celebration

The moment your app clears review and installs from the store, download it onto your own phone and send the store link to three people — one who kept asking when you'd build the thing, one who's exactly the person it's for, and one who's just going to be glad for you. Watch them tap **Get** and open the screen you specced. Then read the git history of your workshop repo, short as it is — that's the story of you shipping an app to two stores with your own team. Put both approval dates in the journal. Screen two can wait until tomorrow; tonight, the app has a name, an icon, and a home on your home screen.
