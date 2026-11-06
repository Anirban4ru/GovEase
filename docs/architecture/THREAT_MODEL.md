# THREAT_MODEL.md: Threat Model v0

**Project:** Unified Life Services Platform  
**Purpose:** Foundational threat model analyzing assets, actors, trust boundaries, abuse cases, and mitigations.  
**Version:** v0.1 (Milestone M0 Foundation)  
**Status:** draft  
**Owner:** Founder  
**Methodology:** STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)  
**Last updated:** 2026-11-05

---

## 1. System Overview & Scope (Beta 0.1)

Beta 0.1 is an **offline-capable, static-exported Progressive Web Application (PWA)** providing curated, verified discovery and outbound navigation to official public services in India.

### In Scope

- Static frontend delivery (HTML, CSS, JS client bundle)
- Client-side search and filtering index
- Local storage (`localStorage` / `IndexedDB`) on the user's device for saved services and preferences
- Outbound hyperlinks to allow-listed official domains
- Catalogue data pipelines and verification metadata

### Out of Scope (Explicitly Excluded from Beta 0.1)

- User accounts and authentication
- Server-side personal data storage
- Document upload or processing
- Real-time provider API credentials or proxying
- In-app payment processing
- AI chatbots or user-prompt processing

---

## 2. Key Assets

| Asset ID | Asset Description                   | Sensitivity | Impact of Compromise                                           |
| -------- | ----------------------------------- | ----------- | -------------------------------------------------------------- |
| **A-1**  | Catalogue Integrity & Official URLs | Critical    | Users redirected to phishing/malicious domains; loss of trust  |
| **A-2**  | Outbound Navigation Handoff Safety  | High        | User deception, credential harvesting on lookalike domains     |
| **A-3**  | Client-side Storage Privacy         | High        | Exposure of saved preferences on shared devices                |
| **A-4**  | Client Bundle & Supply Chain        | High        | Malicious code injected into user browsers (XSS, cryptomining) |
| **A-5**  | Project Source Code & Secrets       | High        | Leaked build credentials, repository hijacking                 |

---

## 3. Threat Actors

| Actor ID | Actor                                | Motivation                           | Capabilities                                               |
| -------- | ------------------------------------ | ------------------------------------ | ---------------------------------------------------------- |
| **TA-1** | Phishing / Lookalike Operator        | Financial fraud, credential theft    | Sets up typo-squatted domains mimicking government portals |
| **TA-2** | Malicious Catalogue Contributor      | Vandalism, redirecting users         | Attempts to tamper with pull requests or schema data       |
| **TA-3** | Supply Chain Attacker                | Broad compromise                     | Compromises npm dependencies or build tooling              |
| **TA-4** | Co-located / Shared Device User      | Snooping on family member            | Reads local storage or browser history on shared phone     |
| **TA-5** | Network Attacker (Man-in-the-Middle) | Traffic interception, session hijack | Intercepts HTTP traffic on untrusted Wi-Fi                 |

---

## 4. Trust Boundaries & Data Flow Diagram (ASCII)

```
[ User Browser / Device ]
   │
   │ Local Storage (Saved Services, Display Preferences)
   ▼
[ PWA Client Shell & Static Assets ]
   │
   ├── [ Client-Side Search Index ] (Minisearch - in-memory, no server roundtrip)
   │
   ├── [ Verified Catalogue Data ] (Static JSON, validated in CI)
   │
═══════════════════════════════════════════════════════════════════════ Trust Boundary 1 (Platform Edge)
   │
   │ Outbound Link Click (window.open with noopener, noreferrer)
   ▼
[ Interstitial Warning Dialog ] ("Independent guide: leaving for official portal")
   │
═══════════════════════════════════════════════════════════════════════ Trust Boundary 2 (Third-Party Web)
   │
   ▼
[ Official Government / Provider Portal ] (e.g., sarathi.parivahan.gov.in)
```

---

## 5. STRIDE Threat Analysis & Mitigations

| Threat ID | Category                   | Threat Scenario                                                  | Impact                                           | Mitigations (M0 & Beta 0.1)                                                                                             | Status                         |
| --------- | -------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **T-01**  | **Spoofing**               | Platform impersonated as an official government portal           | Legal liability, user confusion                  | Strict disclaimer on all pages: "Independent guide, not affiliated with Government of India"; no national emblems.      | Implemented in copy guidelines |
| **T-02**  | **Tampering**              | Malicious pull request changes official URL to a phishing domain | Users sent to phishing site                      | Schema requires HTTPS; domain allow-list check in CI (`ajv-cli` + domain check script); human verification gate.        | In progress (M0)               |
| **T-03**  | **Repudiation**            | Catalogue change made without accountability                     | Cannot track who introduced an error             | All catalogue entries are versioned in Git with signed commits; mandatory `verified_by` and `last_verified_on` fields.  | Implemented in schema          |
| **T-04**  | **Info Disclosure**        | Saved services exposed on shared family phone                    | Privacy violation under DPDP                     | Prominent "Clear My Data" one-tap button; clear privacy disclosure; no sensitive personal health/financial data stored. | Designed in PRD / M4           |
| **T-05**  | **Info Disclosure**        | Secrets committed to repository                                  | Build/deployment compromise                      | Pre-commit secret scanning (`gitleaks`), `.env` strictly in `.gitignore`, `.env.example` templates only.                | Implemented in M0              |
| **T-06**  | **Denial of Service**      | Upstream provider portal is offline                              | User cannot access official service              | Platform clearly indicates provider status where detectable; provides alternative official contact details.             | Planned M1                     |
| **T-07**  | **Elevation of Privilege** | XSS in catalogue rendering executes arbitrary code in browser    | Session hijacking, client-side data exfiltration | Strict Content Security Policy (no `unsafe-inline`, no `unsafe-eval`); React automatic output encoding; static export.  | Planned M1                     |
| **T-08**  | **Tampering**              | Compromised npm dependency injects malicious script              | Client-side compromise                           | Locked dependencies (`package-lock.json`), `npm audit` in CI, minimal dependency policy (ADR-0006).                     | Implemented in M0              |

---

## 6. Security Gate Requirements

Per `System Architecture Specification (SAS)` Section 9.5 and 18:

- Zero unresolved Critical or High security findings.
- Automated static security linting on every commit.
- Independent penetration test prior to any public production release with real citizen use.
