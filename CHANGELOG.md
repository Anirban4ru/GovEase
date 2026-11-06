# Changelog — Unified Life Services Platform

All notable changes to the Unified Life Services Platform are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0-rc.2] - 2026-11-06 (Release Candidate 2)

### Added

- **Multi-Target Deployment Automation & Drills:**
  - Added `public/.nojekyll` to bypass Jekyll processing on GitHub Pages, ensuring static `_next/` chunk directories are correctly indexed and served.
  - Added `.webmanifest` MIME type mapping (`application/manifest+json; charset=utf-8`) in `scripts/static-server.mjs` for seamless PWA compliance.
  - Added `.github/workflows/deploy.yml` for automated GitHub Pages static artifact deployment triggered by version tags (`v*`) or manual workflow dispatch.
  - Created automated multi-target deployment drill script (`scripts/deploy-drill.mjs`, `npm run deploy:drill`) validating `.nojekyll`, `_headers`, `manifest.webmanifest`, `sw.js`, 404 static fallbacks, clean URL subroutes, and security headers (`nosniff`, `DENY`, `strict-origin-when-cross-origin`, strict CSP).
- **Service Catalogue Expansion to 18 Services:**
  - Added 6 new schema-valid, allow-listed public services across 6 life ecosystems:
    1. `digilocker-account-setup.json`: DigiLocker Citizen Account Setup & Digital Document Access (`government-and-citizen`)
    2. `pm-jan-dhan-yojana-account.json`: PM Jan Dhan Yojana (PMJDY) Zero-Balance Bank Account (`finance-and-welfare`)
    3. `eshram-card-registration.json`: e-Shram Registration for Unorganised Workers (`finance-and-welfare`)
    4. `pm-suraksha-bima-yojana.json`: PM Suraksha Bima Yojana (PMSBY) ₹2 Lakh Accidental Insurance (`finance-and-welfare`)
    5. `swavlamban-udid-card.json`: Unique Disability ID (UDID) Card & Disability Certificate (`government-and-citizen`)
    6. `parivahan-rc-transfer.json`: Vehicle Registration Certificate (RC) Ownership Transfer (`mobility-and-transport`)
  - Updated `catalogue/domain-allowlist.json` to `v1.3.0` with 5 new verified government domains (total 22 allowed domains): `digilocker.gov.in`, `pmjdy.gov.in`, `eshram.gov.in`, `jansuraksha.gov.in`, `swavlambancard.gov.in`.
  - Added 5-phase practical journeys to `src/lib/service-explainer-data.ts` for all 6 new services (total 18 services, 90 phases) with actions, steps, and pitfall warnings.
  - Expanded plain-language bureaucratic jargon in `src/lib/jargon-glossary.ts` with 6th-grade definitions and why-it-matters explanations for: _DigiLocker URI_, _PMJDY Overdraft (OD)_, _UAN (e-Shram)_, _PMSBY Auto-Debit_, _UDID Card_, _Form 29 and 30_.
  - Expanded multilingual synonyms, acronyms, and natural language queries in `src/lib/search-synonyms.ts` and `test/search-test-set.json` (210 queries total).
- **Test Suite & Quality Verification:**
  - Vitest search relevance benchmark achieved **100.0% Top-1 accuracy** (210/210 queries) and 100.0% Top-3 accuracy.
  - Added new E2E specification `e2e/m8-catalogue-expansion.spec.ts` covering verified metadata, 5-phase journey navigation, and outbound handoff modal for all 6 new services.
  - All 43 Vitest unit tests passing in <850ms.
  - All 264 Playwright E2E tests passing across 6 responsive viewports with 0 axe-core accessibility violations.
  - Performance budgets 100% compliant across all 28 HTML routes and static bundles (Route JS <= 217.08KB gzip vs 220KB budget, Total static JS 258.25KB gzip vs 320KB budget).
  - 0 high or critical vulnerabilities in dependency tree.

---

## [1.0.0-rc.1] - 2026-11-06 (Release Candidate 1)

### Added

- **Regional Language Expansion (Bengali `bn` & Tamil `ta`):**
  - Added complete, dignified vernacular dictionaries (`src/locales/bn.json` and `src/locales/ta.json`) ensuring 100% key parity with English and Hindi.
  - Expanded `I18nContext` to support 4 official languages (`en`, `hi`, `bn`, `ta`) with persistent on-device selection and dynamic `<html lang>` attribute updates.
  - Added native script language selectors in Header and Settings (`English`, `हिंदी`, `বাংলা`, `தமிழ்`) with strict WCAG 2.5.3 (Label in Name) compliant accessible names.
  - Implemented regional script typography tokens in `src/styles/tokens.css` with `--font-family-bengali` and `--font-family-tamil` font stacks and tailored 1.75 line-height ascender clearances.
  - Extended client-side Web Speech API engine (`useSpeechSynthesis.ts`) to auto-detect and prioritize `bn-IN` (Bengali) and `ta-IN` (Tamil) speech voices, with localized currency tokenization (`টাকা`, `ரூபாய்`, `रुपये`, `Rupees`).
- **Production Containerization & Hardening:**
  - Multi-stage Docker build (`Dockerfile`) with `node:22-alpine` builder and minimal zero-root unprivileged runtime (`USER node`, UID 1000).
  - Hardened container environment: read-only static hosting, zero npm packages in runtime, dropped Linux capabilities, native `HEALTHCHECK` probing `http://localhost:3000/`.
  - Comprehensive `.dockerignore` excluding developer artifacts, tests, git logs, and caches.
  - Automated container verification drill (`scripts/docker-verify.mjs`, `npm run docker:verify`) asserting static export integrity, HTTP 200 healthcheck, and audited security headers (`nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, strict CSP).
- **CI/CD Pipeline Production Packaging:**
  - Integrated container drill (`npm run docker:verify`) and image build (`npm run docker:build`) into GitHub Actions CI workflow (`.github/workflows/ci.yml`).
- **Comprehensive Quality Verification:**
  - 43 / 43 Vitest unit tests pass across 9 test suites in 745ms.
  - 228 / 228 Playwright E2E and axe-core accessibility tests pass across 6 responsive viewports with 0 accessibility violations.
  - Performance budgets strictly satisfied across all 22 HTML routes ($\le 52.32\text{ KB}$ raw), CSS ($5.22\text{ KB}$ raw), and route initial JS ($\le 211.52\text{ KB}$ gzip vs 220KB budget).
  - 0 security vulnerabilities in `npm audit`.

---

## [0.1.0-beta.2] - 2026-11-06 (Beta 0.2 Candidate)

### Added

- **Catalogue Expansion (12 Total Services):** Doubled verified coverage from 6 to 12 essential citizen digital services across all 6 life ecosystems:
  - Voter ID Registration & e-EPIC Download (ECI, `voters.eci.gov.in`)
  - Ration Card NFSA Eligibility & Ration Quota Status (DFPD, `nfsa.gov.in`)
  - PAN Card Physical Reprint & e-PAN Download (Income Tax / Protean, `onlineservices.nsdl.com`)
  - EPF Member Passbook & UAN Claim Tracking (EPFO, `passbook.epfindia.gov.in`)
  - PM Awas Yojana (PMAY-G) Beneficiary & FTO Installment Tracking (MoRD, `pmayg.nic.in`)
  - Birth & Death Registration via Civil Registration System (ORGI, `crsorgi.gov.in`)
- **Domain Allow-list Expansion:** Added 7 verified government domains to `catalogue/domain-allowlist.json` (17 domains total).
- **Client-Side Voice Read-Aloud Engine (`useSpeechSynthesis`):** Accessible, zero-network speech synthesis using browser `window.speechSynthesis`. Automatically selects localized Hindi (`hi-IN`) and Indian English (`en-IN`) voices, with currency sanitization (₹ &rarr; Rupees) and rate 0.95 civic tempo.
- **Accessible ReadAloudButton Component:** High-contrast toggle component with WCAG 2.5.3 compliant Label in Name, keyboard triggers (Space/Enter/Esc), and Assisted Mode visual highlighting.
- **5-Phase Explainer Guides for All 12 Services:** 60 total sequential walkthrough phases in `src/lib/service-explainer-data.ts`.
- **Bureaucratic Jargon Glossary Expansion:** Added plain 6th-grade definitions for _EPIC_, _NFSA Ration Quota_, _UAN_, _CRS Registration_, _PMAY FTO_, and _e-PAN_.
- **Search Intent Map & Benchmark Expansion:** Added comprehensive synonyms, vernacular terms, and typos for all 12 services, scaling the benchmark test set to 174 queries. Maintained **100.0% Top-1 accuracy**.
- **Server Component Explainer Slicing:** Architecture optimization passing sliced guides from Server Component page directly to client view, dropping client JS by ~18KB and keeping all 22 routes within strict performance budgets.
- **Test Suite Expansion:** 40 Vitest unit tests and 228 Playwright E2E tests passing with 0 axe-core accessibility violations across 6 responsive viewports (320px to 1440px).

---

## [0.1.0-beta.1] - 2026-11-06 (Beta 0.1 Candidate)

### Added

- **Interactive 5-Phase Explainer Guides:** Detailed sequential walkthroughs for all 6 seed services (Preparation, Portal Navigation, Data Entry, Official Fees, Post-Submission Tracking).
- **WAI-ARIA Stepper Tabs:** Keyboard-accessible roving tab navigation (`ArrowRight`, `ArrowLeft`, `Home`, `End`) with anti-fraud callouts and deceptive ad warnings.
- **Interactive Document Readiness Checklist:** On-device document preparation checklist calculating live completion percentages with zero server transmission.
- **Bureaucratic Jargon Demystification:** Plain 6th-grade English and Hindi definitions for _eKYC_, _OTR_, _DBT_, _ABHA Address_, _PVC Card_, and _Sarathi Selection_.
- **WCAG 2.2 AA Accessibility Statement (`ACCESSIBILITY.md`):** Complete audit matrix, keyboard testing records, and 200%/400% zoom reflow verification with 0 axe-core violations.
- **Automated Performance Budget Script (`scripts/perf-budget.mjs`, `PERFORMANCE_REPORT.md`):** Enforces strict build budgets (HTML $\le 50\text{KB}$, CSS $\le 25\text{KB}$, initial JS $\le 220\text{KB}$ gzip).
- **OWASP ASVS 5.0.0 Level 1 Security Mapping (`SECURITY_CONTROL_MAPPING.md`):** Mapping defensive controls, CSP, nosniff, and anti-leak sanitization.
- **Full E2E Test Suite Expansion:** 180 Playwright tests passing across 6 responsive viewports (320px to 1440px).

---

## [0.1.0-alpha.4] - 2026-11-05 (Milestone M4)

### Added

- **Saved Items Data Portability:** Client-side export and validated JSON import (`life-services-backup.json`) with zero server transfer.
- **Printable Service Checklist View:** High-contrast `@media print` layout for physical Citizen Service Centre (CSC) visits.
- **Preferences & Settings View:** Dedicated `/settings` route with DPDP Act On-Device Data Inventory disclosing all `localStorage` keys, byte sizes, purpose, and 0 cookies.
- **Two-Step Local Data Purge Action:** Permanent erasure of local storage and caches with WAI-ARIA confirmation dialog.
- **PWA Offline Shell & Web App Manifest:** Service Worker (`public/sw.js`), valid `manifest.webmanifest`, SVG icons, and `/offline` dated snapshot page (§252).
- **Anonymous Feedback & Anti-Leak Engine:** Regex scanner detecting and redacting Aadhaar numbers, phone numbers, emails, and card numbers.
- **Privacy Notice Draft (`docs/PRIVACY_NOTICE_DRAFT.md`):** Draft notice for legal review at `/privacy`.

---

## [0.1.0-alpha.3] - 2026-11-05 (Milestone M3)

### Added

- **In-Memory Client Search Engine:** Zero-latency full-text search powered by `minisearch`. 100% offline with zero server queries or logging.
- **Synonym & Intent Mapping:** Mapping across English, Hindi (Devanagari), Hinglish, acronyms, and common typos.
- **114-Query Benchmark Suite:** Verified 100.0% Top-1 accuracy across natural citizen queries (`test/search-relevance.test.ts`).
- **Accessible Search Combobox:** WAI-ARIA combobox with live screen-reader announcements and keyboard navigation.
- **Explore Filtering & Empty State:** Synchronized query parameters, ecosystem tabs, and accessible reset button.

---

## [0.1.0-alpha.2] - 2026-11-05 (Milestone M2)

### Added

- **Verified Seed Dataset:** 6 high-value services across Healthcare (ABHA), Education (NSP), Agriculture (PM-Kisan), Identity (Aadhaar PVC), Transport (Driving Licence), and Utilities (Consumer Helpline).
- **Catalogue Pipeline & Governance:** JSON Schema validation (`schemas/service-entry.schema.json`) and automated domain allow-list checking.
- **Automated Link Health & Staleness Auditing:** Continuous offline and live link checking and review date tracking.
- **Static Prerendering (SSG):** All service detail pages compiled statically with verified metadata.
- **Outbound Link Safety Modal:** Interstitial safety dialog warning citizens of external portal departure.

---

## [0.1.0-alpha.1] - 2026-11-05 (Milestone M1)

### Added

- **Civic Slate App Shell:** Semantic layout, header, footer, navigation, and skip-to-content link.
- **Triple Presentation Modes:** Standard, Simple, and Assisted modes with persistent local preferences.
- **Bilingual Engine:** Instant English and Hindi language switching with dynamic `html[lang]` and full parity.
- **WCAG 2.2 AA Foundation:** Unsuppressed 3px focus rings, 44px+ touch targets, and contrast ratios up to 18.6:1.
- **Production HTTP Headers:** Content Security Policy, X-Frame-Options DENY, and X-Content-Type-Options nosniff.

---

## [0.1.0-alpha.0] - 2026-11-05 (Milestone M0)

### Added

- Initial project scaffold with Next.js 16 (App Router), React 19, and TypeScript strict mode.
- ESLint, Prettier, and Vitest test runner configuration.
- Operational guide (`AGENTS.md`) and non-negotiable Hard Rules 1–15.
- Initial Threat Model v0 (`THREAT_MODEL.md`) and Architecture Decision Records (ADR-0001 to ADR-0008).
- Service entry JSON Schema and domain allow-list schema.
