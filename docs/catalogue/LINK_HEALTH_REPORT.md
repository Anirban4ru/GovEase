# Catalogue Link Health Report

**Project:** Unified Life Services Platform  
**Purpose:** Automated link health and allowlist integrity verification  
**Last Run:** 2026-11-09  
**Mode:** Live Network Check  
**Total URLs Audited:** 22  
**Failed / Disallowed URLs:** 0  

---

| Status | URL | HTTP Code | Allow-list Valid | Associated Services | Details |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ❌ TIMEOUT | `https://myaadhaar.uidai.gov.in/genricPVC` | - | Yes | aadhaar-pvc-card, aadhaar-pvc-card | Connection timed out |
| ⚠️ WARN | `https://uidai.gov.in/en/my-aadhaar/about-your-aadhaar/aadhaar-pvc-card.html` | 500 | Yes | aadhaar-pvc-card, aadhaar-pvc-card | HTTP status 500 |
| ✅ OK | `https://crsorgi.gov.in/web/index.php/auth/login` | 302 | Yes | birth-certificate-crs, birth-certificate-crs, birth-certificate-crs | Reachable |
| ✅ OK | `https://consumerhelpline.gov.in/` | 302 | Yes | consumer-helpline-grievance, consumer-helpline-grievance, consumer-helpline-grievance | Reachable |
| ⚠️ WARN | `https://abha.abdm.gov.in/abha/v3/register` | 403 | Yes | create-abha-id, create-abha-id | HTTP status 403 |
| ⚠️ WARN | `https://abdm.gov.in/abha` | 403 | Yes | create-abha-id, create-abha-id | HTTP status 403 |
| ✅ OK | `https://www.digilocker.gov.in/` | 200 | Yes | digilocker-account-setup, digilocker-account-setup, digilocker-account-setup | Reachable |
| ✅ OK | `https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do` | 302 | Yes | driving-licence-renewal, driving-licence-renewal | Reachable |
| ⚠️ WARN | `https://parivahan.gov.in/parivahan//en/content/driving-licence` | 403 | Yes | driving-licence-renewal, driving-licence-renewal | HTTP status 403 |
| ⚠️ WARN | `https://passbook.epfindia.gov.in/MemberPassBook/Login` | 405 | Yes | epf-passbook-claim-status, epf-passbook-claim-status | HTTP status 405 |
| ❌ TIMEOUT | `https://epfindia.gov.in/` | - | Yes | epf-passbook-claim-status, epf-passbook-claim-status | Connection timed out |
| ✅ OK | `https://eshram.gov.in/` | 200 | Yes | eshram-card-registration, eshram-card-registration, eshram-card-registration | Reachable |
| ⚠️ WARN | `https://scholarships.gov.in/` | 404 | Yes | nsp-scholarship-discovery, nsp-scholarship-discovery, nsp-scholarship-discovery | HTTP status 404 |
| ⚠️ WARN | `https://www.onlineservices.nsdl.com/paam/ReprintEPan.html` | - | Yes | pan-card-reprint, pan-card-reprint, pan-card-reprint | getaddrinfo ENOTFOUND www.onlineservices.nsdl.com |
| ✅ OK | `https://parivahan.gov.in/parivahan/` | 307 | Yes | parivahan-rc-transfer, parivahan-rc-transfer, parivahan-rc-transfer | Reachable |
| ✅ OK | `https://pmjdy.gov.in/` | 200 | Yes | pm-jan-dhan-yojana-account, pm-jan-dhan-yojana-account, pm-jan-dhan-yojana-account | Reachable |
| ⚠️ WARN | `https://pmkisan.gov.in/` | - | Yes | pm-kisan-status, pm-kisan-status, pm-kisan-status | unable to verify the first certificate |
| ⚠️ WARN | `https://jansuraksha.gov.in/` | - | Yes | pm-suraksha-bima-yojana, pm-suraksha-bima-yojana, pm-suraksha-bima-yojana | unable to verify the first certificate |
| ⚠️ WARN | `https://pmayg.nic.in/netiayHome/home.aspx` | - | Yes | pmay-beneficiary-status, pmay-beneficiary-status, pmay-beneficiary-status | getaddrinfo ENOTFOUND pmayg.nic.in |
| ✅ OK | `https://nfsa.gov.in/portal/know_your_ration_card` | 200 | Yes | ration-card-nfsa-status, ration-card-nfsa-status, ration-card-nfsa-status | Reachable |
| ✅ OK | `https://www.swavlambancard.gov.in/` | 301 | Yes | swavlamban-udid-card, swavlamban-udid-card, swavlamban-udid-card | Reachable |
| ⚠️ WARN | `https://voters.eci.gov.in/` | 406 | Yes | voter-id-epic-download, voter-id-epic-download, voter-id-epic-download | HTTP status 406 |

---
*Report generated automatically by `scripts/check-links.mjs`*
