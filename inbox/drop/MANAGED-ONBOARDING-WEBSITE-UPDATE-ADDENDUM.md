# Managed Onboarding Website Update Addendum

**Parent architecture:** `inbox/drop/MANAGED-ONBOARDING-REMOTE-MCP-RESEARCH.md`  
**Pull request:** #111  
**Status:** Required implementation follow-up after architecture approval

---

## Purpose

The managed onboarding architecture must be reflected in the public Factory website as part of implementation. Architecture approval is not complete delivery unless the customer-facing pages are updated to match the approved Free Factory and Managed Factory operating models.

Required public pages:

- `https://factory.squidbay.io`
- `https://factory.squidbay.io/managed`

These website updates belong in the implementation plan that follows architecture approval. They must not be omitted or treated as optional marketing cleanup.

---

## `factory.squidbay.io` — Free Factory requirements

The main Factory page must clearly describe the Free Factory path:

- Claude Pro or Max is required.
- The customer downloads the open-source Factory template.
- The customer self-installs, self-configures, and self-maintains the Factory.
- Free customers receive the Factory template, template updates, public documentation, community support, and nightly checking for new template releases.
- Free customers do not receive project-specific SquidBay support pull requests.
- Free customers do not receive the SquidBay Remote MCP connector, automatic seat installation, managed health monitoring, monthly helpful PRs, custom development, or the mobile Factory companion.
- The developer/self-hosted onboarding path remains supported and should reference the approved developer onboarding documentation associated with PR #88 after the PR-number/title discrepancy is resolved.

The page must not imply that SquidBay monitors, repairs, or operates free customer repositories.

Recommended primary actions:

- Download or view the open-source Factory template.
- Read self-hosted installation documentation.
- Compare Free and Managed Factory.

---

## `factory.squidbay.io/managed` — Managed Factory requirements

The Managed page must describe the approved managed onboarding journey:

```text
Purchase Managed Factory
    ↓
Provision SquidBay account
    ↓
Install SquidBay GitHub App
    ↓
Connect SquidBay Remote MCP in Claude
    ↓
Authenticate and authorize repository
    ↓
Automatically prepare Cowork, Designer, Code, and Manager
    ↓
Run onboarding verification
    ↓
Open onboarding verification pull request
    ↓
Customer Claude reviews
    ↓
Customer merges or rejects
    ↓
Ready to build
```

The page must accurately state that Managed Factory includes:

- Guided onboarding.
- SquidBay Remote MCP connector.
- GitHub App provisioning.
- Automatic installation or reconciliation of Cowork, Designer, Code, and Manager.
- Onboarding verification pull request.
- Nightly Factory health checks.
- Template update pull requests.
- Monthly helpful support pull requests, subject to the managed plan.
- Custom work delivered through pull requests.
- Factory mobile companion application powered by the Claude API.

The governance statement must be prominent and repeated near the primary call to action:

> **The customer is the only merge gate. SquidBay never merges customer code. Every onboarding, update, support, and custom-development change is proposed through a pull request for customer review.**

The page must not claim that Factory is fully installed before the customer merges the onboarding PR. Before merge, the correct state is:

> **Provisioned — awaiting customer merge**

---

## Shared website requirements

Both pages must:

- Use the same approved Free versus Managed capability matrix.
- Clearly distinguish template-release checking from full managed health monitoring.
- State that Claude Pro or Max is required for both offerings.
- Preserve the customer-only merge gate.
- Avoid language suggesting SquidBay can directly alter or merge default-branch code.
- Explain that SquidBay work is delivered through branches and pull requests.
- Remain consistent with the final approved Remote MCP, GitHub App, heartbeat, support, and template-update architecture.
- Be tested on desktop and mobile before release.
- Avoid publishing connector URLs, OAuth details, permissions, pricing, or availability claims until those details are production-approved.

---

## Website implementation acceptance criteria

The implementation work is complete only when:

1. `factory.squidbay.io` accurately presents the Free Factory self-hosted path.
2. `factory.squidbay.io/managed` accurately presents the Managed Factory Remote MCP onboarding path.
3. Both pages use the approved feature boundary and governance language.
4. The four seats are named consistently as Cowork, Designer, Code, and Manager.
5. The Managed page shows the onboarding verification PR and customer review step.
6. Neither page states or implies that SquidBay merges customer code.
7. Desktop and mobile layouts are visually verified.
8. Links, calls to action, and comparison navigation work.
9. Published copy is reviewed by Cowork against the approved architecture before deployment.
10. Website updates are delivered through a separate implementation pull request after architecture approval.

---

## Implementation sequencing

1. Approve the architecture in PR #111.
2. Resolve the PR #88 developer-path reference discrepancy.
3. Finalize connector naming, availability language, onboarding states, and approved plan claims.
4. Update `factory.squidbay.io` and `factory.squidbay.io/managed` in an implementation branch.
5. Run desktop and mobile visual verification.
6. Have Cowork audit the pages against the approved architecture.
7. Open a website implementation pull request.
8. Andrew remains the sole merge gate.

No website code is changed by this architecture PR. This addendum makes the two website updates explicit, mandatory implementation deliverables.
