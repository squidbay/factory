# Domains and DNS — putting your name on the door

This guide isn't meant to be read cold. When it's time to connect a domain, a seat will coach you through it in the chat, click by click, with this page as the map. DNS has a reputation for being scary; it isn't — it's two simple jobs and one good habit.

## Registrar and DNS host — two different jobs

When you "get a domain," two separate things are happening, and knowing the difference dissolves most of the confusion in advance:

- **The registrar** is where you *rent the name*. You pay them yearly, and they hold your claim to `yourbusiness.com`. That's the whole job: ownership and the bill.
- **The DNS host** is who *answers the phone* for that name. When someone types your domain into a browser, the DNS host is what replies "that lives over here" and points them to your actual site.

One company often does both — which is exactly why people get confused when the jobs need to be separated. They can be: you can rent the name at one company and have a different company answer for it. You do that by changing the **nameservers** at the registrar — a setting that says "for all questions about this domain, ask *them* instead." Renting the name and answering for the name are different jobs even when one storefront sells both.

## Cloudflare DNS — the natural home

This factory recommends Cloudflare as your DNS host, wherever you happened to rent the name:

- **It's free.** Cloudflare's DNS costs nothing, on any plan.
- **It handles the awkward case.** The bare domain (`yourbusiness.com`, no `www` — the "apex") technically isn't allowed to use the most convenient kind of pointer record. Cloudflare quietly fixes this with something called **CNAME flattening** — you point the apex wherever you want and it just works. Other DNS hosts often make this your problem.
- **It sits next to your workshop.** Your site already runs on Cloudflare (see `hosting/cloudflare/README.md`), so the name and the thing it points to live under one roof — fewer moving parts, one dashboard.

Moving DNS to Cloudflare, in outline (a seat will coach the real thing): add your domain in the Cloudflare dashboard → Cloudflare shows you two nameserver names → at your *registrar*, replace the existing nameservers with those two → wait for Cloudflare to confirm. Your site doesn't blink during this; Cloudflare imports your existing records first.

## Pointing your domain at the workshop

Once Cloudflare answers for your name, connecting it to your deployed site is the easy part — your Worker lives on the same platform. In the dashboard: open the Worker → **Settings** → **Domains & Routes** → add your domain. Cloudflare creates the right records itself.

One honest note on who does the clicking: the Cloudflare connection your seats use **deliberately cannot touch DNS** — it's one of the two operations held beyond the connector's reach (see `hosting/cloudflare/README.md`). So DNS changes are made by *you*, in your dashboard, with a seat coaching each click in the chat. For the thing that decides where your name points, a human hand on the switch is a feature. In a rare case a seat may propose the one-time-token route instead (`tokens/TOKEN-MODEL.md` describes it) — but the coached-clicks path is the normal one.

## Lower the TTL before a cutover

Every DNS record carries a **TTL** — "time to live" — which tells the internet how long to remember an answer before asking again. If your record says "remember this for a day," then a change you make can take up to a day to reach everyone. That's fine on a quiet Tuesday; it's terrible in the middle of a move.

So the pros' habit, now yours: **the day before any planned cutover, lower the TTL** on the records you'll be changing — to 5 minutes (300 seconds). Nothing about your site changes; you're just telling the internet "check back often for a while." Then, when you make the real change the next day, the world picks it up in minutes — and if anything looks wrong, **switching back is also minutes**. A low TTL turns a scary one-way door into a door you can walk back through. Once the dust settles, put the TTL back up. (One Cloudflare wrinkle: records with the orange cloud "proxied" toggle on show TTL as **Auto** and are already fast to change — the habit matters most for grey-cloud, unproxied records.)

## Verify after every change — RULE 1, applied to DNS

Your factory's first mechanical rule is *verify your own work; never claim untested things work* — and DNS is where humans need it as much as seats do, because DNS changes are invisible until you look. So after every change, look:

1. **Visit the site yourself**, in your browser — ideally on your phone with wi-fi off, so you're checking the wider internet rather than your own machine's memory.
2. **Ask a seat to check from where it sits** — a seat that can fetch the URL will tell you exactly what it observes, which is a second vantage point for free.
3. **For a bigger move**, a checker like whatsmydns.net shows you your domain's answer from dozens of places around the world at once — you can literally watch the change propagate.

"I clicked save" is not the same fact as "the internet now points at the new place." The habit is to confirm the second one, every time, before telling anyone — including yourself — that the move is done.

## One thing to learn

TTL-lowering is a small trick, but the idea inside it is one of the most useful in all of operations: **before you make a risky change, first make the change reversible — then it isn't risky anymore.** Lowering a TTL doesn't change anything about your site; it just shortens the road back, and that's what turns a nervous cutover into a calm one. The same move works everywhere in your project: keep the old page up until the new one is verified, keep last month's price list when you publish this month's, keep the previous logo files when the rebrand ships. The question that unlocks it is always the same, asked *before* you act: "if this goes wrong, how fast can I get back?" Make that answer "minutes," and you'll find you make bolder changes, sooner, with less stress — because none of them can really hurt you.
