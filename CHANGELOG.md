# Changelog — Unified Life Services Platform

All notable changes to the Unified Life Services Platform are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
