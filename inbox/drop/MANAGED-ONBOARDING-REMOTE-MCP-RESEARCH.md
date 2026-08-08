# Managed Factory Onboarding via Remote MCP

**Owner:** Cowork  
**Priority:** High  
**Status:** Research & Architecture — no implementation authorized  
**Date:** 2026-07-27  
**Developer-path reference requested:** PR #88 (“Austin Emergency Recovery”)  
**Repository note:** At research time, `squidbay/factory` PR #88 is merged but is titled **“P1 (live, customer-facing): true CLAUDE.md's preflight to create-only — it contradicted RULE 21.”** This document preserves the requested #88 developer-path reference, but the owner should confirm whether “Austin Emergency Recovery” lives in another repository, issue, branch, or PR before implementation begins.

---

## 1. Decision Summary

Factory should support two deliberately different operating models:

1. **Free Factory** remains a developer/self-hosted product. The customer downloads, installs, configures, and maintains the open-source Factory template. SquidBay supplies template releases and a release-discovery heartbeat, but no project-specific support pull requests.
2. **Managed Factory** becomes a hosted control plane built around an OAuth-protected SquidBay Remote MCP server, a least-privilege GitHub App, automated Factory seat bootstrap, nightly health evaluation, and PR-only delivery of onboarding, updates, support, and custom development.

The managed design must preserve one non-negotiable governance rule:

> **The customer is the only merge gate. SquidBay creates branches, commits, checks, reports, and pull requests. SquidBay never merges customer code.**

Recommended rollout:

- **Phase 1:** Ship as an Anthropic custom Remote MCP connector with a stable HTTPS endpoint.
- **Phase 2:** Validate onboarding, authorization, tenant isolation, tool safety, seat bootstrap, health checks, and support operations with real managed customers.
- **Phase 3:** Harden documentation, privacy, reliability, security review, tool annotations, and multi-surface compatibility.
- **Phase 4:** Submit the connector to Anthropic’s Connectors Directory.

No implementation should begin until this architecture and the unresolved decisions near the end of this document are approved.

---

## 2. Product Boundary: Free vs Managed

Both offerings require the customer to have Claude Pro or Max. The distinction is not access to the Factory template; it is who owns installation, infrastructure, maintenance, and project-specific operational assistance.

| Capability | Free Factory | Managed Factory |
|---|---:|---:|
| Claude Pro/Max required | Yes | Yes |
| Open-source Factory template | Yes | Yes |
| Template releases | Yes | Yes |
| Release/update discovery heartbeat | Yes | Yes |
| Self-install | Required | Not required |
| Self-configuration | Required | Not required |
| Self-maintenance | Required | Shared/managed |
| SquidBay Remote MCP | No | Yes |
| GitHub App provisioning | Customer-owned/manual | Guided and managed |
| Automatic four-seat installation | No | Yes |
| Onboarding verification PR | No | Yes |
| Nightly Factory health checks | Release discovery only | Full health evaluation |
| Project-specific helpful PRs | No | Yes |
| Monthly support PR allowance | No | Yes |
| Custom development via PR | No | Yes |
| Mobile Factory companion | No | Yes |
| Customer reviews every PR | Customer choice | Required governance step |
| Customer is sole merge gate | Yes | Yes |
| SquidBay can merge customer code | Never | Never |

### 2.1 Free Factory contract

Free Factory includes:

- The public Factory template.
- Public installation and maintenance documentation.
- New template releases.
- A nightly or scheduled mechanism that can discover whether a newer template release exists.
- Community support.

Free Factory excludes:

- SquidBay-hosted Remote MCP access.
- Automatic repository provisioning.
- Automatic seat installation.
- Project-specific diagnosis.
- Helpful support PRs.
- Custom development.
- A promise that SquidBay monitors or repairs the customer repository.

The free heartbeat must not accidentally imply managed monitoring. It should answer only: **“Is a newer public Factory template available?”** It may produce a local notification or release issue, but it should not send customer repository contents to SquidBay.

### 2.2 Managed Factory contract

Managed Factory includes:

- Guided onboarding after successful subscription state is confirmed.
- A SquidBay-hosted Remote MCP connector.
- GitHub App installation and repository authorization.
- Automatic installation or reconciliation of Cowork, Designer, Code, and Manager.
- An onboarding verification pull request.
- Nightly checks of connector, repository, version, seats, and SquidBay-authored support PR state.
- Helpful support pull requests when customers are stuck, subject to the managed plan.
- Custom development delivered only through pull requests.
- A Claude API-powered mobile companion application.

Managed Factory does **not** transfer merge authority to SquidBay. Subscription status authorizes service, not repository ownership.

---

## 3. Existing Developer Path

The existing developer/self-hosted architecture remains supported:

```text
Claude Desktop
    ↓
Claude Code
    ↓
Local github-mcp-server
    ↓
Fine-grained PAT
    ↓
Developer workflow
```

This path is appropriate for advanced users who accept responsibility for:

- Running a local MCP server.
- Creating and rotating a fine-grained personal access token.
- Configuring Claude Desktop/Code developer settings.
- Selecting repositories and permissions.
- Installing and maintaining Factory seats.
- Diagnosing local connector and environment failures.

The requested reference is PR #88, described by the project as the Austin Emergency Recovery/developer onboarding path. Before implementation, resolve the repository mismatch noted at the top of this document so future documentation links to the correct artifact.

The managed architecture does not delete or silently replace this path. It creates a second product lane with a different ownership model.

---

## 4. Target Managed Customer Journey

```text
Managed plan purchase
    ↓
Stripe webhook confirms active entitlement
    ↓
SquidBay tenant is created or reactivated
    ↓
Customer installs SquidBay GitHub App
    ↓
Customer selects one or more repositories
    ↓
GitHub installation callback binds installation to tenant
    ↓
Customer adds SquidBay custom Remote MCP connector in Claude
    ↓
OAuth authorization binds Claude connection to tenant/user
    ↓
Connector verifies subscription + GitHub installation + repository access
    ↓
Customer selects target repository and authorizes bootstrap
    ↓
Provisioning service creates onboarding branch
    ↓
Cowork, Designer, Code, and Manager are installed/reconciled
    ↓
Validation checks run
    ↓
Onboarding verification PR is opened
    ↓
Customer Claude reviews the PR
    ↓
Customer merges or rejects
    ↓
Ready to build
```

### 4.1 Important sequencing rule

The connector may prepare and open the onboarding PR, but Factory is not considered installed until the customer merges it. Until then, status should be **“Provisioned — awaiting customer merge”**, not **“Ready.”**

An alternative for an empty repository is installation through GitHub’s repository-generation flow before the app is connected. That may be explored later, but the baseline managed design should work safely in an existing repository and therefore must use a pull request.

---

## 5. Recommended System Architecture

```text
┌──────────────────────── Customer surfaces ────────────────────────┐
│ Claude.ai / Desktop / Mobile / Code / Cowork                     │
│ Factory Mobile Companion                                         │
└─────────────────────────────┬─────────────────────────────────────┘
                              │ OAuth + MCP Streamable HTTP
                              ▼
┌──────────────────── Cloudflare connector edge ────────────────────┐
│ api.squidbay.com/mcp                                              │
│ - MCP protocol handler                                           │
│ - OAuth authorization/resource server behavior                   │
│ - Origin validation                                              │
│ - tool schemas and safety annotations                            │
│ - request authentication, tenant resolution, rate limiting       │
└───────────────┬───────────────────────────────┬────────────────────┘
                │                               │
                ▼                               ▼
┌──────────────────────────┐       ┌───────────────────────────────┐
│ Managed control plane    │       │ Durable execution/state       │
│ - tenant + entitlement   │       │ - workflow state              │
│ - repository bindings    │       │ - OAuth state/nonces          │
│ - policy evaluation      │       │ - idempotency locks           │
│ - audit records          │       │ - scheduled alarm/queue state │
└──────────────┬───────────┘       └──────────────┬────────────────┘
               │                                  │
               ├──────────────┬───────────────────┤
               ▼              ▼                   ▼
        Stripe webhooks   GitHub App API     Queue / Cron Trigger
               │              │                   │
               ▼              ▼                   ▼
        entitlement       short-lived         nightly heartbeat
        state             installation token  + update/support jobs
                              │
                              ▼
                     Customer repository
                     - branches
                     - commits
                     - checks
                     - issues (optional)
                     - pull requests
                     - never merge
```

### 5.1 Remote MCP transport

Use a public HTTPS Remote MCP endpoint with **Streamable HTTP** as the primary transport. Do not design around the deprecated SSE transport. Local stdio remains appropriate only for the free/developer path.

The connector should expose a small set of goal-oriented Factory tools rather than mirroring the entire GitHub API. Suggested tool families:

- `factory_get_status`
- `factory_list_repositories`
- `factory_plan_installation`
- `factory_open_onboarding_pr`
- `factory_check_health`
- `factory_plan_template_update`
- `factory_open_template_update_pr`
- `factory_request_support`
- `factory_get_support_prs`
- `factory_plan_custom_work`
- `factory_open_custom_work_pr`

Tools that mutate a repository should require explicit target repository and branch/PR intent. A broad generic `github_execute` tool is not recommended for the first managed release.

### 5.2 Control plane separation

The Remote MCP Worker should not directly contain all provisioning logic. Separate:

- **Protocol edge:** MCP negotiation, authentication, schemas, tool annotations, request validation.
- **Policy/control plane:** subscription checks, tenant isolation, repository allow-list, plan limits, operation authorization.
- **Execution workers:** GitHub App token minting, branch/commit/PR operations, validation, heartbeat, support automation.

This prevents the public connector endpoint from becoming a monolith and allows jobs to be retried without replaying the customer’s Claude request.

---

## 6. Cloudflare Changes

The managed architecture requires a production Cloudflare application rather than only static pages.

### 6.1 Required components

**Workers / Agents SDK**

- Host the Remote MCP endpoint.
- Implement Streamable HTTP.
- Expose tool schemas, prompts, and resources where useful.
- Validate authentication and tenant context for every call.

**OAuth provider layer**

- Implement MCP-compatible OAuth behavior.
- Support authorization server discovery and protected resource metadata.
- Issue SquidBay access tokens to Claude MCP clients after the user authenticates.
- Keep GitHub authorization separate from MCP client authorization.

**Durable Objects or equivalent durable coordination**

- Store short-lived OAuth transaction state, nonces, PKCE-related state, session bindings, and workflow locks.
- Serialize repository provisioning per tenant/repository.
- Prevent two Claude surfaces from opening duplicate onboarding/update PRs simultaneously.

**D1 or external relational database**

Suggested records:

- tenants
- users
- subscriptions/entitlements
- GitHub App installations
- authorized repositories
- MCP connections
- Factory installation state
- heartbeat results
- support requests
- SquidBay-authored PR ledger
- audit events

**Queues**

- Provisioning jobs.
- Template update preparation.
- Support diagnosis.
- GitHub webhook processing.
- Retry and dead-letter handling.

**Cron Triggers**

- Nightly managed heartbeat.
- Free-template release publication/discovery tasks if SquidBay operates a public release feed.

**Secrets**

- GitHub App private key or signing material.
- GitHub webhook secret.
- Stripe webhook secret.
- OAuth provider secrets.
- Encryption keys.

Store secrets only in Cloudflare secret storage or an approved external secret manager. Never store GitHub installation tokens, Stripe secrets, or private keys in repository files, D1 plaintext fields, logs, prompts, or PR bodies.

**Cloudflare Access — optional**

Cloudflare Access can protect internal operator consoles and may participate as an identity provider, but customer connector authorization should use a standards-compliant OAuth flow supported by Claude. Do not require customers to join SquidBay’s internal Access organization.

### 6.2 Endpoint layout

Illustrative layout:

```text
https://api.squidbay.com/.well-known/oauth-protected-resource
https://auth.squidbay.com/.well-known/oauth-authorization-server
https://auth.squidbay.com/authorize
https://auth.squidbay.com/token
https://api.squidbay.com/mcp
https://api.squidbay.com/github/install/callback
https://api.squidbay.com/webhooks/github
https://api.squidbay.com/webhooks/stripe
https://app.squidbay.com/onboarding
https://app.squidbay.com/health
```

Exact discovery paths must follow the MCP and OAuth specifications used at implementation time.

### 6.3 Tenant isolation

Every operation must resolve this tuple before accessing GitHub:

```text
MCP subject
+ SquidBay tenant
+ active managed entitlement
+ GitHub App installation
+ authorized repository
+ requested capability
```

Never accept a raw repository owner/name from Claude and immediately mint a token. Confirm that the repository belongs to the installation bound to the authenticated tenant.

Recommended isolation controls:

- Repository allow-list by GitHub numeric repository ID, not only mutable names.
- Installation ID bound to one tenant unless explicitly approved for an organization-wide tenant.
- Per-tenant encryption context.
- Per-tenant rate and concurrency limits.
- Audit event on every write-intent tool call and every GitHub mutation.
- Idempotency key for every provisioning/support/update job.

---

## 7. Authentication and Authorization

There are three distinct trust relationships. They must not be collapsed into one token.

### 7.1 Customer ↔ SquidBay subscription

Stripe establishes commercial entitlement.

- Checkout creates a pending tenant or links to an existing tenant.
- Signed Stripe webhooks update entitlement state.
- Only active/trialing statuses approved by product policy enable managed writes.
- Failed/canceled subscriptions enter a grace or read-only state defined by policy.
- Billing state must never automatically delete customer repository content.

### 7.2 Claude MCP client ↔ SquidBay Remote MCP

Use OAuth 2.0/2.1-compatible authorization for authenticated remote MCP.

Requirements:

- HTTPS only.
- Authorization Code flow with PKCE where applicable.
- Protected resource and authorization server discovery.
- Redirect URI validation.
- `Origin` header validation for browser-originating requests.
- Short-lived access tokens.
- Refresh-token rotation if refresh tokens are issued.
- Explicit scopes.
- Token revocation on disconnect, account closure, or security event.
- No bearer tokens in query strings or logs.

Suggested SquidBay connector scopes:

```text
factory:read
factory:install
factory:health
factory:update-pr
factory:support-pr
factory:custom-work-pr
```

Avoid a `factory:merge` scope. It should not exist.

### 7.3 SquidBay service ↔ GitHub

Use a GitHub App installation, not a customer PAT.

Flow:

1. SquidBay signs a short-lived JWT as the GitHub App.
2. SquidBay exchanges it for a short-lived installation access token.
3. Token access is restricted to the installation’s selected repositories and requested permissions.
4. The token is used for the single queued operation and then discarded.

Do not persist installation access tokens as long-lived credentials. Persist installation ID and repository authorization metadata; mint tokens just in time.

### 7.4 GitHub user authorization

A GitHub App user access token is optional. The baseline design should use installation authorization for service operations and SquidBay OAuth identity for the human account. Add GitHub user-to-server authorization only if a feature truly needs actions attributed to the individual user rather than the App.

---

## 8. GitHub App Design

### 8.1 Responsibilities

The GitHub App should:

- Receive installation and repository-selection events.
- Identify accessible repositories.
- Read Factory state and manifests.
- Create branches.
- Create or update files on dedicated SquidBay branches.
- Open pull requests.
- Read pull request status and reviews.
- Read checks/statuses needed for health reporting.
- Create check runs or commit statuses if adopted.
- Receive relevant webhooks.

The GitHub App should not:

- Merge pull requests.
- Push directly to the default branch.
- Force-push customer branches.
- Delete customer branches by default.
- Change branch protection.
- Change repository visibility.
- Add collaborators.
- Modify Actions secrets unless a separately approved architecture requires it.
- Request organization administration permissions for baseline onboarding.

### 8.2 Recommended repository permissions

Final permissions must be mapped against exact GitHub endpoints during implementation. Expected baseline:

| Permission | Level | Purpose |
|---|---:|---|
| Metadata | Read | Required GitHub App repository metadata |
| Contents | Read & write | Read Factory files; create branch commits/files |
| Pull requests | Read & write | Open and inspect onboarding/update/support PRs |
| Checks | Read, possibly write | Read customer checks; optionally publish Factory verification check |
| Commit statuses | Read, possibly write | Optional health/status reporting |
| Issues | Read & write, optional | Only if support requests use issues |
| Actions | Read, optional | Only if heartbeat inspects workflow runs |
| Workflows | Avoid initially | Required only if the App will modify workflow files through the Contents API |

If automatic installation includes files under `.github/workflows`, GitHub may require workflow-specific permission. Prefer an architecture where the initial connector does not modify customer workflow files until that permission and its security implications are separately approved.

### 8.3 Webhook events

Subscribe only to required events, likely:

- `installation`
- `installation_repositories`
- `repository`
- `pull_request`
- `pull_request_review`
- `check_suite` or `check_run` if used
- `workflow_run` only if heartbeat needs it
- `push` for Factory-managed branches or manifest changes

Webhook processing must:

- Verify the GitHub signature.
- Store the delivery ID.
- Be idempotent.
- Acknowledge quickly and queue work.
- Reject replay outside policy.

### 8.4 Repository selection

Customers should choose specific repositories during GitHub App installation. “All repositories” may be supported for organizations that knowingly select it, but the onboarding UI must still require selecting the actual Factory target repository.

No cross-repository action should be inferred from organization membership alone.

---

## 9. Repository Provisioning Model

### 9.1 Existing repository baseline

The safe default is PR-based installation into an existing repository:

1. Read default branch SHA.
2. Inspect for existing Factory files and collisions.
3. Generate an installation plan and show it to the customer.
4. Create a unique branch, for example:
   `squidbay/onboarding-<installation-id>-<date>`.
5. Commit the four seats and required Factory support files.
6. Run static and structural validation.
7. Open an onboarding verification PR.
8. Record PR number, head SHA, template version, and generated manifest.
9. Wait for customer review and merge.

### 9.2 New repository option

A later onboarding option may create a new repository from the Factory template. This requires explicit product decisions about:

- Who owns the new repository.
- Repository name and visibility.
- Organization policy restrictions.
- Whether GitHub App installation precedes repository creation.
- Whether the customer or SquidBay creates the repository.

Do not include repository creation in MVP unless the GitHub permission and ownership model is unambiguous.

### 9.3 Collision and reconciliation policy

Provisioning must classify each managed file as:

- Missing — safe to add.
- Exact managed version — no change.
- Older managed version — update candidate.
- Customer-modified managed file — conflict requiring review.
- Unknown existing file at managed path — block or relocate by approved policy.

Never overwrite a customer-modified seat file silently. The PR must show the change and label the conflict.

### 9.4 Installation manifest

Add a machine-readable manifest, location to be approved, containing at least:

```yaml
factory_schema: 1
factory_version: "x.y.z"
installation_id: "..."
managed: true
seats:
  cowork:
    path: "..."
    source_digest: "sha256:..."
  designer:
    path: "..."
    source_digest: "sha256:..."
  code:
    path: "..."
    source_digest: "sha256:..."
  manager:
    path: "..."
    source_digest: "sha256:..."
installed_at: "..."
source_release: "..."
```

Do not place customer secrets, subscription IDs, GitHub installation tokens, or personal data in this file.

---

## 10. Automatic Factory Seat Installation

The four logical seats are:

- **Cowork** — orchestration, research, operational coordination, and handoff.
- **Designer** — UI/UX and design-system work.
- **Code** — implementation and testing.
- **Manager** — planning, auditing, acceptance criteria, and governance.

### 10.1 Source of truth

Seat definitions must come from a versioned Factory release or immutable commit, not the current mutable `main` branch at provisioning time.

Each release should include:

- Template semantic version.
- Manifest/schema version.
- Seat file list.
- SHA-256 digest per managed file.
- Release notes.
- Migration notes.
- Minimum connector/control-plane version if relevant.

### 10.2 Bootstrap operation

`factory_plan_installation` should be read-only and return:

- Target repository.
- Default branch and head SHA.
- Existing Factory detection.
- Files to add/change.
- Permission readiness.
- Potential conflicts.
- Template version.
- Expected PR title.

`factory_open_onboarding_pr` should perform the mutation only after explicit customer approval.

### 10.3 Verification PR contents

The onboarding PR should include:

- Four seats.
- Shared governance and “what finished means” rules.
- Factory manifest/version record.
- Minimal onboarding receipt/report.
- Any required non-secret configuration examples.

The PR body should report:

- What was installed.
- What was not installed.
- Validation results.
- Permissions observed.
- Any conflicts or manual steps.
- Clear customer review checklist.
- Governance reminder that SquidBay cannot and will not merge.

### 10.4 Verification checks

Before opening the PR:

- All required seat files exist in the generated tree.
- Seat files parse under their expected format.
- No placeholders intended for SquidBay internal repositories leak into customer files.
- No secrets are present.
- Manifest digests match generated files.
- Managed paths do not escape the repository root.
- Branch is based on current default-branch head or drift is reported.
- PR title/body include installation ID and template version.

---

## 11. Nightly Heartbeat

### 11.1 Managed heartbeat responsibilities

The managed heartbeat should evaluate:

1. **Template version** — installed version versus latest approved release.
2. **Factory health** — required files, manifest validity, obvious broken references, and configured checks.
3. **Connector status** — tenant authorization, OAuth connection state where observable, recent MCP/tool health, and service availability.
4. **Seat integrity** — presence and digest/drift state of Cowork, Designer, Code, and Manager.
5. **Available template updates** — version and migration classification.
6. **Repository permissions** — GitHub App still installed and target repository still authorized.
7. **Outstanding SquidBay support PRs** — open, draft, stale, changes requested, approved, closed, or merged.
8. **Provisioning state** — onboarding PR awaiting customer merge, merged, closed unmerged, or superseded.

### 11.2 Free heartbeat responsibilities

The free mechanism checks only whether a new public template release exists. It must not call the managed control plane with repository contents.

Suggested free implementation options:

- GitHub release feed.
- A public version JSON document.
- A local scheduled workflow that compares the installed version to the public release version.

### 11.3 Health state model

Recommended normalized states:

- `healthy`
- `update_available`
- `customer_modification_detected`
- `onboarding_pr_pending`
- `support_pr_pending`
- `permission_lost`
- `connector_degraded`
- `seat_missing`
- `manifest_invalid`
- `subscription_attention`
- `unknown`

A health failure should not automatically mutate the repository. Heartbeat is read-only by default. It may create an internal alert or customer notification. Opening a repair/update PR should require either:

- Explicit customer request, or
- A clearly disclosed managed policy the customer opted into, still limited to opening a PR.

### 11.4 Seat integrity nuance

Digest mismatch does not always mean corruption. A customer may intentionally customize a seat. Report:

- expected digest
- observed digest
- last known SquidBay commit
- whether the change came from a SquidBay-authored PR
- recommended action

Never automatically reset a customized seat.

### 11.5 Scheduling and scale

Use Cloudflare Cron to enqueue tenant jobs, not to process every repository in one request. Apply jitter and per-installation rate limits. Store the last successful check and next eligible check. Retry transient failures with bounded exponential backoff.

---

## 12. Template Update Workflow

### 12.1 Release publication

Factory maintainers publish an immutable release with:

- Version.
- Signed or integrity-verifiable manifest.
- Changed managed files.
- Migration notes.
- Risk level.
- Whether update can be proposed automatically.

### 12.2 Free update flow

```text
Nightly release check
    ↓
New version detected
    ↓
Customer receives release notice
    ↓
Customer downloads/applies update
    ↓
Customer resolves conflicts and maintains installation
```

No project-specific SquidBay PR is promised.

### 12.3 Managed update flow

```text
Nightly heartbeat detects approved release
    ↓
Compare installed manifest and customer drift
    ↓
Classify update: clean / conflict / migration required
    ↓
Create update plan
    ↓
Customer requests or policy authorizes update PR
    ↓
SquidBay branch created
    ↓
Template changes applied without overwriting unresolved customer edits
    ↓
Validation runs
    ↓
Template update PR opened
    ↓
Customer Claude reviews
    ↓
Customer merges or rejects
```

### 12.4 Update rules

- One update PR per repository/template target at a time.
- Reuse or supersede an existing open SquidBay update PR rather than opening duplicates.
- Never merge.
- Never force-push after customer review without clearly marking the revision.
- Do not mix template updates with unrelated custom development unless customer explicitly approves combined scope.
- Preserve customer-owned files.
- Describe conflicts rather than masking them.

---

## 13. Managed Support PR Workflow

### 13.1 Intake

Support may begin through:

- Claude Remote MCP tool.
- Managed dashboard.
- Mobile companion.
- A designated repository issue/form if approved.

A support request should capture:

- Tenant and repository.
- Problem statement.
- Expected behavior.
- Relevant branch/PR.
- Permission to inspect specified repository context.
- Whether a code change is requested.

### 13.2 Diagnosis

SquidBay may read only repositories selected in the GitHub App installation and bound to the managed tenant. Diagnosis should create an internal case with an audit trail.

### 13.3 Helpful support PR

When a repository change is useful:

1. Reproduce or verify the issue where possible.
2. Produce a scoped plan.
3. Create a unique support branch.
4. Make only the approved changes.
5. Run relevant checks.
6. Open a PR with evidence, limitations, and review instructions.
7. Record the PR in the SquidBay PR ledger.
8. Wait for customer review.

The support PR must not claim a fix is complete if it was not validated.

### 13.4 Monthly support allowance

“Monthly helpful support PRs” requires a product-policy definition before implementation:

- Is it one PR per billing month, a fair-use target, or a guaranteed minimum?
- Do revisions to the same PR count separately?
- Do template update PRs count?
- Do onboarding PRs count?
- What happens to unused allowance?

The control plane must enforce the approved rule transparently, not infer it from vague marketing copy.

---

## 14. Custom Development Workflow

Custom work uses the same repository governance but a separate commercial scope.

```text
Customer requests work
    ↓
Scope and acceptance criteria approved
    ↓
SquidBay creates tracked work order
    ↓
Implementation branch created
    ↓
Work completed and tested
    ↓
Pull request opened
    ↓
Customer Claude reviews
    ↓
Customer requests revisions, merges, or rejects
```

Required controls:

- Scope ID linked to every branch and PR.
- Acceptance criteria in PR body.
- Test evidence.
- Explicit list of files changed.
- Clear separation from template maintenance.
- No direct default-branch writes.
- No merge tool in the connector.

---

## 15. Tool Safety and Human Control

### 15.1 Tool annotations

For Anthropic directory readiness, every MCP tool should have a human-readable title and appropriate annotations, including read-only or destructive/write hints as applicable.

Examples:

| Tool | Classification |
|---|---|
| `factory_get_status` | Read-only |
| `factory_plan_installation` | Read-only |
| `factory_open_onboarding_pr` | Write, non-destructive to default branch |
| `factory_open_template_update_pr` | Write, non-destructive to default branch |
| `factory_request_support` | Write to SquidBay case system |
| `factory_open_custom_work_pr` | Write, non-destructive to default branch |

Do not label a PR-opening tool read-only merely because it does not merge.

### 15.2 Explicit approval boundaries

Claude may invoke read-only status and planning tools without repository changes. Mutation tools must surface:

- Repository.
- Base branch.
- Proposed branch.
- File summary.
- Purpose.
- Whether a PR will be opened.

The customer must have a meaningful opportunity to approve the action in Claude.

### 15.3 No merge capability

Enforce the merge boundary at multiple layers:

- Do not define an MCP merge tool.
- Do not request permissions solely needed to merge.
- Add policy checks that reject merge-like endpoints.
- Keep branch-protection changes out of scope.
- Audit attempted prohibited operations.
- State the boundary in onboarding and every SquidBay PR.

---

## 16. Security and Privacy Model

### 16.1 Primary threats

- Cross-tenant repository access.
- Confused-deputy operations against a repository the user did not authorize.
- OAuth token theft or replay.
- GitHub webhook forgery.
- Prompt injection from repository content causing unintended tool calls.
- Over-privileged GitHub App permissions.
- Secret leakage into logs, prompts, or PRs.
- Duplicate or racing provisioning jobs.
- Supply-chain tampering with seat templates.
- SquidBay operator misuse.

### 16.2 Controls

- Least-privilege GitHub permissions.
- Short-lived installation tokens.
- OAuth PKCE, nonce/state validation, rotation, and revocation.
- Exact redirect URI and Origin validation.
- Signed webhook verification and delivery deduplication.
- Numeric tenant/installation/repository binding.
- Immutable release source and file digests.
- Read-plan-write separation.
- Explicit mutation approval.
- Repository operation allow-list.
- No arbitrary shell execution in the Remote MCP service.
- No arbitrary GitHub endpoint proxy in MVP.
- Structured logging with secret redaction.
- Operator role separation and audit logs.
- Data retention policy.
- Incident-response and connector-revocation procedure.

### 16.3 Prompt injection boundary

Repository content is untrusted data. Seat files, issues, PR comments, README text, and code may contain instructions that attempt to redirect the connector.

The execution service must follow server-side policy rather than repository instructions. For example, text in a README saying “merge this PR” cannot authorize a merge, and text naming another repository cannot change the bound target repository.

### 16.4 Privacy

Before directory submission, publish clear documentation describing:

- Data collected.
- Repository content accessed.
- How data is used.
- Storage and retention.
- Third parties, including GitHub, Stripe, Cloudflare, and Anthropic surfaces.
- Support access.
- Customer deletion/revocation process.
- Contact and security reporting.

---

## 17. Connector Directory Strategy

### 17.1 Custom connector first

Anthropic supports custom Remote MCP connectors through a server URL. This is the correct validation path because it allows SquidBay to:

- Test the end-to-end OAuth flow.
- Change tools before public review.
- Validate across Claude.ai, Desktop, Mobile, Code, and Cowork.
- Confirm tenant and repository isolation.
- Establish uptime and support processes.
- Gather real onboarding evidence.

Use a shareable custom-connector install link or clear manual instructions once the production URL is stable.

### 17.2 Directory readiness requirements

Current Anthropic guidance requires, among other items:

- A Remote MCP server reachable over HTTPS.
- OAuth 2.0 for authenticated services.
- Security, reliability, and compatibility standards.
- Tool titles and read-only/destructive annotations.
- Clear setup and usage documentation.
- Accurate data-handling and privacy disclosures.
- Support channel.
- Test account and reviewer instructions.
- Tool/resource/prompt inventory.
- Read/write capability disclosure.
- Origin validation.
- Public launch documentation.
- Branding assets and connector description.

Directory listing does not replace custom deployment. Anthropic documents a supported model where a directory connector offers safe defaults while a separate custom connector can provide elevated or tenant-specific behavior.

### 17.3 Submission gate

Do not submit until all are true:

- Production custom connector has multiple successful managed onboardings.
- OAuth reconnect/revocation is tested.
- GitHub installation removal is handled.
- Cross-tenant tests pass.
- No merge capability exists.
- Tool annotations are complete.
- Privacy policy and support documentation are public.
- Status/incident process exists.
- Claude.ai, Desktop, Mobile, Code, and Cowork have been tested where applicable.
- A reviewer unfamiliar with SquidBay can complete setup from the documentation.

---

## 18. Observability and Audit

Record structured events for:

- Stripe entitlement changes.
- GitHub App installation/repository changes.
- OAuth connect, refresh, revoke, and failure.
- Every MCP tool invocation.
- Every GitHub token mint.
- Every branch, commit, and PR created by SquidBay.
- Every heartbeat result.
- Every support/custom work case transition.
- Every denied policy action.

Recommended fields:

```text
event_id
timestamp
tenant_id
user_subject
mcp_connection_id
github_installation_id
repository_id
operation
scope
result
request_correlation_id
job_id
branch
pull_request_number
source_ip/risk metadata where lawful
redacted_error
```

Do not log access tokens, private keys, raw Stripe payload secrets, or full sensitive repository files.

Operational metrics:

- MCP availability and latency.
- OAuth success/failure rate.
- GitHub API error/rate-limit rate.
- Onboarding completion time by stage.
- Provisioning retry/dead-letter count.
- Heartbeat coverage and stale tenants.
- PR-open success rate.
- Customer merge/reject time, reported as customer-controlled behavior rather than service SLA.

---

## 19. Failure and Recovery Behavior

| Failure | Required behavior |
|---|---|
| Stripe webhook delayed | Keep prior entitlement briefly; reconcile from Stripe before write |
| GitHub App not installed | Return guided install action; do not request PAT |
| Repository not selected | Ask customer to update App repository access |
| GitHub token mint fails | Stop operation, log, retry only safe/idempotent job |
| Branch name collision | Generate deterministic unique branch or resume matching job |
| Default branch advanced | Re-plan or report drift before committing |
| Existing onboarding PR | Resume/update/supersede; do not create duplicate |
| Customer closes PR unmerged | Mark rejected/closed; do not reopen automatically |
| Seat file customized | Report drift; preserve customization unless approved |
| OAuth revoked | Read/write tools require reconnect |
| Subscription canceled | Stop new managed work after policy window; never delete code |
| Connector outage | Customer repository remains intact; status page and retry |
| GitHub App uninstalled | Mark permission lost and stop all repository access |

Provisioning jobs must be resumable from durable state and safe to retry.

---

## 20. Implementation Roadmap

### Phase 0 — Architecture approval

- Resolve PR #88 reference mismatch.
- Approve Free vs Managed contract.
- Approve merge prohibition and GitHub permission ceiling.
- Approve repository manifest location/schema.
- Define monthly support PR policy.
- Define subscription grace behavior.

### Phase 1 — Remote MCP proof of concept

- Deploy minimal Cloudflare Streamable HTTP MCP endpoint.
- Implement OAuth discovery and authorization.
- Add read-only `factory_get_status` against a SquidBay test repository.
- Validate in Anthropic custom connector flow.
- Confirm Claude surfaces and reconnect behavior.

**Exit:** Authenticated tenant can read only its bound test repository.

### Phase 2 — GitHub App and tenant binding

- Register/configure GitHub App.
- Implement installation callbacks and signed webhooks.
- Bind installation and repository IDs to tenants.
- Mint short-lived installation tokens.
- Add repository status and permission checks.

**Exit:** Cross-tenant and unauthorized repository tests fail closed.

### Phase 3 — Seat bootstrap and onboarding PR

- Publish versioned Factory release manifest.
- Implement installation planning.
- Implement branch/file/PR creation.
- Install Cowork, Designer, Code, and Manager.
- Add validation and onboarding receipt.
- Confirm no merge endpoint/tool exists.

**Exit:** A new managed customer can reach an accurate onboarding PR without a PAT or local MCP server.

### Phase 4 — Heartbeat and template updates

- Add queued nightly health checks.
- Add version and seat integrity evaluation.
- Add permission/connector/support PR checks.
- Add update planning and update PR flow.
- Separate free release discovery from managed health monitoring.

**Exit:** Drift and updates are reported accurately; no silent overwrite occurs.

### Phase 5 — Support and custom work

- Add support request intake and case ledger.
- Add monthly support entitlement enforcement.
- Add support/custom branch and PR workflows.
- Add customer-facing PR status in connector/mobile app.

**Exit:** SquidBay can deliver help through auditable PRs while customer retains all merge control.

### Phase 6 — Production hardening

- Security review and threat-model testing.
- Load, rate-limit, retry, and dead-letter testing.
- Privacy, retention, support, and incident documentation.
- Status page and operational runbooks.
- Multi-surface Claude testing.

### Phase 7 — Anthropic Connectors Directory

- Complete pre-submission checklist.
- Ensure tool annotations and Origin validation.
- Prepare test account and reviewer guide.
- Publish documentation/privacy/support links.
- Submit Remote MCP connector for review.

---

## 21. Acceptance Tests

### Authentication

- A user without an active managed entitlement cannot run managed write tools.
- OAuth state/nonce replay is rejected.
- Revoked MCP access token is rejected.
- GitHub App uninstall immediately prevents new GitHub access.

### Isolation

- Tenant A cannot name or access Tenant B’s repository.
- A repository outside the App’s selected set cannot be accessed.
- Renaming a repository does not break numeric ID binding.

### Provisioning

- Clean repository produces one onboarding PR containing all four seats.
- Existing managed installation produces an idempotent no-op or update plan.
- Customer-modified seat produces a conflict report, not overwrite.
- Duplicate request does not create duplicate PRs.
- Default branch movement is detected.

### Governance

- Connector tool inventory contains no merge tool.
- GitHub operation policy rejects merge endpoint attempts.
- No operation writes directly to default branch.
- Customer can close/reject a PR without SquidBay reopening it automatically.

### Heartbeat

- Detects new template version.
- Detects missing seat.
- Detects modified seat without classifying it automatically as malicious.
- Detects lost GitHub permission.
- Lists outstanding SquidBay-authored PRs accurately.

### Recovery

- Safe retry after a transient GitHub failure resumes the same job.
- Dead-letter job is visible to operators.
- Connector outage does not alter customer repository state.

---

## 22. Open Decisions Requiring Owner Approval

1. **Correct developer-path reference:** Is “Austin Emergency Recovery” PR #88 in another repository, or should this document reference a different PR in `squidbay/factory`?
2. **Managed support allowance:** Exact monthly PR entitlement and counting rules.
3. **Template manifest path:** Where the machine-readable installation record lives.
4. **Workflow installation:** Whether MVP installs/modifies GitHub Actions workflows and therefore needs elevated workflow permission.
5. **Repository creation:** Existing repositories only for MVP, or managed creation of new repositories.
6. **Automatic update PR policy:** Customer-triggered only versus opt-in automatic PR creation after heartbeat.
7. **Identity provider:** SquidBay account auth implementation and whether Cloudflare Access is limited to operators.
8. **Mobile companion scope:** Read/status/request only at MVP, or ability to approve PR-opening operations.
9. **Data retention:** Duration for repository-derived diagnostics, audit events, and support artifacts.
10. **Cancellation/grace:** When managed writes stop and how long read-only status remains available.
11. **Directory topology:** One common connector endpoint with tenant resolution is recommended; approve before considering per-tenant URLs.

---

## 23. Recommended Architecture Ruling

Approve the following as the implementation baseline:

- Free Factory remains self-hosted and receives public template updates plus release discovery only.
- Managed Factory uses a SquidBay-hosted Remote MCP connector over OAuth-protected Streamable HTTP.
- Cloudflare hosts the connector edge, OAuth/control plane, durable workflow state, queues, webhooks, and nightly scheduling.
- A least-privilege GitHub App replaces customer PATs for the managed path.
- GitHub App installation tokens are short-lived and minted just in time.
- The connector exposes narrow Factory tasks, not a generic GitHub API proxy.
- Cowork, Designer, Code, and Manager are installed from immutable versioned releases through an onboarding PR.
- The customer reviews every PR and remains the only merge gate.
- Heartbeat is read-only by default and distinguishes update availability, drift, permissions, connector health, and support PR state.
- Template updates, helpful support, and custom development are delivered through separate auditable PR workflows.
- Anthropic custom connector deployment comes first; directory submission follows successful production validation and hardening.

---

## 24. Primary Research Sources

Research should be revalidated immediately before implementation because MCP, Claude connector, Cloudflare Agents, and directory requirements evolve.

- Anthropic MCP overview: https://docs.anthropic.com/en/docs/mcp
- Claude Connectors Directory: https://claude.com/docs/connectors/directory
- Anthropic directory submission guidance: https://claude.com/docs/connectors/building/submission
- Directory vs custom connectors: https://claude.com/docs/connectors/building/directory-vs-custom
- Cloudflare MCP overview: https://developers.cloudflare.com/agents/model-context-protocol/
- Cloudflare Remote MCP server guide: https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/
- Cloudflare MCP security guide: https://developers.cloudflare.com/agents/model-context-protocol/guides/securing-mcp-server/
- Cloudflare MCP authorization: https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/
- MCP authorization specification: https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
- GitHub App authentication: https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app
- GitHub App installation tokens: https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app
- GitHub App permissions: https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app

---

## Governance Reminder

Andrew remains the sole merge gate for SquidBay-owned repositories, and every managed customer remains the sole merge gate for that customer’s repositories.

SquidBay proposes changes through pull requests.

SquidBay never merges customer code.
