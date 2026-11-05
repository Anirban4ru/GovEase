# Antigravity Skills --- Automated Installation & Configuration Prompt

**Project:** Unified Life Services Platform\
**Execution scope:** Skill installation and configuration only. Do not
begin application development.

## Objective

Inspect, install, configure, and verify a carefully selected set of
Google Antigravity Agent Skills for this workspace. Prioritise security,
privacy, accessibility, testing, maintainability, and exceptionally
polished user experience.

Work from the project root. Preserve existing project files and
configurations.

## 1. Inspect the environment first

1.  Confirm the current project root and inspect its existing structure.
2.  Check Node.js and npm availability if the selected installer
    requires them.
3.  Read the current installation documentation for every source
    repository before running commands.
4.  Verify that every requested skill still exists and that its
    installation method is compatible with the current Antigravity
    version.
5.  Inspect each skill's `SKILL.md`, metadata, scripts, dependencies,
    and any instructions that could trigger external actions.
6.  Do not run opaque or unreviewed scripts. Prefer documented,
    auditable installation steps.
7.  Do not install the entire skill collection or unrelated tools.

## 2. Install the selected skills

Use the repository below as the primary source:

-   `https://github.com/rmyndharis/antigravity-skills`

Verify availability and install these skills into the workspace's
`.agents/skills/` directory:

1.  `nextjs-app-router-patterns`
2.  `typescript-pro`
3.  `security-auditor`
4.  `threat-modeling-expert`
5.  `accessibility-compliance-accessibility-audit`
6.  `wcag-audit-patterns`
7.  `e2e-testing-patterns`
8.  `codebase-cleanup-deps-audit`
9.  `ui-ux-designer`
10. `ui-visual-validator`

Use the repository's current documented installer and syntax. Do not
assume that old commands, package names, skill identifiers, or catalogue
entries remain valid.

If a requested skill is unavailable, do not invent it. Report that it is
unavailable and identify a verified alternative only if one can be
confirmed from a trustworthy source.

## 3. Add a dedicated design-system skill

Inspect:

-   `https://github.com/lcanady/ui-skill`

Determine whether it provides a current, documented Google
Antigravity-compatible installation method. If compatible, install only
the appropriate skill into this workspace.

Avoid duplicate or overlapping installations. If it conflicts with the
selected UI/UX skills, explain the overlap and recommend the smallest
useful combination rather than installing everything.

## 4. Create three custom project skills

Create these workspace skills using valid Antigravity skill structure
and clear `SKILL.md` metadata. Place each under
`.agents/skills/<skill-name>/SKILL.md`.

### A. `government-service-verification`

Responsibilities:

-   Verify government service URLs against official government sources.
-   Validate service descriptions, eligibility criteria, fees, required
    documents, and instructions against authoritative sources.
-   Record the official source URL, human verification date, next review
    date, and permitted domain.
-   Flag broken, redirected, outdated, ambiguous, or unverified
    information.
-   Never invent government information, fees, eligibility rules, or
    service availability.
-   Clearly distinguish official government integrations from external
    links and independent guidance.
-   Never imply government endorsement, partnership, or official status
    without written authorisation.
-   Require human review before publishing material changes to service
    information.

### B. `privacy-first-development`

Responsibilities:

-   Apply data minimisation and privacy-by-design.
-   Avoid unnecessary collection, transmission, retention, or display of
    personal information.
-   Prevent sensitive information from appearing in logs, analytics,
    error reports, URLs, or debugging output.
-   Use secure defaults and appropriate local storage practices.
-   Do not collect or store Aadhaar biometrics or OTPs, banking
    passwords, UPI PINs, card security codes, government portal
    passwords, or unnecessary medical records.
-   Review third-party SDKs, analytics, trackers, telemetry, and
    dependencies before introducing them.
-   Document what data is processed, where it is stored, why it is
    needed, and how it can be deleted.
-   Flag legal or regulatory questions for qualified human review; do
    not claim compliance merely because a checklist exists.
-   Respect applicable Indian privacy and cybersecurity requirements,
    subject to verification against current primary sources.

### C. `production-quality-gate`

Responsibilities:

-   Require relevant tests and evidence before a feature is marked
    complete.
-   Check for dead code, duplicate implementations, unused dependencies,
    unnecessary abstractions, and abandoned TODOs.
-   Detect debug artifacts, accidental secrets, sensitive-data exposure,
    and excessive logging.
-   Review error handling, accessibility, responsive behaviour,
    performance, and maintainability.
-   Verify that documentation matches actual implementation.
-   Record test commands, results, known limitations, and unresolved
    risks.
-   Never claim that software is secure, vulnerability-free, compliant,
    or production-ready without adequate evidence and qualified review.
-   Treat unresolved critical or high-severity findings as release
    blockers unless an authorised human explicitly records a risk
    decision.

## 5. Premium UI/UX engineering requirements

This is a core product requirement. The platform must feel polished,
coherent, exceptionally responsive, and effortless to use---not like a
generic AI-generated dashboard or template.

### Visual direction

-   Premium minimalist technology design, balanced with universal
    accessibility.
-   Strong typography, clear hierarchy, deliberate spacing, precise
    alignment, and consistent proportions.
-   A restrained, professional colour system with documented design
    tokens.
-   Carefully designed icons and reusable interface components.
-   No arbitrary gradients, decorative glassmorphism, excessive shadows,
    visual clutter, or ornamental animation.
-   Avoid generic SaaS dashboard layouts and superficial visual effects.
-   Every visual element must support comprehension, navigation, trust,
    or task completion.

### Interaction quality

-   Navigation should be predictable and easy to understand.
-   Interactions should feel immediate, consistent, and responsive.
-   Use subtle, purposeful transitions and micro-interactions only where
    they improve feedback or comprehension.
-   Respect `prefers-reduced-motion`.
-   Provide complete loading, empty, error, offline, disabled, success,
    and confirmation states where relevant.
-   No dead buttons, fake controls, misleading affordances, or
    decorative elements that look interactive.
-   Prevent layout shifts and preserve user context during navigation.

### Accessibility and inclusive design

-   Target WCAG 2.2 AA, with automated and manual evaluation.
-   Support keyboard navigation and visible focus.
-   Use semantic structure and accessible names.
-   Support screen readers and appropriate assistive technologies.
-   Maintain readable typography and sufficient contrast.
-   Use touch targets suitable for mobile use.
-   Use plain, understandable language and clear error recovery.
-   Design for people with different levels of digital literacy and
    different device capabilities.

### Performance and responsiveness

-   Optimise for lower-end Android devices as well as modern desktop
    hardware.
-   Keep bundles and dependencies lean.
-   Avoid unnecessary rendering and expensive client-side work.
-   Optimise images and other assets.
-   Test narrow screens, slow networks, and offline or interrupted
    connections where applicable.
-   Measure performance rather than relying on subjective claims that
    the interface is "fast".
-   Do not add animation or visual effects that compromise
    responsiveness, accessibility, or battery life.

### Cross-platform direction

-   The first release may be a responsive, mobile-first PWA.
-   Maintain a reusable design system that can support future Android,
    iOS, tablet, and desktop clients.
-   Do not imply that a PWA is equivalent to a fully native application.
-   Preserve consistency while respecting platform-specific interaction
    conventions.

## 6. Create a documented design system

Create or update the design-system documentation in the project's
existing documentation structure. Do not create duplicate documents if
an appropriate one already exists.

Document:

-   Design principles and intended user experience.
-   Colour palette and semantic colour tokens.
-   Typography families, scale, weights, and usage.
-   Spacing and layout system.
-   Border, radius, and elevation rules.
-   Iconography rules.
-   Component specifications and variants.
-   Interaction, feedback, and motion guidelines.
-   Responsive breakpoints and layout behaviour.
-   Accessibility requirements and validation approach.
-   Loading, empty, error, offline, disabled, and success states.

Use reusable components and consistent tokens. Avoid arbitrary one-off
styling. Do not choose fonts, colours, libraries, or animation packages
without a clear reason.

## 7. Skill governance and precedence

Create a skill inventory document recording:

-   Skill name and purpose.
-   Source repository and exact source location.
-   Version, release, or commit identifier where available.
-   Installation path.
-   Dependencies and scripts.
-   Security inspection status.
-   Known limitations or overlaps.
-   When the skill should be applied.

Resolve conflicting or duplicated guidance. The project's `PROMPT.md`,
`AGENTS.md` (if present), and project-specific security, privacy,
accessibility, and product requirements take precedence over third-party
skill instructions.

Skills are advisory instruction packages, not proof of correctness or
security. Do not give them unrestricted permissions or allow them to
override human approval gates.

Do not add paid services, external APIs, MCP servers, frameworks, global
configuration changes, or new dependencies unless they are genuinely
necessary and explicitly approved.

## 8. Verification

After installation and custom-skill creation:

1.  Confirm each expected skill directory exists.
2.  Confirm each `SKILL.md` has valid, readable metadata and clear
    instructions.
3.  Confirm the custom skills have been created in the correct
    locations.
4.  Confirm the design-system skill is compatible and discoverable, or
    document why it was not installed.
5.  Check for duplicate skills and contradictory instructions.
6.  Use the current documented Antigravity method to verify workspace
    skill discovery.
7.  Do not claim a skill is active merely because its folder exists.
8.  Do not claim successful installation without command output or other
    verifiable evidence.

Produce a concise installation report containing the installed skills,
source/version details, custom skills created, substitutions,
verification evidence, and outstanding issues.

## 9. Strict execution boundary

This task is limited to skill installation, inspection, documentation,
and configuration.

**Do not:**

-   Start application development or modify existing application
    functionality.
-   Replace or redesign the application architecture.
-   Delete, overwrite, or restructure existing project files without
    approval.
-   Install the entire skill catalogue.
-   Install suspicious or unreviewed scripts.
-   Create paid accounts or subscribe to services.
-   Deploy the application or modify production credentials.
-   Access, request, or process real citizen data.
-   Disable security controls or bypass permission prompts.

If an installation requires an unexpected permission, paid service,
global configuration change, destructive operation, or access to
sensitive data, stop and request approval.

## 10. Completion condition

When the installation report is ready, stop. Do not begin M0 or any
application implementation.

Wait for explicit human approval before proceeding.

**Success means a small, verified, relevant, maintainable set of skills
is correctly installed and documented---not the largest possible number
of skills.**
