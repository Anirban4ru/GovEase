# Security Policy — Unified Life Services Platform

## 1. Project Overview & Security Philosophy

The **Unified Life Services Platform** is an independent, public-benefit civic directory designed to help Indian citizens discover, understand, and reach essential public services without commercial tracking, intermediate credential capture, or advertising.

Security is an architectural foundation:

- **Zero-Knowledge Client Architecture:** All search indexing, query filtering, and bookmarking occur 100% on-device in the citizen's browser.
- **No Sensitive Credential Capture:** The platform never collects, transmits, or stores Aadhaar numbers, OTPs, biometric data, bank account passwords, or UPI PINs.
- **Strict Outbound Domain Allow-Listing:** Every external link is validated at build-time against a cryptographic schema and runtime allow-list strictly limited to official government domains (`*.gov.in`, `*.nic.in`).

---

## 2. Supported Versions

| Version   | Supported | Status                                    |
| :-------- | :-------- | :---------------------------------------- |
| `1.3.x`   | ✅ Yes    | Current Active Release (Capstone Edition) |
| `< 1.2.0` | ❌ No     | Deprecated                                |

---

## 3. Reporting a Security Vulnerability

If you discover a potential security vulnerability, security flaw, or allow-list bypass in this repository, please report it privately:

1. **Email:** [anirbanchatterjee.dev@gmail.com](mailto:anirbanchatterjee.dev@gmail.com)
2. **Subject:** `[SECURITY] Potential Vulnerability in Unified Life Services Platform`
3. **Include in Report:**
   - Detailed description of the vulnerability.
   - Steps to reproduce or proof-of-concept (PoC).
   - Affected routes or components.
   - Estimated impact and proposed remediation, if known.

### Response Timelines

- **Initial Acknowledgement:** Within 24 hours.
- **Triage & Assessment:** Within 48 hours.
- **Patch & Advisory:** Within 5 business days for critical vulnerabilities.

Please do not open public GitHub issues for security vulnerabilities before they have been triaged and remediated.

---

## 4. Key Security Controls

1. **Content Security Policy (CSP):**
   ```http
   default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none';
   ```
2. **Hardened HTTP Response Headers:**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
3. **Legal & Regulatory Compliance:**
   - Fully aligned with the **Digital Personal Data Protection Act, 2023 (DPDP Act 2023)** and **DPDP Rules 2025**.
   - Zero commercial data resale, zero cross-site tracker scripts, and zero advertising SDKs.
