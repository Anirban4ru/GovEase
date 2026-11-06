# Unified Life Services Platform

> [!IMPORTANT]
> **Independent Public Technology Initiative**  
> This platform is an **independent, public-benefit discovery and navigation guide**. It is **not** an official application of the Government of India, is not affiliated with, authorised by, or endorsed by any government ministry, department, or agency, and does not claim official status. All outbound links direct users to verified, official provider websites.

---

## Mission

An India-first, globally expandable platform where a person can discover, understand, organise, and reach the essential digital services of everyday life in plain language, with dignity, uncompromising accessibility, and zero commercial surveillance.

---

## Current Status: Release 1.0 Candidate (Milestones M0 – M7 Complete)

- **Release Version:** **v1.0.0-rc.1** (Release Candidate 1)
- **Architecture:** Static-First Progressive Web Application (PWA) with zero runtime backend & production containerization
- **Budget:** ₹0 infrastructure cost (pure client-side static execution)
- **Quality Gates:** 100% passing across unit (43/43), E2E (228/228), container packaging, performance, security, and accessibility suites

### What works today (Release 1.0 Candidate)

1. **Inclusive App Shell, Responsive Layout & 4-Language Regional Expansion:**
   - Triple presentation modes: **Standard**, **Simple** (large typography), and **Assisted** (plain-language explanations, audio highlights).
   - Instant 4-language regional switching: **English**, **हिंदी (Hindi)**, **বাংলা (Bengali)**, and **தமிழ் (Tamil)** with 100% dictionary key parity and dynamic `<html lang>` sync.
   - Regional typography with `--font-family-bengali` and `--font-family-tamil` font stacks and tailored 1.75 line-height ascender clearances.
   - Verified across 6 responsive viewports (320px, 360px, 390px, 768px, 1024px, 1440px) with zero horizontal overflow.
   - High-contrast Civic Slate design tokens (contrast ratios $\ge 4.5:1$, up to 18.6:1), visible 3px focus rings (`:focus-visible`), and touch targets $\ge 44 \times 44\text{ px}$.

2. **Client-Side Voice Read-Aloud Engine (Assisted Mode):**
   - 100% in-browser Web Speech API synthesis (`window.speechSynthesis`). Zero server audio calls, zero audio tracking.
   - Auto-selects localized Indian voices: `en-IN` (Indian English), `hi-IN` (Hindi), `bn-IN` (Bengali), and `ta-IN` (Tamil) with currency tokenization (₹ &rarr; Rupees, रुपये, টাকা, ரூபாய்) and accessible rate 0.95 tempo.
   - Accessible `ReadAloudButton` conforming to WCAG 2.5.3 (Label in Name), keyboard triggers (Space/Enter/Esc), and toggle states.
   - Integrated into Service Overview, 5-Phase Explainer Guides, and Document Checklists.

3. **Production Containerization & Hardening:**
   - Multi-stage zero-root `Dockerfile` with `node:22-alpine` builder and minimal unprivileged runner (`USER node`, UID 1000).
   - Zero-dependency hardened static runtime with pre-configured HTTP security headers (`nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, strict CSP).
   - Automated container drill (`npm run docker:verify`) asserting static export, healthcheck endpoint, and security headers.

4. **Verified Public Service Catalogue (12 Services):**
   - 12 essential services across all 6 public life ecosystems:
     - **Identity & Electoral:** Voter ID Registration & e-EPIC Download (`voters.eci.gov.in`), Official Aadhaar PVC Card Order (`uidai.gov.in`)
     - **Civil Records:** Birth & Death Registration via Civil Registration System (`crsorgi.gov.in`)
     - **Healthcare:** Ayushman Bharat Health Account / ABHA ID (`abdm.gov.in`)
     - **Education:** National Scholarship Portal / NSP OTR (`scholarships.gov.in`)
     - **Finance & Welfare:** PAN Card Reprint & e-PAN (`onlineservices.nsdl.com`), EPF Passbook & UAN Claim Tracking (`passbook.epfindia.gov.in`), PM-Kisan Samman Nidhi Status & eKYC (`pmkisan.gov.in`), Ration Card NFSA Status & Entitlement (`nfsa.gov.in`)
     - **Mobility & Transport:** Driving Licence Renewal (`sarathi.parivahan.gov.in`)
     - **Housing & Living:** PM Awas Yojana / PMAY-G Beneficiary Status (`pmayg.nic.in`)
     - **Public Utilities:** National Consumer Helpline Grievance 1915 (`consumerhelpline.gov.in`)
   - Strict JSON Schema validation (`npm run validate:catalogue`) and 17-domain allow-list enforcement.
   - Outbound Link Handoff Modal intercepting external exits with security notices and fraud warnings.

5. **In-Memory Full-Text Search Engine:**
   - 100% client-side index powered by `minisearch`. Zero search queries sent to any server.
   - Vernacular, transliteration, and typo tolerance for Hindi (Devanagari), Hinglish (_"kisan paisa"_, _"gaadi licence"_, _"pf passbook"_, _"rashan card"_), acronyms, and misspelled keywords.
   - **Relevance Benchmark:** 174 / 174 queries (**100.0% Top-1 accuracy**) across all 12 services (`test/search-relevance.test.ts`).
   - Accessible WAI-ARIA combobox with keyboard navigation (`ArrowDown`/`ArrowUp`/`Enter`/`Escape`) and live screen-reader regions.

6. **Saved Items & Citizen Data Portability:**
   - On-device bookmarks persisted in `localStorage` without tracking or user accounts.
   - Export backup as schema-validated JSON (`life-services-backup.json`) and restore capability.
   - High-contrast `@media print` printable document checklist for physical Citizen Service Centre (CSC) visits.

7. **PWA Offline Shell & Settings:**
   - Service worker pre-caching (`public/sw.js`) and W3C Web App Manifest (`public/manifest.webmanifest`).
   - `/offline` fallback page with dated snapshot disclaimer (§252).
   - Dedicated `/settings` route featuring a transparent **DPDP Act On-Device Data Inventory** showing every stored key, byte size, purpose, and verified **zero cookies**.
   - Two-step permanent local data purge modal.

8. **Interactive Explainer Guides & Document Checklists:**
   - Standardized 5-phase sequential guides (Preparation &rarr; Portal Navigation &rarr; Data Entry &rarr; Official Fees &rarr; Post-Submission Tracking) for all 12 services.
   - WAI-ARIA roving tabindex stepper tabs with keyboard arrow navigation.
   - Interactive document readiness checklists calculating live completion percentages.
   - Plain-language bureaucratic jargon glossary demystifying terms like _eKYC_, _OTR_, _DBT_, _ABHA_, _PVC Card_, _EPIC_, _NFSA_, _UAN_, and _CRS_.

9. **Anonymous Feedback & Anti-Leak Engine:**
   - Client-side regex scanner detecting and redacting Aadhaar numbers, phone numbers, email addresses, and payment card numbers before clipboard copy or email submission.
   - Zero-backend feedback modal in `/help` with pre-filled mailto templates.
   - Interactive document readiness checklists calculating live completion percentages (_"2 of 4 documents ready (50%)"_).
   - Plain-language bureaucratic jargon glossary demystifying terms like _eKYC_, _OTR_, _DBT_, _ABHA Address_, and _PVC Card_.

10. **Anonymous Feedback & Anti-Leak Engine:**
    - Client-side regex scanner detecting and redacting Aadhaar numbers, phone numbers, email addresses, and payment card numbers before clipboard copy or email submission.
    - Zero-backend feedback modal in `/help` with pre-filled mailto templates.

### What is link-only (By Design)

All services guide citizens to verified, official `.gov.in` destinations via allow-listed outbound links. No real-time server-side API integrations or middleman transaction endpoints exist in Beta 0.1.

### What is explicitly NOT built (Zero Commercial Surveillance)

- No server-side citizen accounts, logins, or passwords
- No server-side databases collecting citizen personal data
- No handling of Aadhaar biometrics, OTPs, UPI PINs, or banking credentials
- No clinical diagnosis or legal/financial advice
- No third-party analytics trackers, cookies, or commercial advertising

---

## Local Development & Quality Verification

Prerequisites: Node.js 22.x LTS, npm 11.x, Git.

```bash
# 1. Install dependencies
npm install

# 2. Run static code hygiene gates
npm run lint
npm run type-check
npm run format:check

# 3. Run unit tests & catalogue validation
npm test
npm run validate:catalogue
npm run check:links:offline
npm run report:staleness

# 4. Run automated performance budget audit
npm run audit:perf

# 5. Run dependency vulnerability audit
npm run audit:ci

# 6. Build static export
npm run build

# 7. Run production container verification drill
npm run docker:verify

# 8. (Optional) Build production Docker container image
npm run docker:build

# 9. Run full Playwright E2E suite across 6 viewports (320px to 1440px)
npm run test:e2e

# 10. Start development server
npm run dev
```

---

## Key Architecture & Governance Documents

- Master Specification: [`PROMPT_FINAL.md`](PROMPT_FINAL.md)
- Agent Operating Guidelines: [`AGENTS.md`](AGENTS.md)
- System Architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md)
- Design System Tokens: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- WCAG 2.2 AA Conformance Statement: [`ACCESSIBILITY.md`](ACCESSIBILITY.md)
- Performance Budget Verification Report: [`PERFORMANCE_REPORT.md`](PERFORMANCE_REPORT.md)
- OWASP ASVS Security Mapping: [`SECURITY_CONTROL_MAPPING.md`](SECURITY_CONTROL_MAPPING.md)
- Threat Model v0: [`THREAT_MODEL.md`](THREAT_MODEL.md)
- Implementation Ledger: [`IMPLEMENTATION_LEDGER.md`](IMPLEMENTATION_LEDGER.md)
- Pre-Release Gates Checklist: [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md)
- Defect Register: [`KNOWN_ISSUES.md`](KNOWN_ISSUES.md)
- Documentation Directory: [`docs/README.md`](docs/README.md)
