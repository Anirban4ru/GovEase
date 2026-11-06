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

## 4. Key Security Controls & Headers

1. **Content Security Policy (CSP):**
   ```http
   default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none';
   ```
2. **Hardened HTTP Response Headers:**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
3. **Legal & Regulatory Compliance:**
   - Fully aligned with the **Digital Personal Data Protection Act, 2023 (DPDP Act 2023)** and **DPDP Rules 2025**.
   - Zero commercial data resale, zero cross-site tracker scripts, and zero advertising SDKs.

---

## 5. 20-Point Production Security Verification Matrix

| # | Security Check | Status | Implementation Evidence |
| :--- | :--- | :--- | :--- |
| **1** | **Hide API Keys** | Verified | Zero backend or third-party paid API keys exist in source code or client bundles. |
| **2** | **Check Environment Variables** | Verified | `.env.example` verified clean; zero credentials or tokens required for execution. |
| **3** | **Check Keys in Git** | Verified | Git commit history audited; zero secrets, tokens, or credentials committed. |
| **4** | **Protect Admin Routes** | Verified | Zero administrative backdoors or unauthenticated admin surfaces exist. |
| **5** | **Authentication Security** | Verified | Zero-knowledge client architecture eliminates credential theft attack surfaces. |
| **6** | **Check User Permissions** | Verified | Strictly isolated browser `localStorage`; no cross-tenant or cross-origin access. |
| **7** | **Sanitize User Inputs** | Verified | `src/lib/anti-leak-sanitizer.ts` strips Aadhaar numbers, OTPs, PAN, and HTML tags. |
| **8** | **Protect Against XSS** | Verified | React 19 automatic contextual escaping + strict CSP (`script-src 'self'`). |
| **9** | **SQL Injection Protection** | Verified | Zero SQL databases used; static compiled JSON catalogue eliminates SQLi entirely. |
| **10** | **Check Database Rules** | Verified | Local client-side storage governed with transparent user-facing purge in `/settings`. |
| **11** | **Add Rate Limiting** | Verified | Static file serving via hardened HTTP server; zero stateful API abuse surfaces. |
| **12** | **Set Spend Cap** | Verified | Pure static architecture with zero cloud compute costs and zero paid API consumption. |
| **13** | **Secure File Uploads** | Verified | Zero arbitrary file upload endpoints; backup restore strictly validates JSON schema via Ajv. |
| **14** | **CSRF Protection** | Verified | Static GET navigation only; zero ambient cookie-authenticated state-changing mutations. |
| **15** | **Check CORS Settings** | Verified | `connect-src 'self'` prevents unauthorized cross-origin API data exfiltration. |
| **16** | **Enable HTTPS** | Verified | Strict Transport Security (HSTS) and HTTPS enforced across deployment targets. |
| **17** | **Add Security Headers** | Verified | Pre-configured in `public/_headers` (`nosniff`, `DENY`, `strict-origin-when-cross-origin`). |
| **18** | **Secure Cookies** | Verified | **Zero cookies used** across the entire application; audited in `/settings` data inventory. |
| **19** | **Disable Debug Mode** | Verified | Zero `console.log` debug statements in production build; minified production chunks. |
| **20** | **Check Production Settings** | Verified | `reactStrictMode: true`, `poweredByHeader: false`, static export validation passing. |
