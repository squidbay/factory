# GitHub — platform grounding

**Every seat reads this alongside the [home base](../anthropic/README.md).** The factory *lives* on GitHub: the repo is the memory, the pull request is the only way anything changes, and the merge button is the human gate. That makes GitHub itself part of the factory's operating surface — and a platform feature the team doesn't know about is a capability the factory silently lacks.

These live links beat anything copied into this repo. If a page disagrees with our docs — a setting moved, a feature shipped, a limit changed — the live page is right and this repo is stale; say so and open an issue or a PR truing it (the empirical rule in [`VERSIONS.md`](../../VERSIONS.md)).

## The core mechanics (how this factory uses GitHub)

- **Repositories, branches, pull requests, merges** — the quickstart:
  <https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories>
- **Template repositories** — what your factory copy *is*, and how it differs from a fork. A template copy starts fresh and can be private; a public repo's fork cannot. This distinction is why the factory is a template, not a fork:
  <https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template>
- **Releases** — how the template announces versions: immutable, tagged, dated, with the notes in the body. `releases/latest` is the machine check, and **Watch → Custom → Releases** is the free notification channel:
  <https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases>
- **Branch protection & rulesets** — what makes "nothing lands without your merge" mechanical rather than a promise:
  <https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches>
- **Repository settings & features** — the catalog of switches (Pages, Actions, Discussions, security & analysis …):
  <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features>
- **The REST API** — how seats read GitHub programmatically (releases, PRs, files):
  <https://docs.github.com/en/rest>

## What's new (the platform-watch)

- **GitHub Changelog** — every shipped feature, improvement, and retirement, newest first (RSS available):
  <https://github.blog/changelog/>
- **GitHub public roadmap** — what's coming and what stage it's in:
  <https://github.com/github/roadmap>

## The loop, not just the links

Any seat that spots a platform capability the factory should adopt — or a retirement that threatens something the factory relies on — raises it as a recommendation through the normal lane: **finding → PR → the planning seat rules → the human gates.** Two real examples live in this factory's own history:

- **The fork → template move.** The factory began as a fork; a public repo's fork can't be made private, so the whole thing moved to a template repo. GitHub's own docs stated the difference plainly — a seat grounded on the template page would have flagged it on day one.
- **The update lane's move to Releases.** Immutable tags, `releases/latest`, and Watch notifications sat unused until someone noticed the sidebar.

Both were platform knowledge, found late. This page exists so the next one is found early.

---

*Independent open-source project; not affiliated with or endorsed by Anthropic or GitHub. GitHub is a trademark of GitHub, Inc.*
