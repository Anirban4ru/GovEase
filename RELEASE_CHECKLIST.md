# Release Checklist

**Project:** Unified Life Services Platform  
**Purpose:** Pre-release verification gates for milestone releases (M0 Foundation to Release 3+)  
**Owner:** Founder  
**Status:** active (M5 Explainer Guides & Beta 0.1 Candidate Approved)  
**Last updated:** 2026-11-06

Per `PROMPT_FINAL.md` Section 18: A release gate failure **blocks release** unless explicitly deferred with a written, dated justification signed by the human founder.

---

## Milestone M0: Foundation Sign-Off Gate

| Gate Check             | Requirement                                            | Evidence Required                       | Verification Status                    |
| ---------------------- | ------------------------------------------------------ | --------------------------------------- | -------------------------------------- |
| Toolchain & Repo       | Git initialized, `.gitignore`, `.env.example` in place | Git commit history                      | ✅ Passed (commit `407e400`)           |
| Strict Typing          | TypeScript strict mode, 0 compile errors               | `npm run type-check` output             | ✅ Passed (0 errors)                   |
| Code Hygiene           | ESLint and Prettier passing with 0 warnings            | `npm run lint` & `npm run format:check` | ✅ Passed (0 errors)                   |
| Unit Tests             | Vitest passing schema verification tests               | `npm test` test run output              | ✅ Passed (7 tests passed)             |
| Catalogue Integrity    | JSON Schema validation of services and allowlists      | `npm run validate:catalogue` output     | ✅ Passed (0 errors)                   |
| Security Baseline      | npm audit reports zero high/critical vulnerabilities   | `npm run audit:ci` output               | ✅ Passed (0 vulnerabilities)          |
| Threat Model v0        | Assets, actors, STRIDE analysis, trust boundaries      | `THREAT_MODEL.md`                       | ✅ Passed                              |
| Agent Guidelines       | AGENTS.md <=150 lines, verbatim hard rules             | `AGENTS.md` (62 lines)                  | ✅ Passed                              |
| CI Pipeline            | GitHub Actions workflow config in place                | `.github/workflows/ci.yml`              | ✅ Passed                              |
| Architecture Decisions | ADR-0001 through ADR-0008 documented                   | `docs/decisions/`                       | ✅ Passed                              |
| Design System Tokens   | Colour palette and typography approved                 | Human approval of ADR-0002/3            | ✅ Approved (Civic Slate & Noto Sans)  |
| Human Sign-off         | Formal human approval of M0 deliverable                | Conversation decision                   | ✅ Approved by Founder ("M0 APPROVED") |

---

## Milestone M1: App Shell Sign-Off Gate

| Gate Check               | Requirement                                                | Evidence Required                       | Verification Status                                                |
| ------------------------ | ---------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Zero Vibe Coding         | Clean civic design, no cyberpunk, neon, or flash           | Design token audit, visual screenshots  | ✅ Passed (Civic Slate tokens in `src/styles/tokens.css`)          |
| Responsive Viewports     | 320px, 360px, 390px, 768px, 1024px, 1440px zero overflow   | Playwright responsive tests             | ✅ Passed (42/42 tests pass; screenshots in `e2e/screenshots/`)    |
| WCAG 2.2 AA Contrast     | Dark text on light background >= 4.5:1, brand navy >= 7:1  | Color token spec & axe-core audit       | ✅ Passed (`#1D4E8F` 7.8:1, `#161C28` 18.6:1, `#434c59` 5.2:1)     |
| WCAG 2.2 Accessibility   | Semantic landmarks, visible 3px focus rings, skip-to-link  | Axe-core automated E2E audit            | ✅ Passed (0 critical/serious violations across all viewports)     |
| Bilingual i18n Engine    | English + Hindi parity, dynamic `html[lang]`               | Parity unit tests & E2E switch test     | ✅ Passed (`test/app-shell.test.ts`, all keys match)               |
| Presentation Modes       | Standard, Simple, Assisted mode switching and persistence  | Playwright mode test                    | ✅ Passed (`data-mode` set on body, persisted in localStorage)     |
| Offline Handling         | Automatic detection and polite `role="status"` banner      | `OfflineBanner.tsx` component & tests   | ✅ Passed (`useSyncExternalStore` with window online/offline)      |
| Production Headers & CSP | `nosniff`, `DENY` framing, strict CSP, referrer-policy     | `public/_headers`, static server checks | ✅ Passed (Verified in `scripts/static-server.mjs` and Playwright) |
| Data Minimisation        | Zero server-side tracking, "Clear Stored Preferences"      | Footer action and privacy policy page   | ✅ Passed (`src/app/privacy/page.tsx`, local-only storage)         |
| Build Integrity          | Static export with zero errors                             | `npm run build` output                  | ✅ Passed (Static export generates 7 static HTML pages in `out/`)  |
| Dependency Hygiene       | Zero high or critical audit vulnerabilities                | `npm run audit:ci`                      | ✅ Passed (0 vulnerabilities found)                                |
| Human Review & Approval  | Founder review of M1 App Shell deliverable and screenshots | Conversation decision                   | ✅ Approved by Founder ("Go ahead")                                |

---

## Milestone M2: Catalogue Pipeline & Service Seeding Sign-Off Gate

| Gate Check                | Requirement                                                     | Evidence Required                            | Verification Status                                                |
| ------------------------- | --------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| Seed Dataset Coverage     | 6 high-value services across all 6 ecosystems                   | `catalogue/services/*.json`                  | ✅ Passed (6 services valid, bilingual, Grade 6-8 plain language)  |
| Schema Strictness         | JSON Schema validation passes for all services & allow-list     | `npm run validate:catalogue` output          | ✅ Passed (6/6 services conform to schema)                         |
| Domain Allow-list         | All URLs strictly allow-listed, HTTPS only, 10 official domains | `catalogue/domain-allowlist.json`            | ✅ Passed (`test/catalogue.test.ts`, all URLs allow-listed)        |
| Automated Link Health     | Link checker script validates syntax, status, and protocols     | `npm run check:links:offline`                | ✅ Passed (9/9 URLs verified in `LINK_HEALTH_REPORT.md`)           |
| Staleness & Review Audit  | Living freshness report calculating days until review due       | `npm run report:staleness`                   | ✅ Passed (`docs/catalogue/STALENESS_REPORT.md`, 0 overdue)        |
| Static Prerendering (SSG) | Service detail pages prerendered statically at build time       | Next.js static build in `out/services/`      | ✅ Passed (6 static HTML detail directories generated)             |
| Outbound Link Safety      | Accessible handoff modal warning of external exit & fraud risks | `OutboundHandoffModal.tsx` & E2E tests       | ✅ Passed (WAI-ARIA dialog compliant, `rel="noopener noreferrer"`) |
| Local Bookmark Privacy    | Save/remove toggle persisted in localStorage without server API | `useSavedServices.ts` hook & E2E spec        | ✅ Passed (`/saved` route verified without network traffic)        |
| WCAG 2.2 AA (axe-core)    | 0 critical or serious violations on catalogue screens           | Automated Playwright `axe-core` tests        | ✅ Passed (0 violations across all 6 viewports; 72/72 tests pass)  |
| Code & Type Hygiene       | ESLint 0 errors/warnings, TypeScript 0 errors, Prettier clean   | `npm run lint`, `type-check`, `format:check` | ✅ Passed (0 errors, 0 warnings across entire codebase)            |
| Human Review & Approval   | Founder review of M2 Catalogue deliverable                      | Conversation approval                        | ✅ Approved by Founder ("proceed")                                 |

---

## Milestone M3: Search & Discovery Engine Sign-Off Gate

| Gate Check                 | Requirement                                                         | Evidence Required                              | Verification Status                                                |
| -------------------------- | ------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| In-Memory Engine & Privacy | Client-side search via `minisearch`, 0 network requests, 0 logging  | `src/lib/search.ts`                            | ✅ Passed (Pure function, 100% offline, zero citizen telemetry)    |
| Synonym & Intent Mapping   | English, Hindi (Devanagari), Hinglish, acronyms, and common typos   | `src/lib/search-synonyms.ts`                   | ✅ Passed (Comprehensive mapping across 6 ecosystems)              |
| Benchmark Test Set         | >= 100 realistic citizen queries with expected service IDs          | `test/search-test-set.json`                    | ✅ Passed (114 queries covering natural language, typos, Hinglish) |
| Relevance Threshold        | >= 95% Top-1 accuracy and 100% Top-3 accuracy on 114 queries        | `test/search-relevance.test.ts` output         | ✅ Passed (114/114 = 100.0% Top-1, 100.0% Top-3 accuracy)          |
| Accessible Combobox UI     | WAI-ARIA combobox/listbox, polite live status, keyboard navigation  | `src/components/SearchBar.tsx`                 | ✅ Passed (ArrowDown/Up, Enter, Esc, polite aria-live status)      |
| Route Integrations         | Hero search on Home (`/`), synchronized live filtering on Explore   | `src/app/page.tsx`, `src/app/explore/page.tsx` | ✅ Passed (Explore handles query params, tabs, reset state)        |
| Full E2E & axe-core Suite  | All 102 Playwright tests pass across 6 viewports with 0 a11y errors | Playwright test report                         | ✅ Passed (102/102 tests pass, 0 critical/serious axe violations)  |
| Code & Type Hygiene        | ESLint 0 errors/warnings, TypeScript 0 errors, Prettier clean       | `npm run lint`, `type-check`, `format:check`   | ✅ Passed (0 errors, 0 warnings across entire codebase)            |
| Human Review & Approval    | Founder review of M3 Search Engine deliverable                      | Conversation approval                          | ✅ Approved by Founder ("go ahead")                                |

---

## Milestone M4: Saved Items, PWA Offline Shell, Settings & Feedback Flow Sign-Off Gate

| Gate Check                 | Requirement                                                        | Evidence Required                            | Verification Status                                                |
| -------------------------- | ------------------------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------ |
| Saved Items Portability    | Client-side export & schema-validated import (`.json`), zero leak  | `src/lib/saved-backup.ts`, Vitest unit test  | ✅ Passed (6/6 unit tests pass, tested in Playwright E2E)          |
| Printable Checklist View   | High-contrast `@media print` layout with document checklist, 0 nav | `src/app/saved/page.tsx`, print stylesheet   | ✅ Passed (Emulated print media test passes across all viewports)  |
| Transparent Data Inventory | Discloses all `localStorage` keys, byte sizes, purpose, 0 cookies  | `src/app/settings/page.tsx` & E2E spec       | ✅ Passed (Table renders live keys, 0 cookies detected)            |
| Complete Local Data Purge  | Two-step confirmation modal permanently clearing storage & caches  | `src/app/settings/page.tsx` & E2E spec       | ✅ Passed (Modal dialog conforms to WAI-ARIA, full purge verified) |
| Web App Manifest           | W3C valid manifest (`manifest.webmanifest`), 192px/512px SVG icons | `public/manifest.webmanifest`, API response  | ✅ Passed (200 OK, conforms to standalone spec with icons)         |
| Offline Service Worker     | Cache-first static shell, network-first nav, `/offline` fallback   | `public/sw.js`, `src/app/offline/page.tsx`   | ✅ Passed (Offline dated snapshot verified per §252)               |
| Anonymous Feedback Flow    | Zero-backend feedback modal in `/help`, pre-filled mailto & copy   | `src/components/FeedbackModal.tsx` & E2E     | ✅ Passed (Modal dialog verified with mailto & copy templates)     |
| Sensitive Data Anti-Leak   | Client regex scanning detects & blocks Aadhaar, phone, email leaks | `src/lib/anti-leak-sanitizer.ts`, unit tests | ✅ Passed (7/7 sanitizer unit tests pass, blocks leaks in E2E)     |
| Privacy Notice Draft       | Compliant notice labeled `DRAFT - Pending Legal Review`            | `docs/PRIVACY_NOTICE_DRAFT.md`, `/privacy`   | ✅ Passed (Draft label visible, on-device inventory detailed)      |
| Code & Type Hygiene        | ESLint 0 errors/warnings, TypeScript 0 errors, Prettier clean      | `npm run lint`, `type-check`, `format:check` | ✅ Passed (0 errors, 0 warnings across entire codebase)            |
| Full E2E & axe-core Suite  | 138/138 tests pass across 6 viewports with 0 critical/serious a11y | Playwright test report                       | ✅ Passed (138/138 tests pass, 0 critical/serious axe violations)  |
| Human Review & Approval    | Founder review of M4 Deliverable Report                            | Conversation approval                        | ✅ Approved by Founder ("okay go ahead")                           |

---

## Milestone M5: Interactive Explainer Guides, Plain-Language Checklists & Beta 0.1 Release Gate

| Gate Check                 | Requirement                                                       | Evidence Required                               | Verification Status                                                 |
| :------------------------- | :---------------------------------------------------------------- | :---------------------------------------------- | :------------------------------------------------------------------ |
| 5-Phase Explainer Guides   | Sequential guides covering prep, portal, data, fees, tracking     | `src/lib/service-explainer-data.ts`, UI render  | ✅ Passed (All 6 seed services have 5 steps, bilingual en/hi)       |
| WAI-ARIA Stepper Tabs      | Accessible roving tabindex, Arrow/Home/End keyboard navigation    | `src/components/ServiceExplainerGuide.tsx`      | ✅ Passed (ArrowLeft/Right, Home/End, role="tablist", role="tab")   |
| Anti-Phishing Warnings     | Explicit warnings on third-party ads, fake fees, cyber cafe fraud | Explainer guide data & pitfall callouts         | ✅ Passed (Verified for ABHA, PVC, DL, PM-Kisan, NSP, Grievance)    |
| Interactive Readiness List | Dynamic checkboxes, live % progress bar, local persistence        | `src/components/DocumentReadinessChecklist.tsx` | ✅ Passed (useSyncExternalStore, 0 network calls, reset button)     |
| Bureaucratic Jargon Cards  | 6th-grade plain definitions (eKYC, OTR, DBT, ABHA, PVC, Sarathi)  | `src/lib/jargon-glossary.ts`, Assisted Mode     | ✅ Passed (Bilingual en/hi, why-it-matters explanations)            |
| WCAG 2.2 AA Conformance    | Automated axe-core + manual keyboard/zoom reflow audit statement  | `ACCESSIBILITY.md`, E2E test suite              | ✅ Passed (0 violations across 6 viewports, 180/180 E2E tests pass) |
| Strict Performance Budget  | HTML <= 50KB raw, CSS <= 25KB raw, Initial JS <= 220KB gzip       | `scripts/perf-budget.mjs`, `PERFORMANCE_REPORT` | ✅ Passed (`npm run audit:perf` exits code 0, 100% compliant)       |
| OWASP ASVS L1 Mapping      | Level 1 security controls mapping for static/PWA architecture     | `SECURITY_CONTROL_MAPPING.md`                   | ✅ Passed (Mapped across V1, V4, V5, V7, V8, V10, V14)              |
| Zero Vibe Coding Gate      | Refined civic minimalism, high contrast, no neon or glowing hud   | `src/styles/tokens.css`, visual inspection      | ✅ Passed (Clean Civic Slate design tokens, high contrast >= 4.5:1) |
| Code & Type Hygiene        | ESLint 0 errors/warnings, TypeScript 0 errors, Prettier clean     | `npm run lint`, `type-check`, `format:check`    | ✅ Passed (0 errors, 0 warnings across entire codebase)             |
| Full Vitest & E2E Suite    | 34/34 Vitest tests pass, 180/180 Playwright tests pass (6 vps)    | CI test run, Playwright report                  | ✅ Passed (100% test pass rate across 6 responsive viewports)       |
| Founder Review & Sign-Off  | Founder review of M5 Deliverable Report & Beta 0.1 Candidate      | Conversation approval                           | ✅ Approved by Founder ("Proceed")                                  |

---

## Formal Sign-Off Record

- **Milestone:** M5 Interactive Explainer Guides, Plain-Language Checklists & Release Readiness Hardening (Beta 0.1 Candidate)
- **Release Candidate:** **Beta 0.1 Candidate Approved**
- **Verified By Agent:** Antigravity AI Pair Programmer
- **Date:** 2026-11-06
- **Branch:** `master` (Merged from `feat/m5-guides-checklists`)
- **Human Approval:** Approved by Founder on 2026-11-06 ("Proceed")
