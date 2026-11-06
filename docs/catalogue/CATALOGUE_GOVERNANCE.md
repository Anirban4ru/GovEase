# Service Catalogue Governance Framework

**Project:** Unified Life Services Platform  
**Purpose:** Policies and operational procedures for catalogue accuracy, freshness, review cadence, and link health.  
**Owner:** Founder / Catalogue Lead  
**Status:** active (M0 Foundation)  
**Last updated:** 2026-11-05

Per `System Architecture Specification (SAS)` Section 6: The catalogue is the product. A wrong link, outdated fee, or false eligibility threshold harms real citizens.

---

## 1. Golden Rules of Catalogue Data

1. **Official Primary Sources Only:** No entry may be added or updated using secondary news blogs, commercial aggregators, Wikipedia, or AI hallucinations. The cited source must be the official government domain.
2. **Mandatory Human Verification:** Every entry has `last_verified_on`, `verified_by`, and `next_review_due`. Entries with `verified_by: agent-draft-pending-human-review` cannot be set to `status: active`.
3. **Domain Allow-List Enforcement:** Every outbound link must resolve to an HTTPS domain registered in `catalogue/domain-allowlist.json`.
4. **Informational Eligibility Only:** The platform never makes automated eligibility determinations. All eligibility text is explicitly labelled informational.
5. **No Invented Data:** If a fee or document list cannot be verified from the official portal, write `"pending verification"` and record an open question. Never guess.

---

## 2. Staleness & Maintenance Schedule

- **Standard Review Cadence:** Every active service has a review interval of 90 days (`next_review_due`).
- **Overdue Notice:** Entries past `next_review_due` automatically display a visible warning in the UI: _"This information was verified on [Date] and is currently under routine review."_
- **Stale Quarantine:** Entries that exceed 180 days without human verification (2x the review interval) are automatically excluded from search ranking until reviewed.
- **Automated Link Checking:** Weekly automated CI check verifies HTTP 200/301 responses on all official URLs. Dead links immediately trigger a `needs-review` flag.

---

## 3. Review & Correction Changelog

All catalogue revisions are tracked in Git commits and summarized in the public changelog (`CHANGELOG.md`).

---

## 4. Standardized Verification Chip Taxonomy

Per `Design System Specification` Section 8, chips across life areas and service cards adhere to a fixed, strictly defined taxonomy:

| Chip Identifier         | UI Label (English)      | Meaning & Standardised Usage                                                                                                                               |
| :---------------------- | :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `official-portal`       | `OFFICIAL PORTAL`       | Direct link to an authenticated interactive government transactional portal (e.g., UIDAI, DigiLocker, Parivahan).                                          |
| `official-information`  | `OFFICIAL INFORMATION`  | Public informational guidance, scheme guidelines, or official hospital/center directories published by the competent ministry.                             |
| `no-credential-capture` | `NO CREDENTIAL CAPTURE` | Explicit privacy guarantee; user credentials, passwords, biometrics, or OTPs are never entered into or captured by this platform.                          |
| `verified-road-links`   | `VERIFIED ROAD LINKS`   | Official Ministry of Road Transport and Highways (MoRTH) or State Transport Department verified navigation (replaces former draft "VERIFIED MORTH LINKS"). |
| `state-municipal`       | `STATE & MUNICIPAL`     | Verified state-level or local civic administrative bodies.                                                                                                 |

---

## 4. Standardized Verification Chip Taxonomy

Per `Design System Specification` Section 8, chips across life areas and service cards adhere to a fixed, strictly defined taxonomy:

| Chip Identifier         | UI Label (English)      | Meaning & Standardised Usage                                                                                                                               |
| :---------------------- | :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `official-portal`       | `OFFICIAL PORTAL`       | Direct link to an authenticated interactive government transactional portal (e.g., UIDAI, DigiLocker, Parivahan).                                          |
| `official-information`  | `OFFICIAL INFORMATION`  | Public informational guidance, scheme guidelines, or official hospital/center directories published by the competent ministry.                             |
| `no-credential-capture` | `NO CREDENTIAL CAPTURE` | Explicit privacy guarantee; user credentials, passwords, biometrics, or OTPs are never entered into or captured by this platform.                          |
| `verified-road-links`   | `VERIFIED ROAD LINKS`   | Official Ministry of Road Transport and Highways (MoRTH) or State Transport Department verified navigation (replaces former draft "VERIFIED MORTH LINKS"). |
| `state-municipal`       | `STATE & MUNICIPAL`     | Verified state-level or local civic administrative bodies.                                                                                                 |

