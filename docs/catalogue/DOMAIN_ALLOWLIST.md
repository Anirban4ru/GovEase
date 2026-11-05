# Domain Allow-List & Provider Policy

**Project:** Unified Life Services Platform  
**Purpose:** Register of approved official top-level domains for outbound links and integration boundaries.  
**Owner:** Founder  
**Status:** active (M0 Foundation)  
**Last updated:** 2026-11-05

To protect citizens from phishing, typo-squatting, and deceptive private portals, the platform strictly blocks any outbound service link whose destination domain is not listed in `catalogue/domain-allowlist.json`.

---

## Approved Top-Level Domain Categories

1. **Central Government of India:** `*.gov.in`, `*.nic.in`
2. **State Government Portals:** Official state domains (e.g., `*.maharashtra.gov.in`, `*.delhi.gov.in`)
3. **Academic Public Institutions:** `*.ac.in`, `*.edu.in`
4. **Verified Public Utilities:** State electricity, municipal water, and transit boards (individually vetted)

---

## Initial Vetted Domains (M0 Seed)

| Domain                     | Entity / Ministry                                   | Category    | Added On   | Approved By |
| -------------------------- | --------------------------------------------------- | ----------- | ---------- | ----------- |
| `parivahan.gov.in`         | Ministry of Road Transport and Highways (MoRTH)     | Central Gov | 2026-11-05 | Founder     |
| `sarathi.parivahan.gov.in` | MoRTH / NIC Sarathi Licence Services                | Central Gov | 2026-11-05 | Founder     |
| `morth.nic.in`             | Ministry of Road Transport and Highways Main Portal | Central Gov | 2026-11-05 | Founder     |

_Additions to the domain allow-list require an explicit human review and update to `catalogue/domain-allowlist.json`._
