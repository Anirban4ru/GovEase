# Documentation Index

**Project:** Unified Life Services Platform  
**Purpose:** Central index of all project documentation, status, and responsibilities  
**Owner:** Founder  
**Status:** draft (M0 Foundation)  
**Last updated:** 2026-11-05

This repository follows the rule: **documentation is part of the Definition of Done**. Every document has a purpose, owner, status, and last-updated date.

---

## Root Architecture & Governance Documents

| Document                                                              | Purpose                                                      | Status             |
| --------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------ |
| [`PROMPT_FINAL.md`](../PROMPT_FINAL.md)                               | Single source of truth and master instruction file           | Approved / Binding |
| [`AGENTS.md`](../AGENTS.md)                                           | Operational rules and agent instructions (concise)           | Draft              |
| [`README.md`](../README.md)                                           | Public project overview, independence disclaimer, and status | Draft              |
| [`PROJECT_OVERVIEW.md`](../PROJECT_OVERVIEW.md)                       | Strategic context and user problem space                     | Draft              |
| [`PRODUCT_VISION.md`](../PRODUCT_VISION.md)                           | Long-term vision and principles                              | Draft              |
| [`PRD.md`](../PRD.md)                                                 | Product Requirements Document for Beta 0.1                   | Draft              |
| [`REQUIREMENTS.md`](../REQUIREMENTS.md)                               | Detailed functional and non-functional requirements          | Draft              |
| [`ROADMAP.md`](../ROADMAP.md)                                         | Milestone roadmap (M0 to Release 3+)                         | Draft              |
| [`IMPLEMENTATION_PLAN.md`](../IMPLEMENTATION_PLAN.md)                 | Technical implementation sequence                            | Draft              |
| [`ARCHITECTURE.md`](../ARCHITECTURE.md)                               | System and frontend architecture                             | Draft              |
| [`SYSTEM_DESIGN.md`](../SYSTEM_DESIGN.md)                             | Detailed component and data-flow design                      | Draft              |
| [`DATABASE_SCHEMA.md`](../DATABASE_SCHEMA.md)                         | Catalogue data model and future schema plans                 | Draft              |
| [`API_SPECIFICATION.md`](../API_SPECIFICATION.md)                     | API boundaries (adapter contracts and future endpoints)      | Draft              |
| [`AUTHENTICATION.md`](../AUTHENTICATION.md)                           | Auth policy (strictly no accounts in Beta 0.1)               | Draft              |
| [`INTEGRATION_CATALOGUE.md`](../INTEGRATION_CATALOGUE.md)             | Provider integration classifications and research            | Draft              |
| [`SECURITY.md`](../SECURITY.md)                                       | Security policy, vulnerability reporting, and defenses       | Draft              |
| [`THREAT_MODEL.md`](../THREAT_MODEL.md)                               | Threat model v0 (STRIDE, trust boundaries, mitigations)      | Draft              |
| [`PRIVACY_AND_DATA_GOVERNANCE.md`](../PRIVACY_AND_DATA_GOVERNANCE.md) | DPDP compliance, data minimisation, storage rules            | Draft              |
| [`SECURITY_CONTROL_MAPPING.md`](../SECURITY_CONTROL_MAPPING.md)       | ASVS / OWASP control verification matrix                     | Draft              |
| [`UI_UX_GUIDELINES.md`](../UI_UX_GUIDELINES.md)                       | Human interface guidelines and interaction design            | Draft              |
| [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md)                             | Design tokens, typography, colors, component states          | Draft              |
| [`ACCESSIBILITY.md`](../ACCESSIBILITY.md)                             | WCAG 2.2 AA audit log and testing protocols                  | Draft              |
| [`RESPONSIVE_DESIGN.md`](../RESPONSIVE_DESIGN.md)                     | Viewport specifications and mobile-first rules               | Draft              |
| [`TESTING_STRATEGY.md`](../TESTING_STRATEGY.md)                       | Multi-tier test strategy and verification gates              | Draft              |
| [`QA_REPORT.md`](../QA_REPORT.md)                                     | Test execution logs and verification evidence                | Draft              |
| [`PERFORMANCE_REPORT.md`](../PERFORMANCE_REPORT.md)                   | Performance budgets and Lighthouse results                   | Draft              |
| [`DEPLOYMENT.md`](../DEPLOYMENT.md)                                   | Hosting evaluation and production cost estimates             | Draft              |
| [`DISASTER_RECOVERY.md`](../DISASTER_RECOVERY.md)                     | Backup, restore, and business continuity                     | Draft              |
| [`CONTRIBUTING.md`](../CONTRIBUTING.md)                               | Contribution standards and code hygiene guidelines           | Draft              |
| [`CHANGELOG.md`](../CHANGELOG.md)                                     | Public changelog of releases and catalogue corrections       | Draft              |
| [`IMPLEMENTATION_LEDGER.md`](../IMPLEMENTATION_LEDGER.md)             | Feature-state ledger and verification evidence               | Draft              |
| [`KNOWN_ISSUES.md`](../KNOWN_ISSUES.md)                               | Defect register with reproduction steps and resolution       | Draft              |
| [`RELEASE_CHECKLIST.md`](../RELEASE_CHECKLIST.md)                     | Pre-release gate verification checklist                      | Draft              |

---

## Supporting Directories

- [`docs/decisions/`](decisions/ADR_INDEX.md) — Architecture Decision Records (ADRs)
- [`docs/integrations/`](integrations/AUTHORISATIONS.md) — Provider documentation, access status, authorisations
- [`docs/security/`](security/SECURITY_CONTROLS.md) — Controls mapping, findings, and accepted risk decisions
- [`docs/operations/`](operations/AGENT_SETUP.md) — Agent configuration, incident response, monitoring
- [`docs/catalogue/`](catalogue/CATALOGUE_GOVERNANCE.md) — Catalogue governance, link health, domain allow-list
- [`docs/HUMAN_ACTIONS.md`](HUMAN_ACTIONS.md) — Non-delegable human-only actions register
- [`docs/OPEN_QUESTIONS.md`](OPEN_QUESTIONS.md) — Outstanding policy and technical questions
