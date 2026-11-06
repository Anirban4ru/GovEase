# Implementation Ledger

**Project:** Unified Life Services Platform  
**Purpose:** Living single-source-of-truth ledger of feature states, acceptance criteria, tests, and linked evidence.  
**Owner:** Engineering Lead / Founder  
**Status:** active (M2 Catalogue Pipeline Completed)  
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
| M0-006  | Unit Test Runner (Vitest)            | `implemented-and-tested` | Fast local testing, zero vulnerability dependencies                                    | `npm test` runs 12 tests in <550ms, exits 0                 | 2026-11-05    |
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

---

## Milestone M2: Catalogue Pipeline & Service Seeding Deliverables

| Item ID | Deliverable / Component                  | State                    | Acceptance Criteria                                                                             | Test & Verification Evidence                                                                | Date Verified |
| ------- | ---------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------- |
| M2-001  | Verified Seed Dataset (6 Services)       | `implemented-and-tested` | 6 services covering all 6 ecosystems, schema-valid, bilingual, verified sources, Class 5        | `catalogue/services/*.json`, `npm run validate:catalogue` (6/6 pass), `test/catalogue.test` | 2026-11-05    |
| M2-002  | Domain Allow-list Expansion              | `implemented-and-tested` | 10 verified official domains registered (`abdm.gov.in`, `pmkisan.gov.in`, `uidai.gov.in`, etc.) | `catalogue/domain-allowlist.json`, schema valid, allow-list test passes                     | 2026-11-05    |
| M2-003  | Automated Link Health Checker            | `implemented-and-tested` | Scans all service URLs, enforces HTTPS & allow-list, generates markdown health report           | `scripts/check-links.mjs`, `docs/catalogue/LINK_HEALTH_REPORT.md` (9/9 URLs verified)       | 2026-11-05    |
| M2-004  | Catalogue Freshness & Staleness Audit    | `implemented-and-tested` | Calculates review due dates, staleness flags, generates living markdown audit report            | `scripts/catalogue-staleness.mjs`, `docs/catalogue/STALENESS_REPORT.md`                     | 2026-11-05    |
| M2-005  | Static Catalogue Snapshot Compiler       | `implemented-and-tested` | Compiles JSON service files into indexed snapshot for client runtime without Node fs            | `scripts/build-catalogue.mjs`, `src/data/catalogue.json`                                    | 2026-11-05    |
| M2-006  | Prerendered Service Detail Pages         | `implemented-and-tested` | Static SSG pages via `generateStaticParams()`, comprehensive metadata, accessible breadcrumbs   | `src/app/services/[id]/page.tsx`, `out/services/` (6 static pages generated)                | 2026-11-05    |
| M2-007  | Outbound Link Safety Modal               | `implemented-and-tested` | Interstitial dialog warning citizen of official portal exit, fraud warnings, `_blank` safely    | `src/components/OutboundHandoffModal.tsx`, WAI-ARIA dialog compliant, Playwright tests pass | 2026-11-05    |
| M2-008  | Explore Ecosystem Category Filtering     | `implemented-and-tested` | Tabbed filtering by 6 ecosystems, instant client updates without page reload                    | `src/app/explore/page.tsx`, Playwright filter tests pass on all 6 viewports                 | 2026-11-05    |
| M2-009  | Local Bookmark & Saved Items             | `implemented-and-tested` | Save/Remove reference using `useSavedServices` and `useSyncExternalStore`, zero tracking        | `src/hooks/useSavedServices.ts`, `src/app/saved/page.tsx`, verified in Playwright suite     | 2026-11-05    |
| M2-010  | Automated Accessibility Audit (axe-core) | `implemented-and-tested` | 0 critical/serious violations across `/explore` and `/services/[id]` across 6 viewports         | Playwright `axe-core` tests passing on all 6 viewports (72/72 total tests pass)             | 2026-11-05    |

---

## Milestone M3: Search & Discovery Engine

| Item ID | Deliverable / Component                        | State                    | Acceptance Criteria                                                                         | Test & Verification Evidence                                                                     | Date Verified |
| ------- | ---------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------- |
| M3-001  | Synonym & Intent Map                           | `implemented-and-tested` | English, Hindi (Devanagari), Hinglish, acronyms, and common typos mapped to service IDs     | `src/lib/search-synonyms.ts`, tested across 114 queries in `test/search-relevance.test.ts`       | 2026-11-05    |
| M3-002  | In-Memory Client Search Engine                 | `implemented-and-tested` | `minisearch` client-side index, field boosting, prefix & fuzzy search, 100% offline, 0 logs | `src/lib/search.ts`, pure function verified, zero telemetry / network requests                   | 2026-11-05    |
| M3-003  | 100+ Query Citizen Relevance Test Set          | `implemented-and-tested` | >= 100 realistic citizen queries covering natural phrasing, transliterations, typos         | `test/search-test-set.json` (114 queries across all 6 seed services)                             | 2026-11-05    |
| M3-004  | Search Relevance Benchmark Suite               | `implemented-and-tested` | >= 95% Top-1 accuracy and 100% Top-3 accuracy on 114 benchmark queries                      | `test/search-relevance.test.ts` (114/114 = 100.0% Top-1 accuracy achieved)                       | 2026-11-05    |
| M3-005  | Accessible SearchBar Component                 | `implemented-and-tested` | WAI-ARIA combobox/listbox, keyboard navigation (Arrow/Enter/Esc), polite live result status | `src/components/SearchBar.tsx`, Playwright interactive & axe-core a11y tests pass                | 2026-11-05    |
| M3-006  | Home Page Hero Search Integration              | `implemented-and-tested` | Prominent search bar in hero section with instant interactive dropdown & navigation         | `src/app/page.tsx`, verified in `e2e/search.spec.ts` across 6 viewports                          | 2026-11-05    |
| M3-007  | Explore Live Search & Empty State              | `implemented-and-tested` | Synchronized query parameter, live filtering with ecosystem tabs, accessible reset state    | `src/app/explore/page.tsx`, verified in `e2e/search.spec.ts` across 6 viewports                  | 2026-11-05    |
| M3-008  | Full E2E & axe-core Search Suite (6 Viewports) | `implemented-and-tested` | Zero regression, all 102 E2E tests pass, zero axe-core critical/serious violations          | `e2e/search.spec.ts`, Playwright exits code 0 (102/102 tests pass across 6 responsive viewports) | 2026-11-05    |

---

## Milestone M4: Saved Items, PWA Offline Shell, Settings & Feedback Flow

| Item ID | Deliverable / Component                     | State                    | Acceptance Criteria                                                                            | Test & Verification Evidence                                                                           | Date Verified |
| ------- | ------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- |
| M4-001  | Saved Items Data Portability (JSON Backup)  | `implemented-and-tested` | Client-side export and validated JSON import (`life-services-backup.json`), 0 network transfer | `src/lib/saved-backup.ts`, `test/saved-portability.test.ts` (6/6 tests pass), verified in E2E spec     | 2026-11-05    |
| M4-002  | Printable Service Checklist View            | `implemented-and-tested` | Clean `@media print` stylesheet with required documents checklist, verified dates, 0 nav junk  | `src/app/saved/page.tsx`, `src/app/globals.css`, Playwright print media emulation test passed          | 2026-11-05    |
| M4-003  | Preferences & Settings Page                 | `implemented-and-tested` | Dedicated `/settings` route for language, presentation modes, and accessibility controls       | `src/app/settings/page.tsx`, Playwright navigation and mode switch verified                            | 2026-11-05    |
| M4-004  | On-Device Data Inventory Table              | `implemented-and-tested` | Transparent DPDP Act disclosure of all localStorage keys, byte sizes, purpose, and 0 cookies   | `src/app/settings/page.tsx`, verified in E2E spec (displays key sizes, 0 cookies verified)             | 2026-11-05    |
| M4-005  | Two-Step Local Data Purge Action            | `implemented-and-tested` | Accessible confirmation modal, complete erasure of localStorage & caches, polite live region   | `src/app/settings/page.tsx`, Playwright confirmation modal & storage wipe tested                       | 2026-11-05    |
| M4-006  | W3C Web App Manifest & App Icons            | `implemented-and-tested` | W3C valid manifest (`manifest.webmanifest`), 192px/512px/maskable SVG icons, standalone mode   | `public/manifest.webmanifest`, `public/icons/`, Playwright manifest validation test passed             | 2026-11-05    |
| M4-007  | Offline Service Worker & Fallback Shell     | `implemented-and-tested` | Cache-first shell strategy, network-first navigation, `/offline` fallback with dated snapshot  | `public/sw.js`, `src/app/offline/page.tsx` (verified date stamp tested in E2E)                         | 2026-11-05    |
| M4-008  | PWA Install Registration Banner             | `implemented-and-tested` | Accessible, non-intrusive `beforeinstallprompt` banner with persistent dismissal preference    | `src/components/PwaRegister.tsx`, clean render, 0 console warnings                                     | 2026-11-05    |
| M4-009  | Anonymous Feedback & Correction Flow        | `implemented-and-tested` | Zero-backend feedback modal in `/help`, pre-filled mailto, and structured issue copy template  | `src/components/FeedbackModal.tsx`, `src/app/help/page.tsx`, tested in Playwright spec                 | 2026-11-05    |
| M4-010  | Client-Side Sensitive Data Anti-Leak Engine | `implemented-and-tested` | Real-time regex detection and blocking of Aadhaar numbers, phone numbers, emails, and cards    | `src/lib/anti-leak-sanitizer.ts`, `test/anti-leak-sanitizer.test.ts` (7/7 tests pass), E2E verified    | 2026-11-05    |
| M4-011  | DPDP Act Privacy Notice Draft               | `implemented-and-tested` | Compliant draft privacy notice labeled `DRAFT - Pending Legal Review`, data inventory detailed | `docs/PRIVACY_NOTICE_DRAFT.md`, `src/app/privacy/page.tsx`, verified on route                          | 2026-11-05    |
| M4-012  | Full Vitest & Playwright E2E Suite          | `implemented-and-tested` | 29/29 Vitest tests pass, 138/138 Playwright tests pass across 6 viewports with 0 a11y errors   | `test/`, `e2e/pwa-saved-settings.spec.ts`, Playwright suite exits code 0 across 6 responsive viewports | 2026-11-05    |

---

## Milestone M5: Interactive Explainer Guides, Plain-Language Checklists & Release Readiness Hardening (Beta 0.1 Candidate)

| Item ID | Deliverable / Component                    | State                    | Acceptance Criteria                                                                            | Test & Verification Evidence                                                                  | Date Verified |
| ------- | ------------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------- |
| M5-001  | Bureaucratic Jargon Glossary Engine        | `implemented-and-tested` | Plain 6th-grade bilingual definitions (eKYC, OTR, DBT, ABHA, PVC, Sarathi) with why-it-matters | `src/lib/jargon-glossary.ts`, `test/jargon-glossary.test.ts` (3/3 tests pass)                 | 2026-11-06    |
| M5-002  | 5-Phase Explainer Guide Data               | `implemented-and-tested` | Sequential walkthroughs for all 6 seed services (prep, portal, data, fees, status tracking)    | `src/lib/service-explainer-data.ts`, `test/explainer-guide.test.ts` (2/2 tests pass)          | 2026-11-06    |
| M5-003  | WAI-ARIA Explainer Guide Stepper Tabs      | `implemented-and-tested` | Roving tabindex, Arrow/Home/End keyboard navigation, pitfall alerts, jargon callouts           | `src/components/ServiceExplainerGuide.tsx`, Playwright tab keyboard & next/prev tests pass    | 2026-11-06    |
| M5-004  | Interactive Document Readiness Checklist   | `implemented-and-tested` | Live percentage progressbar, local persistence via `useSyncExternalStore`, reset button        | `src/components/DocumentReadinessChecklist.tsx`, Playwright checklist persistence test passes | 2026-11-06    |
| M5-005  | Service Detail View M5 Integration         | `implemented-and-tested` | Unified rendering of explainer guide and readiness checklist on all 6 service routes           | `src/components/ServiceDetailView.tsx`, verified across all 6 services in Playwright spec     | 2026-11-06    |
| M5-006  | WCAG 2.2 Level AA Conformance Statement    | `implemented-and-tested` | Full conformance matrix, keyboard testing records, 200%/400% zoom reflow, screen reader audit  | `ACCESSIBILITY.md`, 0 critical/serious axe-core violations across 6 responsive viewports      | 2026-11-06    |
| M5-007  | Automated Performance Budget Verification  | `implemented-and-tested` | Enforces HTML <= 50KB raw, CSS <= 25KB raw, Initial JS <= 220KB gzip, 0 layout shifts          | `scripts/perf-budget.mjs`, `PERFORMANCE_REPORT.md`, `npm run audit:perf` passes with code 0   | 2026-11-06    |
| M5-008  | OWASP ASVS 5.0.0 Level 1 Security Mapping  | `implemented-and-tested` | Full mapping of defensive controls, anti-leak sanitizer, CSP headers, zero data retention      | `SECURITY_CONTROL_MAPPING.md`, verified against `THREAT_MODEL.md` and Hard Rules 1–15         | 2026-11-06    |
| M5-009  | Full Vitest & Playwright E2E Suite (6 VPs) | `implemented-and-tested` | 34/34 Vitest unit tests pass, 180/180 Playwright E2E tests pass across 6 responsive viewports  | `e2e/guides-checklists.spec.ts`, complete test suite passes with code 0                       | 2026-11-06    |

---

## Milestone M5: Interactive Explainer Guides, Plain-Language Checklists & Release Readiness Hardening (Beta 0.1 Candidate)

| Item ID | Deliverable / Component                    | State                    | Acceptance Criteria                                                                            | Test & Verification Evidence                                                                  | Date Verified |
| ------- | ------------------------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------- |
| M5-001  | Bureaucratic Jargon Glossary Engine        | `implemented-and-tested` | Plain 6th-grade bilingual definitions (eKYC, OTR, DBT, ABHA, PVC, Sarathi) with why-it-matters | `src/lib/jargon-glossary.ts`, `test/jargon-glossary.test.ts` (3/3 tests pass)                 | 2026-11-06    |
| M5-002  | 5-Phase Explainer Guide Data               | `implemented-and-tested` | Sequential walkthroughs for all 6 seed services (prep, portal, data, fees, status tracking)    | `src/lib/service-explainer-data.ts`, `test/explainer-guide.test.ts` (2/2 tests pass)          | 2026-11-06    |
| M5-003  | WAI-ARIA Explainer Guide Stepper Tabs      | `implemented-and-tested` | Roving tabindex, Arrow/Home/End keyboard navigation, pitfall alerts, jargon callouts           | `src/components/ServiceExplainerGuide.tsx`, Playwright tab keyboard & next/prev tests pass    | 2026-11-06    |
| M5-004  | Interactive Document Readiness Checklist   | `implemented-and-tested` | Live percentage progressbar, local persistence via `useSyncExternalStore`, reset button        | `src/components/DocumentReadinessChecklist.tsx`, Playwright checklist persistence test passes | 2026-11-06    |
| M5-005  | Service Detail View M5 Integration         | `implemented-and-tested` | Unified rendering of explainer guide and readiness checklist on all 6 service routes           | `src/components/ServiceDetailView.tsx`, verified across all 6 services in Playwright spec     | 2026-11-06    |
| M5-006  | WCAG 2.2 Level AA Conformance Statement    | `implemented-and-tested` | Full conformance matrix, keyboard testing records, 200%/400% zoom reflow, screen reader audit  | `ACCESSIBILITY.md`, 0 critical/serious axe-core violations across 6 responsive viewports      | 2026-11-06    |
| M5-007  | Automated Performance Budget Verification  | `implemented-and-tested` | Enforces HTML <= 50KB raw, CSS <= 25KB raw, Initial JS <= 220KB gzip, 0 layout shifts          | `scripts/perf-budget.mjs`, `PERFORMANCE_REPORT.md`, `npm run audit:perf` passes with code 0   | 2026-11-06    |
| M5-008  | OWASP ASVS 5.0.0 Level 1 Security Mapping  | `implemented-and-tested` | Full mapping of defensive controls, anti-leak sanitizer, CSP headers, zero data retention      | `SECURITY_CONTROL_MAPPING.md`, verified against `THREAT_MODEL.md` and Hard Rules 1–15         | 2026-11-06    |
| M5-009  | Full Vitest & Playwright E2E Suite (6 VPs) | `implemented-and-tested` | 34/34 Vitest unit tests pass, 180/180 Playwright E2E tests pass across 6 responsive viewports  | `e2e/guides-checklists.spec.ts`, complete test suite passes with code 0                       | 2026-11-06    |
