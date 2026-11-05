# DRAFT Privacy Notice & Data Inventory

> **Document Status:** `draft` — Pending Qualified Legal Review Before Public Release  
> **Applicable Law:** India Digital Personal Data Protection Act, 2023 (DPDP Act) & DPDP Rules 2025  
> **Platform Version:** Beta 0.1  
> **Owner:** Engineering Lead / Founder  
> **Last Updated:** 2026-11-05

---

## 1. Core Mission & Data Minimisation Commitments

The Unified Life Services Platform operates under a strict **privacy-by-design and zero-commercial-exploitation** architecture:

1. **Zero Server-Side Tracking:** In Beta 0.1, the platform operates as a static, client-side application. There is no central user database, no mandatory user accounts, and no logging or transmission of citizen search text, browsing history, or IP addresses to application servers.
2. **Zero Third-Party Advertising / Trackers:** No tracking pixels, analytics cookies, session recording scripts, or commercial data brokers are embedded in the application.
3. **Absolute Prohibition of Sensitive Data (Hard Rule 2):** Under no circumstances does the platform capture, store, log, or transmit:
   - Aadhaar numbers or biometric information
   - One-Time Passwords (OTPs)
   - Banking passwords, card security codes, or UPI PINs
   - Government portal credentials
   - Medical records or diagnostic data

---

## 2. On-Device Local Data Inventory

Under Section 6 of the DPDP Act 2023, citizens are entitled to transparent disclosure of any personal data processed. The following items are stored exclusively in the citizen's web browser (`localStorage` / Cache API) and never leave the device:

| Storage Key             | Storage Medium                 | Purpose                                                                                     | Third-Party Access | Erasure Control                                            |
| :---------------------- | :----------------------------- | :------------------------------------------------------------------------------------------ | :----------------- | :--------------------------------------------------------- |
| `uls_saved_services`    | Browser `localStorage`         | Stores IDs of public services bookmarked by the user for fast offline reference.            | None (Device Only) | One-click removal in `/saved` or full purge in `/settings` |
| `uls_presentation_mode` | Browser `localStorage`         | Persists user interface density choice (`standard`, `simple`, or `assisted`).               | None (Device Only) | Mode selector or full purge in `/settings`                 |
| `uls_locale`            | Browser `localStorage`         | Persists language selection (`en` or `hi`).                                                 | None (Device Only) | Language selector or full purge in `/settings`             |
| `uls_pwa_dismissed`     | Browser `localStorage`         | Remembers if the citizen dismissed the install prompt to avoid repeated prompts.            | None (Device Only) | Full purge in `/settings`                                  |
| `uls-shell-v1`          | Cache Storage (Service Worker) | Caches the static application shell and pre-compiled catalogue snapshot for offline access. | None (Device Only) | Browser storage clear or full purge in `/settings`         |

---

## 3. Citizen Rights & Data Erasure

In compliance with DPDP Act citizen rights (Right to Access, Right to Correction and Erasure):

- **Portability:** Citizens can export all their bookmarked services as a standardized JSON file (`life-services-backup.json`) at any time from `/saved`.
- **Complete Erasure:** Citizens can invoke **"Purge All Local Data"** from `/settings`, which permanently removes all local storage keys, service worker caches, and resets all preferences immediately.

---

## 4. External Outbound Links & Official Portal Handoff

When a citizen navigates to an official government portal:

- An explicit safety warning modal is displayed.
- Links only point to verified official government domains listed in the platform's allow-list (`catalogue/domain-allowlist.json`).
- Outbound links use strict `rel="noopener noreferrer"` attributes to prevent tab-napping and credential snooping.
- Once a citizen exits to an external government portal, the privacy policy and terms of that respective government agency govern the interaction.
