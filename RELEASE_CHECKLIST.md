# Release Checklist

**Project:** Unified Life Services Platform  
**Purpose:** Pre-release verification gates for milestone releases (Beta 0.1 to Release 3+)  
**Owner:** Founder  
**Status:** active (M0 Foundation)  
**Last updated:** 2026-11-05

Per `PROMPT_FINAL.md` Section 18: A release gate failure **blocks release** unless explicitly deferred with a written, dated justification signed by the human founder.

---

## Milestone M0 Foundation Sign-Off Gate

| Gate Check             | Requirement                                            | Evidence Required                       | Verification Status           |
| ---------------------- | ------------------------------------------------------ | --------------------------------------- | ----------------------------- |
| Toolchain & Repo       | Git initialized, `.gitignore`, `.env.example` in place | Git commit history                      | ✅ Passed (commit `407e400`)  |
| Strict Typing          | TypeScript strict mode, 0 compile errors               | `npm run type-check` output             | ✅ Passed (0 errors)          |
| Code Hygiene           | ESLint and Prettier passing with 0 warnings            | `npm run lint` & `npm run format:check` | ✅ Passed (0 errors)          |
| Unit Tests             | Vitest passing schema verification tests               | `npm test` test run output              | ✅ Passed (3 tests passed)    |
| Catalogue Integrity    | JSON Schema validation of services and allowlists      | `npm run validate:catalogue` output     | ✅ Passed (0 errors)          |
| Security Baseline      | npm audit reports zero high/critical vulnerabilities   | `npm run audit:ci` output               | ✅ Passed (0 vulnerabilities) |
| Threat Model v0        | Assets, actors, STRIDE analysis, trust boundaries      | `THREAT_MODEL.md`                       | ✅ Passed                     |
| Agent Guidelines       | AGENTS.md <=150 lines, verbatim hard rules             | `AGENTS.md` (62 lines)                  | ✅ Passed                     |
| CI Pipeline            | GitHub Actions workflow config in place                | `.github/workflows/ci.yml`              | ✅ Passed                     |
| Architecture Decisions | ADR-0001 through ADR-0008 documented                   | `docs/decisions/`                       | ✅ Passed                     |
| Design System Tokens   | Colour palette and typography approved                 | Human approval of ADR-0002/3            | ⏳ Awaiting Human Choice      |
| Human Sign-off         | Formal human approval of M0 deliverable                | Signed checklist below                  | ⏳ Awaiting Human Review      |

---

## Formal Sign-Off Record

- **Milestone:** M0 Foundation
- **Verified By Agent:** Antigravity AI Pair Programmer
- **Date:** 2026-11-05
- **Human Approval:** ___________________________ (Pending Human Review)
