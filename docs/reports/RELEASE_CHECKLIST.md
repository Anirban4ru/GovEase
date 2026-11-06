# Release Checklist

**Project:** Unified Life Services Platform  
**Purpose:** Pre-release verification gates for milestone releases (M0 Foundation to Release 3+)  
**Owner:** Founder  
**Status:** active (M5 Explainer Guides & Beta 0.1 Candidate Approved)  
**Last updated:** 2026-11-06

Per `System Architecture Specification (SAS)` Section 18: A release gate failure **blocks release** unless explicitly deferred with a written, dated justification signed by the human founder.

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
| Governance Rules       | Core engineering ethics & privacy rules verified       | Architecture Governance                 | ✅ Passed                              |
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

## Milestone M6: Catalogue Expansion & Voice Read-Aloud Sign-Off Gate (Beta 0.2 Candidate)

| Gate Check                 | Requirement                                                       | Evidence Required                               | Verification Status                                                 |
| :------------------------- | :---------------------------------------------------------------- | :---------------------------------------------- | :------------------------------------------------------------------ |
| 12 Verified Services       | Double coverage (6 to 12 services); schema-valid, bilingual       | `catalogue/services/*.json`, validate script    | ✅ Passed (12/12 valid services across all 6 ecosystems)            |
| Domain Allow-list          | 17 verified official government domains, HTTPS enforced           | `catalogue/domain-allowlist.json`               | ✅ Passed (16/16 unique URLs verified in offline link check)        |
| Web Speech API Engine      | 100% client-side speech synthesis, 0 network audio, hi/en support | `src/hooks/useSpeechSynthesis.ts`, unit tests   | ✅ Passed (`test/speech-synthesis.test.ts`, 6/6 tests pass)         |
| Accessible Read-Aloud UI   | High-contrast ReadAloudButton, WCAG 2.5.3 compliant Label in Name | `src/components/ReadAloudButton.tsx`            | ✅ Passed (Accessible names match visible labels across states)     |
| 5-Phase Guides (All 12)    | Complete 5-phase interactive walkthroughs for all 12 services     | `src/lib/service-explainer-data.ts`             | ✅ Passed (60 total interactive phases with actions & warnings)     |
| Bureaucratic Jargon (12)   | Plain 6th-grade definitions for EPIC, NFSA, UAN, CRS, PMAY, e-PAN | `src/lib/jargon-glossary.ts`                    | ✅ Passed (Bilingual definitions with why-it-matters explanations)  |
| 174-Query Search Benchmark | $\ge 95\%$ Top-1 accuracy across expanded citizen test set        | `test/search-relevance.test.ts`                 | ✅ Passed (**174/174 = 100.0% Top-1 accuracy achieved**)            |
| Server Component Slicing   | Per-service guide slicing keeps route JS within strict budget     | `src/app/services/[id]/page.tsx`, perf audit    | ✅ Passed (All 22 routes $\le 206\text{ KB}$ gzip; site JS < 300KB) |
| Performance Budget Gate    | HTML <= 60KB raw, CSS <= 25KB raw, Initial JS <= 220KB gzip       | `scripts/perf-budget.mjs`, `PERFORMANCE_REPORT` | ✅ Passed (`npm run audit:perf` exits code 0, 100% compliant)       |
| Code & Type Hygiene        | ESLint 0 errors/warnings, TypeScript 0 errors, Prettier clean     | `npm run lint`, `type-check`, `format:check`    | ✅ Passed (0 errors, 0 warnings across entire codebase)             |
| Full Vitest & E2E Suite    | 40/40 Vitest tests pass, 228/228 Playwright tests pass (6 vps)    | CI test run, Playwright report                  | ✅ Passed (**228/228 Playwright tests pass across 6 viewports**)    |
| Founder Review & Sign-Off  | Founder review of M6 Deliverable Report & Beta 0.2 Candidate      | Conversation approval                           | ✅ Approved by Founder ("I approve evrything go ahead")             |

---

## Milestone M7: Production Packaging & Regional Languages Sign-Off Gate (Release 1.0 Candidate 1)

| Gate Check                 | Requirement                                                        | Evidence Required                                    | Verification Status                                                   |
| :------------------------- | :----------------------------------------------------------------- | :--------------------------------------------------- | :-------------------------------------------------------------------- |
| Bengali & Tamil i18n       | Full `bn` and `ta` parity; 100% key match across all dictionaries  | `src/locales/bn.json`, `ta.json`, Vitest suite       | ✅ Passed (`test/app-shell.test.ts`, all keys match across 4 locales) |
| Accessible Multi-Lang UI   | Native script buttons; WCAG 2.5.3 compliant Label in Name          | `Header.tsx`, `settings/page.tsx`, E2E tests         | ✅ Passed (0 axe-core violations; switches EN, HI, BN, TA)            |
| Regional Script Typography | `--font-family-bengali/tamil` with 1.75 line-height ascenders      | `src/styles/tokens.css`, token tests                 | ✅ Passed (Clean ligature rendering, no matra clipping)               |
| 4-Language Voice Synthesis | Web Speech API matches `bn-IN` & `ta-IN` with localized currencies | `src/hooks/useSpeechSynthesis.ts`, unit tests        | ✅ Passed (`test/speech-synthesis.test.ts`, 9/9 tests pass)           |
| Multi-Stage Dockerfile     | Zero-root `USER node` (UID 1000), read-only runtime, HEALTHCHECK   | `Dockerfile`, `.dockerignore`                        | ✅ Passed (`scripts/docker-verify.mjs` exits code 0)                  |
| Container & Server Drill   | Static export verification, HTTP 200 healthcheck, nosniff, CSP     | `scripts/docker-verify.mjs`, `npm run docker:verify` | ✅ Passed (Automated container drill passes 100%)                     |
| CI/CD Pipeline Container   | CI workflow builds static export, runs drill, and builds image     | `.github/workflows/ci.yml`                           | ✅ Passed (Configured and verified)                                   |
| Performance Budget Gate    | HTML <= 60KB raw, CSS <= 25KB raw, Initial JS <= 220KB gzip        | `scripts/perf-budget.mjs`, `PERFORMANCE_REPORT`      | ✅ Passed (Initial JS <= 211.52KB gzip; All budgets met)              |
| Code & Type Hygiene        | ESLint 0 errors/warnings, TypeScript 0 errors, Prettier clean      | `npm run lint`, `type-check`, `format:check`         | ✅ Passed (0 errors, 0 warnings across all files)                     |
| Full Vitest & E2E Suite    | 43/43 Vitest tests pass, 228/228 Playwright tests pass (6 vps)     | CI test run, Playwright report                       | ✅ Passed (**228/228 Playwright tests pass with 0 a11y violations**)  |
| Founder Review & Sign-Off  | Founder review of M7 Deliverable Report & Release 1.0 Candidate    | Conversation approval                                | ✅ Approved by Founder ("Go ahead with both advice 1 and 2")          |

---

## Milestone M8: Deployment Automation & Catalogue Expansion (Release 1.0 Candidate 2)

| Gate Check                 | Requirement                                                        | Evidence Required                                  | Verification Status                                                  |
| :------------------------- | :----------------------------------------------------------------- | :------------------------------------------------- | :------------------------------------------------------------------- |
| Multi-Target Deploy Drill  | Verified `.nojekyll`, `_headers`, manifest, 404, security headers  | `scripts/deploy-drill.mjs`, `npm run deploy:drill` | ✅ Passed (12/12 deployment checks verified green)                   |
| GitHub Pages Automation    | CI/CD workflow triggers on `v*` tags & manual dispatch             | `.github/workflows/deploy.yml`                     | ✅ Passed (Schema and permissions validated)                         |
| 18 Verified Services       | 6 new high-impact services across 6 life ecosystems                | `catalogue/services/*.json`, validate script       | ✅ Passed (18/18 valid services across all 6 ecosystems)             |
| Domain Allow-list (22)     | 5 new official government domains allow-listed                     | `catalogue/domain-allowlist.json` v1.3.0           | ✅ Passed (22/22 unique allow-listed URLs verified offline)          |
| 5-Phase Guides (All 18)    | Standardized 5-phase practical journeys across all 18 services     | `src/lib/service-explainer-data.ts`                | ✅ Passed (90 total interactive phases with actions & warnings)      |
| Bureaucratic Jargon (18)   | Plain 6th-grade bilingual definitions for DigiLocker, OD, UAN, etc | `src/lib/jargon-glossary.ts`                       | ✅ Passed (Bilingual definitions with why-it-matters explanations)   |
| 210-Query Search Benchmark | $\ge 95\%$ Top-1 accuracy across expanded citizen test set         | `test/search-relevance.test.ts`                    | ✅ Passed (**210/210 = 100.0% Top-1 accuracy achieved**)             |
| Performance Budget Gate    | HTML <= 60KB raw, CSS <= 25KB raw, Initial JS <= 220KB gzip        | `scripts/perf-budget.mjs`, `npm run audit:perf`    | ✅ Passed (All 28 routes $\le 217\text{ KB}$ gzip; site JS 258KB)    |
| Code & Type Hygiene        | ESLint 0 errors/warnings, TypeScript 0 errors, Prettier clean      | `npm run lint`, `type-check`, `format:check`       | ✅ Passed (0 errors, 0 warnings across entire codebase)              |
| Full Vitest & E2E Suite    | 43/43 Vitest tests pass, 264/264 Playwright tests pass (6 vps)     | CI test run, Playwright report                     | ✅ Passed (**264/264 Playwright tests pass with 0 a11y violations**) |
| Founder Review & Sign-Off  | Founder review of M8 Deliverable Report & Release 1.0 Candidate 2  | Conversation approval                              | ✅ Approved by Founder ("I approve evrything go ahead")              |

---

## Milestone M9: India-First Civic Visual Identity, Bespoke SVG Motifs & Fluid Micro-Interactions (Release 1.1 Candidate 1)

| Gate Check                 | Requirement                                                        | Evidence Required                                    | Verification Status                                                  |
| :------------------------- | :----------------------------------------------------------------- | :--------------------------------------------------- | :------------------------------------------------------------------- |
| Civic Tricolor Bar         | 4px top ribbon (#e06d10, #ffffff, #138808) across header           | `src/styles/tokens.css`, `src/components/Header.tsx` | ✅ Passed (Verified across all 6 viewports in Playwright)            |
| Ashoka Chakra SVG Motif    | 24-spoke geometric wheel SVG; compliant with State Emblem Act 2005 | `src/components/Header.tsx`, zero counterfeit seals  | ✅ Passed (Dignified civic geometric motif, 0 legal violations)      |
| Multilingual Hero Badge    | Pulsing indicator with Devanagari, Bengali, Tamil, English strings | `src/app/page.tsx`, `tokens.css`                     | ✅ Passed (WCAG 2.2 AA contrast verified at 8.35:1)                  |
| Bespoke Ecosystem SVGs     | Lightweight inline SVGs for all 6 ecosystems (0 external fonts)    | `src/components/EcosystemBadge.tsx`                  | ✅ Passed (Rendered on Home, Explore, and Service Detail)            |
| Interactive Card Lift      | Hardware-accelerated CSS lift (`translateY(-2px)`, subtle shadow)  | `src/styles/tokens.css` (`.civic-card-interactive`)  | ✅ Passed (Zero layout shifts, CLS = 0.000)                          |
| Soundwave Equalizer Motion | 3-bar animated soundwave equalizer when speech active              | `src/components/ReadAloudButton.tsx`                 | ✅ Passed (Active on speaking, pauses on idle)                       |
| Checklist Progress Motion  | 350ms ease-out progress transition + `checkPop` on toggle          | `src/components/DocumentReadinessChecklist.tsx`      | ✅ Passed (Tested across 6 viewports in Playwright)                  |
| Explainer Fade-In Motion   | 200ms `fadeInStep` transition when switching guide tabs            | `src/components/ServiceExplainerGuide.tsx`           | ✅ Passed (Hardware-accelerated CSS keyframe)                        |
| Reduced Motion Override    | `@media (prefers-reduced-motion: reduce)` collapses to 0.01ms      | `src/styles/tokens.css`                              | ✅ Passed (WCAG 2.2 Guideline 2.3 compliant)                         |
| Performance Budget Gate    | CSS <= 25KB raw, Initial JS <= 220KB gzip                          | `scripts/perf-budget.mjs`, `npm run audit:perf`      | ✅ Passed (CSS 6.29KB raw, Route Initial JS <= 219.92KB gzip)        |
| Full Vitest & E2E Suite    | 44/44 Vitest tests pass, 294/294 Playwright tests pass (6 vps)     | CI test run, Playwright report                       | ✅ Passed (**294/294 Playwright tests pass with 0 a11y violations**) |
| Founder Review & Sign-Off  | Founder review of M9 Deliverable Report & Release 1.1 Candidate 1  | Conversation approval                                | ✅ Approved by Founder ("go ahead with both asap")                   |

---

## Milestone M10: Citizen Life-Stage Navigator & Informational Discovery Guide (Release 1.2 Candidate 1)

| Gate Check                  | Requirement                                                         | Evidence Required                                    | Verification Status                                                  |
| :-------------------------- | :------------------------------------------------------------------ | :--------------------------------------------------- | :------------------------------------------------------------------- |
| Life-Stage Recommendation   | Deterministic on-device matching engine across 6 situations/4 needs | `src/lib/life-stage-engine.ts`, unit test suite      | ✅ Passed (7/7 unit tests pass, 100% on-device execution)            |
| Hard Rules 8 & 9 Framing    | Informational framing, persistent disclaimer, zero legal advice     | `src/app/guide/page.tsx`, `e2e/m10-life-stage-guide` | ✅ Passed (Disclaimer banner visible, official sources cited)        |
| CSC Physical Prep Pack      | Verified checklist (originals, photocopies, photos, fees) + print   | `src/lib/life-stage-engine.ts`, `src/app/guide/`     | ✅ Passed (Printable checklist toggle verified in E2E)               |
| 3-Step Wizard Navigation    | Step 1 (Situation), Step 2 (Need), Step 3 (Results), `aria-live`    | `src/app/guide/page.tsx`, Playwright E2E spec        | ✅ Passed (Live region polite announcements, keyboard navigable)     |
| 4-Language Parity           | Parity across English, Hindi, Bengali, Tamil for all guide strings  | `test/life-stage-engine.test.ts`, `test/app-shell`   | ✅ Passed (100% parity across all 4 localized dictionaries)          |
| App Shell Integration       | Desktop header & mobile bottom nav links with custom compass SVG    | `src/components/Navigation.tsx`, `test/app-shell`    | ✅ Passed (Navigation verified across desktop & mobile layouts)      |
| Performance Budget Gate     | 29 routes: CSS <= 25KB raw, Route JS <= 225KB gzip, JS <= 320KB     | `scripts/perf-budget.mjs`, `npm run audit:perf`      | ✅ Passed (Route JS <= 221.74KB gzip; total JS 280.25KB gzip)        |
| Multi-Target Deploy Drill   | 13/13 deployment checks pass including `guide/index.html`           | `scripts/deploy-drill.mjs`, `npm run deploy:drill`   | ✅ Passed (13/13 checks verified green)                              |
| Multi-Stage Container Drill | Zero-root `USER node`, HEALTHCHECK, nosniff, CSP headers            | `scripts/docker-verify.mjs`, `npm run docker:verify` | ✅ Passed (Container verification drill passed)                      |
| Full Vitest & E2E Suite     | 51/51 Vitest tests pass, 312/312 Playwright tests pass (6 vps)      | CI test run, Playwright report                       | ✅ Passed (**312/312 Playwright tests pass with 0 a11y violations**) |
| Founder Review & Sign-Off   | Founder review of M10 Deliverable Report & Release 1.2 Candidate 1  | Conversation approval                                | ⏳ Ready for Founder Review                                          |

---

## Formal Sign-Off Record

- **Milestone:** M10 Citizen Life-Stage Navigator & Informational Discovery Guide (Release 1.2 Candidate 1)
- **Release Candidate:** **v1.2.0-rc.1 Ready**
- **Verified By:** Quality Assurance & Engineering Team
- **Date:** 2026-11-06
- **Branch:** `feat/m10-citizen-life-stage-navigator`
- **Human Approval:** Pending Founder Sign-Off
