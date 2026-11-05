# Implementation Ledger

**Project:** Unified Life Services Platform  
**Purpose:** Living single-source-of-truth ledger of feature states, acceptance criteria, tests, and linked evidence.  
**Owner:** Engineering Lead / Founder  
**Status:** active (M1 App Shell Completed)  
**Last updated:** 2026-11-05

Per `PROMPT_FINAL.md` Section 5.3 and 14.3:  
A feature or milestone deliverable is **never** marked `implemented-and-tested` without explicit, linked evidence in this ledger.

---

## Permitted Feature States

- `implemented-and-tested` (criteria met, automated tests pass, evidence attached)
- `implemented-not-fully-verified` (code written, verification in progress)
- `sandbox-only` (integrated with simulated/sandbox provider only)
- `official-link-only` (directs user to official portal with interstitial notice)
- `awaiting-approval` (blocked on human gate or provider partnership)
- `planned` (scheduled on milestone roadmap)
- `blocked` (halted due to dependency or technical limitation)

---

## Milestone M0: Foundation Deliverables

| Item ID | Deliverable / Component              | State                    | Acceptance Criteria                                                                    | Test & Verification Evidence                                | Date Verified |
| ------- | ------------------------------------ | ------------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------- |
| M0-001  | Git Repository & Branching           | `implemented-and-tested` | Git repo initialized, `.gitignore` excludes secrets, build artifacts, and node_modules | Initial commit `407e400`, git status clean                  | 2026-11-05    |
| M0-002  | `AGENTS.md` Operating Rules          | `implemented-and-tested` | <=150 lines, verbatim Hard Rules 1-15, Loop §14, Checkpoints §15, doc rules            | File length 62 lines, verified compliant with §0.2          | 2026-11-05    |
| M0-003  | Project Scaffold & Next.js 16        | `implemented-and-tested` | Empty App Router template, TypeScript strict, Next.js static export build clean        | `npm run build` exits 0 (static export generated in `out/`) | 2026-11-05    |
| M0-004  | TypeScript Strict Configuration      | `implemented-and-tested` | `strict: true`, noUncheckedIndexedAccess, 0 compiler errors                            | `npm run type-check` exits 0                                | 2026-11-05    |
| M0-005  | Code Hygiene (ESLint & Prettier)     | `implemented-and-tested` | ESLint and Prettier configs active, zero errors                                        | `npm run lint` & `npm run format:check` exit 0              | 2026-11-05    |
| M0-006  | Unit Test Runner (Vitest)            | `implemented-and-tested` | Fast local testing, zero vulnerability dependencies                                    | `npm test` runs 7 tests in <500ms, exits 0                  | 2026-11-05    |
| M0-007  | Catalogue Schema Validation Pipeline | `implemented-and-tested` | JSON Schema for services and domain allowlists, schema validator script                | `npm run validate:catalogue` exits 0                        | 2026-11-05    |
| M0-008  | Security & Vulnerability Audit       | `implemented-and-tested` | Zero high/critical vulnerabilities in npm dependency tree                              | `npm run audit:ci` reports 0 vulnerabilities                | 2026-11-05    |
| M0-009  | CI Workflow (GitHub Actions)         | `implemented-and-tested` | Lint, typecheck, unit test, schema validation, build                                   | `.github/workflows/ci.yml` defined and validated            | 2026-11-05    |
| M0-010  | Documentation Skeleton & Index       | `implemented-and-tested` | Docs directory, indexes, registers, threat model v0                                    | `docs/README.md`, `THREAT_MODEL.md` created                 | 2026-11-05    |
| M0-011  | Architecture Decision Records (ADRs) | `implemented-and-tested` | ADR-0001 through ADR-0008 recorded with trade-offs                                     | `docs/decisions/` populated                                 | 2026-11-05    |
| M0-012  | Design Tokens (`tokens.css`)         | `implemented-and-tested` | Design tokens for palette and typography in CSS                                        | Civic Slate & Noto Sans; tested via `tokens.css` test       | 2026-11-05    |

---

## Milestone M1: App Shell Deliverables

| Item ID | Deliverable / Component                   | State                    | Acceptance Criteria                                                                                    | Test & Verification Evidence                                                                     | Date Verified |
| ------- | ----------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------- |
| M1-001  | Design System & CSS Foundation            | `implemented-and-tested` | Civic Slate token system, CSS resets, 44px touch targets, 3px visible focus rings, zero cyberpunk/vibe | `src/styles/tokens.css`, `src/app/globals.css`, axe-core zero focus/contrast violations          | 2026-11-05    |
| M1-002  | Internationalisation (i18n) Engine        | `implemented-and-tested` | EN/HI dictionaries, sync external store, dynamic `html[lang]`, context preservation                    | `test/app-shell.test.ts` (key parity test), Playwright i18n switch test (passed all 6 viewports) | 2026-11-05    |
| M1-003  | Presentation Mode Switching               | `implemented-and-tested` | Standard, Simple, Assisted modes; persisted in localStorage, updates `body[data-mode]`                 | Playwright mode test (passed all 6 viewports), WCAG 2.5.3 compliant button labels                | 2026-11-05    |
| M1-004  | Semantic Navigation & App Shell           | `implemented-and-tested` | Skip-to-content link, semantic `<header>`, `<nav>`, `<main id="main-content">`, `<footer>`             | Playwright semantic landmark test, axe-core passes with 0 violations                             | 2026-11-05    |
| M1-005  | Responsive Layout (320px to 1440px)       | `implemented-and-tested` | Zero horizontal scroll overflow across 320px, 360px, 390px, 768px, 1024px, 1440px                      | Playwright viewport tests passed (42/42 tests), screenshots saved in `e2e/screenshots/`          | 2026-11-05    |
| M1-006  | Primary Route Shells                      | `implemented-and-tested` | `/` (Home), `/explore`, `/saved`, `/help`, `/privacy`, custom 404 (`not-found`), error boundary        | Next.js static build outputs 7 static HTML pages, Playwright route navigation tests pass         | 2026-11-05    |
| M1-007  | Offline Resilience & Status Banner        | `implemented-and-tested` | Auto-detects offline state with `useSyncExternalStore`, polite aria-live status banner                 | `src/components/OfflineBanner.tsx`, 0 React 19 linter warnings, unit tested                      | 2026-11-05    |
| M1-008  | Security Headers & Static Server          | `implemented-and-tested` | CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, zero external deps       | `public/_headers`, `scripts/static-server.mjs`, Playwright header tests pass on all runs         | 2026-11-05    |
| M1-009  | Privacy Control: Clear Stored Preferences | `implemented-and-tested` | "Clear My Stored Preferences" button in footer, completely resets localStorage                         | `src/components/Footer.tsx`, verified in browser and E2E specs                                   | 2026-11-05    |
| M1-010  | Automated Accessibility Audit (axe-core)  | `implemented-and-tested` | Zero critical or serious WCAG 2.2 AA violations detected by axe-core engine                            | Playwright `axe-core` runner passes on all 6 viewports with 0 violations                         | 2026-11-05    |
