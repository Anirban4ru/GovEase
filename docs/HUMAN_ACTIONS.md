# Human Actions Register

**Project:** Unified Life Services Platform  
**Purpose:** Explicit tracking of tasks and decisions that require human action and cannot be delegated to an AI agent.  
**Owner:** Founder  
**Status:** active (M0 Foundation)  
**Last updated:** 2026-11-05

Per `PROMPT_FINAL.md` Section 15, the AI agent must never perform these actions. They are reserved for the human founder and qualified professionals.

---

| ID     | Action Item                                                               | Required Owner / Authority             | Milestone Trigger   | Status         | Notes                                                      |
| ------ | ------------------------------------------------------------------------- | -------------------------------------- | ------------------- | -------------- | ---------------------------------------------------------- |
| HA-001 | Review and decide on Design ADR-0002 (Colour Palette)                     | Founder                                | M0                  | Pending Review | Proposals: A (Civic Slate), B (Warm Ash), C (Stone & Ink)  |
| HA-002 | Review and decide on Design ADR-0003 (Typography)                         | Founder                                | M0                  | Pending Review | Proposals: 1 (Noto Sans), 2 (Instrument Sans), 3 (DM Sans) |
| HA-003 | Finalise product name, branding, and domain name                          | Founder                                | M0 / M1             | Open           | Must ensure no implication of government endorsement       |
| HA-004 | Review draft privacy notice and terms of service                          | Qualified Legal Professional           | Beta 0.1 Pre-launch | Scheduled      | Mandatory before public release                            |
| HA-005 | Independent web application security review / penetration test            | Qualified Security Professional        | Beta 0.1 Pre-launch | Scheduled      | Cannot be self-certified by agent                          |
| HA-006 | Legal entity or institutional sponsor setup for API provider onboarding   | Founder                                | Post-Beta (R1/R2)   | Future         | Required for DigiLocker / ABDM organisation accounts       |
| HA-007 | Catalogue seed data manual verification (40-80 services)                  | Founder / Human Verifier               | M2                  | Scheduled      | Every entry must have `verified_by: human`                 |
| HA-008 | Fluent human review of Hindi translations                                 | Fluent Hindi Speaker                   | M2 / M5             | Scheduled      | Machine translation must not be published unreviewed       |
| HA-009 | Manual accessibility testing with assistive technologies (NVDA, TalkBack) | Human Tester / Users with Disabilities | M5                  | Scheduled      | Automated axe-core tests are necessary but not sufficient  |
| HA-010 | External hosting account creation and domain registration                 | Founder                                | M5                  | Scheduled      | Zero-cost local dev until explicit decision                |
| HA-011 | Approval of exceptions to Hard Rules or security gates                    | Founder + Security Owner               | As needed           | None Open      | Requires documented compensating controls                  |
