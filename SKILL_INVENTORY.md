# Skill Inventory

**Project:** Unified Life Services Platform  
**Purpose:** Records all installed agent skills, their sources, inspection status, and governance rules.  
**Owner:** Founder  
**Status:** draft  
**Last updated:** 2026-11-05  

> [!IMPORTANT]
> Skills are **advisory instruction packages** — not proof of correctness or security. They do not override project Hard Rules, human approval gates, or the precedence hierarchy in PROMPT_FINAL.md. If a skill instruction conflicts with PROMPT_FINAL.md, project-specific security/privacy/accessibility requirements, or an explicit human instruction, the project requirement wins.

---

## Precedence hierarchy

1. Explicit human instruction in the current session (except no instruction waives Hard Rules)
2. PROMPT_FINAL.md Hard Rules (Section 2) — override everything
3. PROMPT_FINAL.md (all other sections)
4. AGENTS.md (once created)
5. Project-specific custom skills (this workspace)
6. Third-party installed skills
7. Third-party design-system skill (`ui-design-system`)

---

## Installed skills from `rmyndharis/antigravity-skills`

**Source:** `https://github.com/rmyndharis/antigravity-skills`  
**Installer:** `@rmyndharis/antigravity-skills` via `npx`  
**Install path:** `.agent/skills/`  
**Installer version:** latest (as of 2026-11-05) — resolved to npm package current on that date  
**Installation method:** `npx @rmyndharis/antigravity-skills@latest install <skill-name>`  
**Verified available:** Yes — confirmed via `npx @rmyndharis/antigravity-skills list` before installation  

| # | Skill name | Purpose | When to apply | Installation evidence | Security inspection | Known limitations |
|---|-----------|---------|---------------|----------------------|--------------------|--------------------|
| 1 | `nextjs-app-router-patterns` | Next.js App Router conventions, routing, layouts, server components | Any Next.js App Router work in M1+ | ✔ Installed (output confirmed) | SKILL.md only; no install scripts | Technology choice is pending ADR — only relevant if Next.js is confirmed |
| 2 | `typescript-pro` | TypeScript strict-mode patterns, type safety, generics | All TypeScript development | ✔ Installed | SKILL.md only | General patterns; project-specific strict settings take precedence |
| 3 | `security-auditor` | Security code review, OWASP patterns, vulnerability identification | Every code review pass, pre-PR review, milestone gates | ✔ Installed | SKILL.md only | Advisory only; independent penetration test required before sensitive production use |
| 4 | `threat-modeling-expert` | Threat model creation and updating using STRIDE or similar | M0 threat model creation; every milestone update to THREAT_MODEL.md | ✔ Installed | SKILL.md only | Findings require human review; never downgrade a finding to pass a gate |
| 5 | `accessibility-compliance-accessibility-audit` | Accessibility audit workflow, WCAG 2.2 patterns | Every milestone accessibility check; before any public release | ✔ Installed | SKILL.md only | Automated checks only; manual testing with real assistive technologies is a human action |
| 6 | `wcag-audit-patterns` | WCAG 2.2 success criteria implementation patterns | Implementation of accessible components and content | ✔ Installed | SKILL.md only | Overlaps with #5; use #5 for auditing, #6 for implementation guidance |
| 7 | `e2e-testing-patterns` | End-to-end testing with Playwright or equivalent | Writing and maintaining E2E tests for all core journeys in Section 4.2 | ✔ Installed | SKILL.md only | Framework choice pending ADR |
| 8 | `codebase-cleanup-deps-audit` | Dependency audit, unused code detection, dead code removal | Every milestone clean-code gate (Section 14.1A); before releases | ✔ Installed | SKILL.md only | `npm audit` output still requires human review for risk decisions |
| 9 | `ui-ux-designer` | UX design process, user journey design, information architecture | Design phase of each feature; navigation and IA decisions | ✔ Installed | SKILL.md only | General patterns; project design system (DESIGN_SYSTEM.md) takes precedence |
| 10 | `ui-visual-validator` | Visual design validation, layout and spacing review | After each UI implementation; before milestone sign-off | ✔ Installed | SKILL.md only | Cannot replace browser-based viewport testing with screenshots |

---

## Design-system skill from `lcanady/ui-skill`

**Source:** `https://github.com/lcanady/ui-skill`  
**Published as:** `@lhi/ui-skill` on npm  
**Version installed:** 2.1.2  
**Install path:** `.agent/skills/ui-design-system/`  
**Installation method:** `npm pack @lhi/ui-skill` → extracted → copied `skills/ui/` only  
**Sub-skill installed:** `ui` only. `ui-material` was **not** installed.  

**Reason `ui-material` was excluded:** The project uses a custom design system (documented in
`DESIGN_SYSTEM.md`) and does not adopt Material Design 3 as its design language. Installing
`ui-material` would create conflicting guidance on colour, shape, elevation, and motion rules.

**Overlap analysis:**

| Skill | Scope | Overlap with `ui-design-system` |
|-------|-------|--------------------------------|
| `ui-ux-designer` | UX design process, user research, information architecture | Minimal overlap — complementary. `ui-ux-designer` governs the design process; `ui-design-system` enforces token-based implementation standards. |
| `ui-visual-validator` | Visual design review and validation | Small overlap in visual fidelity checks. Use `ui-visual-validator` for review pass; `ui-design-system` for implementation constraints. |

**Recommendation:** Keep all three. Use `ui-ux-designer` for design decisions, `ui-design-system`
for token and component implementation standards, and `ui-visual-validator` for post-implementation
visual review. If conflicts arise between `ui-design-system` reference files and the project's
`DESIGN_SYSTEM.md`, the project document wins.

| Skill name | Purpose | When to apply | Security inspection |
|-----------|---------|---------------|---------------------|
| `ui-design-system` | Design token enforcement, component patterns, motion guidelines, visual fidelity rules, pre-flight design checks | Whenever building or reviewing UI components; before writing component CSS/styling | SKILL.md and reference files reviewed; no executable scripts; source is an npm package. The `references/material-design.md` file is present but not applicable to this project. |

---

## Custom project skills (created 2026-11-05)

**Source:** Created for this project. Not from any external repository.  
**Install path:** `.agent/skills/<skill-name>/SKILL.md`  

| Skill name | Purpose | When to apply |
|-----------|---------|---------------|
| `government-service-verification` | Verify government service URLs, descriptions, eligibility, and fees against official sources; record verification metadata; prevent publication of unverified or invented information | Before any catalogue entry is set to `status: active`; before any service description, fee, or eligibility statement is written or updated; before any outbound link is added |
| `privacy-first-development` | Apply data minimisation, privacy-by-design, and India DPDP Act 2023 principles; prevent sensitive data collection, logging, or transmission; review third-party dependencies for data exposure | Before adding any new data flow, collection point, third-party SDK, or analytics tool; during every code review; at every milestone privacy check |
| `production-quality-gate` | Enforce the definition of done: tests run and pass, accessibility and security checks pass, documentation updated, evidence linked, no debug artifacts in production, no unreviewed dead code | Before marking any task complete; at every milestone gate; before any release |

---

## Duplicate and conflict check

| Potential conflict | Assessment | Resolution |
|--------------------|------------|------------|
| `accessibility-compliance-accessibility-audit` vs `wcag-audit-patterns` | Complementary, not duplicates. Audit skill = review workflow. WCAG patterns skill = implementation guidance. | Use audit skill for reviewing/checking; WCAG patterns for implementing. |
| `ui-ux-designer` vs `ui-design-system` vs `ui-visual-validator` | Complementary. Different phases: design → implement → validate. | No conflict. Use in sequence. |
| `security-auditor` vs `production-quality-gate` (security section) | The quality gate calls for security checks; `security-auditor` provides the detailed patterns. | Use `security-auditor` for detailed review; quality gate for the go/no-go decision. |
| `government-service-verification` vs any third-party skill | Custom skill has higher precedence than any third-party skill per the hierarchy above. | Custom skill governs. |
| `privacy-first-development` vs any third-party skill | Same — custom skill has higher precedence. | Custom skill governs. |

No duplicate installations found. No contradictory instructions for the same situation were identified.

---

## Skills not installed (and why)

| Skill considered | Decision | Reason |
|-----------------|----------|--------|
| `antigravity-skills-manager` | Not installed | Management tool; would add complexity without direct value at this stage |
| All other skills in the 300+ catalogue | Not installed | The prompt explicitly prohibits installing the entire skill catalogue or unrelated tools |
| `ui-material` (from `@lhi/ui-skill`) | Not installed | Project uses a custom design system; Material Design 3 would conflict |

---

## Verification evidence

### Skill directory listing (confirmed 2026-11-05)

```
.agent/skills/
├── accessibility-compliance-accessibility-audit/
│   └── SKILL.md
├── codebase-cleanup-deps-audit/
│   └── SKILL.md
├── e2e-testing-patterns/
│   └── SKILL.md
├── government-service-verification/       ← custom
│   └── SKILL.md
├── nextjs-app-router-patterns/
│   └── SKILL.md
├── privacy-first-development/             ← custom
│   └── SKILL.md
├── production-quality-gate/               ← custom
│   └── SKILL.md
├── security-auditor/
│   └── SKILL.md
├── threat-modeling-expert/
│   └── SKILL.md
├── typescript-pro/
│   └── SKILL.md
├── ui-design-system/                      ← from lcanady/ui-skill v2.1.2
│   ├── examples/
│   │   └── audit-example.md
│   ├── references/
│   │   ├── component-patterns.md
│   │   ├── design-tokens.md
│   │   ├── material-design.md
│   │   ├── motion-patterns.md
│   │   ├── self-review-rubric.md
│   │   ├── visual-fidelity.md
│   │   └── presets/
│   │       ├── next-shadcn.md
│   │       ├── next-tailwind.md
│   │       ├── nuxt-unocss.md
│   │       ├── sveltekit-tailwind.md
│   │       └── vite-react-tailwind.md
│   └── SKILL.md
├── ui-ux-designer/
│   └── SKILL.md
├── ui-visual-validator/
│   └── SKILL.md
└── wcag-audit-patterns/
    └── SKILL.md
```

### Installation commands and exit codes

| Skill | Command | Exit code |
|-------|---------|-----------|
| `nextjs-app-router-patterns` | `npx @rmyndharis/antigravity-skills@latest install nextjs-app-router-patterns` | 0 ✔ |
| `typescript-pro` | `npx @rmyndharis/antigravity-skills@latest install typescript-pro` | 0 ✔ |
| `security-auditor` | `npx @rmyndharis/antigravity-skills@latest install security-auditor` | 0 ✔ |
| `threat-modeling-expert` | `npx @rmyndharis/antigravity-skills@latest install threat-modeling-expert` | 0 ✔ |
| `accessibility-compliance-accessibility-audit` | `npx @rmyndharis/antigravity-skills@latest install accessibility-compliance-accessibility-audit` | 0 ✔ |
| `wcag-audit-patterns` | `npx @rmyndharis/antigravity-skills@latest install wcag-audit-patterns` | 0 ✔ |
| `e2e-testing-patterns` | `npx @rmyndharis/antigravity-skills@latest install e2e-testing-patterns` | 0 ✔ |
| `codebase-cleanup-deps-audit` | `npx @rmyndharis/antigravity-skills@latest install codebase-cleanup-deps-audit` | 0 ✔ |
| `ui-ux-designer` | `npx @rmyndharis/antigravity-skills@latest install ui-ux-designer` | 0 ✔ |
| `ui-visual-validator` | `npx @rmyndharis/antigravity-skills@latest install ui-visual-validator` | 0 ✔ |
| `ui-design-system` | `npm pack @lhi/ui-skill` → extract → copy `skills/ui/` to `.agent/skills/ui-design-system/` | 0 ✔ |
| `government-service-verification` | Created in-session | ✔ |
| `privacy-first-development` | Created in-session | ✔ |
| `production-quality-gate` | Created in-session | ✔ |

---

## Outstanding issues

| # | Issue | Severity | Action required |
|---|-------|----------|----------------|
| 1 | `rmyndharis/antigravity-skills` installer uses `.agent/skills/` path, not `.agents/skills/` as specified in the installation prompt. Both may be valid discovery paths depending on the Antigravity version — verify which path the installed version reads. | Medium | **[VERIFY]** Confirm the correct discovery path for the installed Antigravity version. Record in `docs/operations/AGENT_SETUP.md`. If `.agent/` is not read by default, move or symlink the directory. |
| 2 | Skill version/commit identifiers for skills from `rmyndharis/antigravity-skills` are not available from the CLI output — the installer reports only the skill name. | Low | Pin the npm package version (`@rmyndharis/antigravity-skills@<version>`) in future installs and record the resolved package version in this document. |
| 3 | Custom skills and `DESIGN_SYSTEM.md` are marked `status: draft`. They require human review before first production use. | High | Human to review all three custom skills and DESIGN_SYSTEM.md. Record approval in this document and in `RELEASE_CHECKLIST.md`. |
| 4 | DESIGN_SYSTEM.md contains many `[PENDING]` values (colours, typography, fonts) — these require human decisions and ADRs before M1 begins. | High | Human to decide on font selection and colour palette before M1. Agent to write ADRs for each. |

---

*End of skill inventory. Installation task complete. Waiting for human review and approval before proceeding to M0.*

