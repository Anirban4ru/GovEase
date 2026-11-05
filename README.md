# Unified Life Services Platform

> [!IMPORTANT]
> **Independent Public Technology Initiative**  
> This platform is an **independent, public-benefit discovery and navigation guide**. It is **not** an official application of the Government of India, is not affiliated with, authorised by, or endorsed by any government ministry, department, or agency, and does not claim official status. All outbound links direct users to verified, official provider websites.

---

## Mission

An India-first, globally expandable platform where a person can discover, understand, organise, and reach the essential digital services of everyday life in plain language, with dignity, uncompromising accessibility, and zero commercial surveillance.

---

## Current Status (Milestone M0 Foundation)

- **Release Target:** Beta 0.1 (Responsive, Installable Progressive Web App)
- **Active Phase:** M0 Foundation Complete — Awaiting M1 App Shell Kickoff

### What works today (M0 Foundation)

- Next.js 16 (App Router) static export build pipeline (`npm run build`)
- Strict TypeScript configuration (`npm run type-check`)
- ESLint and Prettier code hygiene gates (`npm run lint`, `npm run format:check`)
- Vitest unit test runner (`npm run test`)
- JSON Schema validation pipeline for service entries and domain allowlists (`npm run validate:catalogue`)
- Zero-vulnerability dependency profile audited via `npm audit`
- Threat Model v0, Human Actions Register, Open Questions Register, and Architecture Decision Records (ADRs)

### What is link-only

- In Beta 0.1, all services in the catalogue direct users to the official government destination via an allow-listed external link. No real-time server-side API integrations are active.

### What is explicitly NOT built (Deferred by Design)

- No server-side user accounts or passwords
- No server-side storage of citizen personal data
- No document uploads or file storage
- No handling of Aadhaar biometrics, OTPs, UPI PINs, or banking credentials
- No automated clinical diagnoses or financial/legal advice
- No AI chatbots or third-party ad/analytics trackers

---

## Local Development (Zero-Cost Toolchain)

Prerequisites: Node.js 22.x LTS, npm 11.x, Git.

```bash
# 1. Install dependencies
npm install

# 2. Run code hygiene checks
npm run lint
npm run type-check
npm run format:check

# 3. Run unit tests and catalogue validation
npm test
npm run validate:catalogue

# 4. Build static export
npm run build

# 5. Start development server
npm run dev
```

---

## Architecture & Governance

- Master Specification: [`PROMPT_FINAL.md`](PROMPT_FINAL.md)
- Agent Operating Rules: [`AGENTS.md`](AGENTS.md)
- Threat Model: [`THREAT_MODEL.md`](THREAT_MODEL.md)
- Design System: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- Documentation Directory: [`docs/README.md`](docs/README.md)
- Implementation Ledger: [`IMPLEMENTATION_LEDGER.md`](IMPLEMENTATION_LEDGER.md)
- Defect Register: [`KNOWN_ISSUES.md`](KNOWN_ISSUES.md)
