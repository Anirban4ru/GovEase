# Documentation Index

**Project:** Unified Life Services Platform  
**Purpose:** Central index of all project documentation, status, and responsibilities  
**Owner:** Founder  
**Status:** active (Beta 0.1 Candidate Approved)  
**Last updated:** 2026-11-06

This repository follows the rule: **documentation is part of the Definition of Done**. Every document has a purpose, owner, status, and last-updated date.

---

## Architecture, Security & Governance Documentation

All detailed technical specifications, architecture decisions, and audit reports are strictly organized within the `docs/` hierarchy:

| Document / Section             | Location                                                                                    | Description                                                       | Status            |
| ------------------------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------- |
| **System Threat Model**        | [`docs/architecture/THREAT_MODEL.md`](architecture/THREAT_MODEL.md)                         | STRIDE analysis, trust boundaries, zero-knowledge threat modeling | Approved / Active |
| **Design System**              | [`docs/architecture/DESIGN_SYSTEM.md`](architecture/DESIGN_SYSTEM.md)                       | Design tokens, typography, colors, component specifications       | Approved / Active |
| **Security Control Mapping**   | [`docs/architecture/SECURITY_CONTROL_MAPPING.md`](architecture/SECURITY_CONTROL_MAPPING.md) | OWASP ASVS Level 2 & India DPDP Act 2023 controls mapping         | Approved / Active |
| **Implementation Ledger**      | [`docs/architecture/IMPLEMENTATION_LEDGER.md`](architecture/IMPLEMENTATION_LEDGER.md)       | Milestone deliverables, evidence logs, and verification audits    | Approved / Active |
| **Known Issues & Defect Log**  | [`docs/architecture/KNOWN_ISSUES.md`](architecture/KNOWN_ISSUES.md)                         | Defect tracking and resolution register                           | Active            |
| **Accessibility Audit Report** | [`docs/reports/ACCESSIBILITY.md`](reports/ACCESSIBILITY.md)                                 | Automated Axe + manual WCAG 2.2 Level AA compliance report        | Approved / Active |
| **Quality Assurance Report**   | [`docs/reports/QA_REPORT.md`](reports/QA_REPORT.md)                                         | Vitest (58 tests) & Playwright (60 tests) test run evidence       | Approved / Active |
| **Performance Budget Audit**   | [`docs/reports/PERFORMANCE_REPORT.md`](reports/PERFORMANCE_REPORT.md)                       | Lighthouse scores, JS bundle size budgets, and TTFB               | Approved / Active |
| **Pre-Release Checklist**      | [`docs/reports/RELEASE_CHECKLIST.md`](reports/RELEASE_CHECKLIST.md)                         | Pre-flight production gates and verification sign-offs            | Approved / Active |

---

## Supporting Directories

- [`docs/architecture/`](architecture/) — System architecture specifications, threat model, and design tokens
- [`docs/reports/`](reports/) — Test execution, accessibility, and performance audit reports
- [`docs/decisions/`](decisions/ADR_INDEX.md) — Architecture Decision Records (ADRs 0001 through 0010)
- [`docs/catalogue/`](catalogue/CATALOGUE_GOVERNANCE.md) — Catalogue governance, link health checks, domain allow-list
- [`docs/integrations/`](integrations/AUTHORISATIONS.md) — Official provider endpoints and authorization statuses
- [`docs/security/`](security/SECURITY_FINDINGS.md) — Security findings, penetration tests, and vulnerability tracking
- [`docs/screenshots/`](screenshots/) — Automated visual regression and showcase capture artifacts
- [`docs/HUMAN_ACTIONS.md`](HUMAN_ACTIONS.md) — Human approvals and non-delegable operations register
- [`docs/OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) — Technical and policy decision tracking

---

## Supporting Directories

- [`docs/decisions/`](decisions/ADR_INDEX.md) — Architecture Decision Records (ADRs)
- [`docs/integrations/`](integrations/AUTHORISATIONS.md) — Provider documentation, access status, authorisations
- [`docs/security/`](security/SECURITY_CONTROLS.md) — Controls mapping, findings, and accepted risk decisions
- [`docs/operations/`](operations/AGENT_SETUP.md) — Agent configuration, incident response, monitoring
- [`docs/catalogue/`](catalogue/CATALOGUE_GOVERNANCE.md) — Catalogue governance, link health, domain allow-list
- [`docs/HUMAN_ACTIONS.md`](HUMAN_ACTIONS.md) — Non-delegable human-only actions register
- [`docs/OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) — Outstanding policy and technical questions
