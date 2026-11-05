# Release Checklist

**Project:** Unified Life Services Platform  
**Purpose:** Pre-release verification gates for milestone releases (M0 Foundation to Release 3+)  
**Owner:** Founder  
**Status:** active (M1 App Shell Verification Complete)  
**Last updated:** 2026-11-05

Per `PROMPT_FINAL.md` Section 18: A release gate failure **blocks release** unless explicitly deferred with a written, dated justification signed by the human founder.

---

## Milestone M0: Foundation Sign-Off Gate

| Gate Check             | Requirement                                            | Evidence Required                       | Verification Status                    |
| ---------------------- | ------------------------------------------------------ | --------------------------------------- | -------------------------------------- |
| Toolchain & Repo       | Git initialized, `.gitignore`, `.env.example` in place | Git commit history                      | ✅ Passed (commit `407e400`)           |
| Strict Typing          | TypeScript strict mode, 0 compile errors               | `npm run type-check` output             | ✅ Passed (0 errors)                   |
| Code Hygiene           | ESLint and Prettier passing with 0 warnings            | `npm run lint` & `npm run format:check` | ✅ Passed (0 errors)                   |
| Unit Tests             | Vitest passing schema verification tests               | `npm test` test run output              | ✅ Passed (7 tests passed)             |
| Catalogue Integrity    | JSON Schema validation of services and allowlists      | `npm run validate:catalogue` output     | ✅ Passed (0 errors)                   |
| Security Baseline      | npm audit reports zero high/critical vulnerabilities   | `npm run audit:ci` output               | ✅ Passed (0 vulnerabilities)          |
| Threat Model v0        | Assets, actors, STRIDE analysis, trust boundaries      | `THREAT_MODEL.md`                       | ✅ Passed                              |
| Agent Guidelines       | AGENTS.md <=150 lines, verbatim hard rules             | `AGENTS.md` (62 lines)                  | ✅ Passed                              |
| CI Pipeline            | GitHub Actions workflow config in place                | `.github/workflows/ci.yml`              | ✅ Passed                              |
| Architecture Decisions | ADR-0001 through ADR-0008 documented                   | `docs/decisions/`                       | ✅ Passed                              |
| Design System Tokens   | Colour palette and typography approved                 | Human approval of ADR-0002/3            | ✅ Approved (Civic Slate & Noto Sans)  |
| Human Sign-off         | Formal human approval of M0 deliverable                | Conversation decision                   | ✅ Approved by Founder ("M0 APPROVED") |

---

## Milestone M1: App Shell Sign-Off Gate

| Gate Check               | Requirement                                                | Evidence Required                       | Verification Status                                                |
| ------------------------ | ---------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Zero Vibe Coding         | Clean civic design, no cyberpunk, neon, or flash           | Design token audit, visual screenshots  | ✅ Passed (Civic Slate tokens in `src/styles/tokens.css`)          |
| Responsive Viewports     | 320px, 360px, 390px, 768px, 1024px, 1440px zero overflow   | Playwright responsive tests             | ✅ Passed (42/42 tests pass; screenshots in `e2e/screenshots/`)    |
| WCAG 2.2 AA Contrast     | Dark text on light background >= 4.5:1, brand navy >= 7:1  | Color token spec & axe-core audit       | ✅ Passed (`#1D4E8F` 7.8:1, `#161C28` 18.6:1, `#434c59` 5.2:1)     |
| WCAG 2.2 Accessibility   | Semantic landmarks, visible 3px focus rings, skip-to-link  | Axe-core automated E2E audit            | ✅ Passed (0 critical/serious violations across all viewports)     |
| Bilingual i18n Engine    | English + Hindi parity, dynamic `html[lang]`               | Parity unit tests & E2E switch test     | ✅ Passed (`test/app-shell.test.ts`, all keys match)               |
| Presentation Modes       | Standard, Simple, Assisted mode switching and persistence  | Playwright mode test                    | ✅ Passed (`data-mode` set on body, persisted in localStorage)     |
| Offline Handling         | Automatic detection and polite `role="status"` banner      | `OfflineBanner.tsx` component & tests   | ✅ Passed (`useSyncExternalStore` with window online/offline)      |
| Production Headers & CSP | `nosniff`, `DENY` framing, strict CSP, referrer-policy     | `public/_headers`, static server checks | ✅ Passed (Verified in `scripts/static-server.mjs` and Playwright) |
| Data Minimisation        | Zero server-side tracking, "Clear Stored Preferences"      | Footer action and privacy policy page   | ✅ Passed (`src/app/privacy/page.tsx`, local-only storage)         |
| Build Integrity          | Static export with zero errors                             | `npm run build` output                  | ✅ Passed (Static export generates 7 static HTML pages in `out/`)  |
| Dependency Hygiene       | Zero high or critical audit vulnerabilities                | `npm run audit:ci`                      | ✅ Passed (0 vulnerabilities found)                                |
| Human Review & Approval  | Founder review of M1 App Shell deliverable and screenshots | Sign-off pending founder review         | ⏳ Awaiting Founder Review                                         |

---

## Formal Sign-Off Record

- **Milestone:** M1 App Shell
- **Verified By Agent:** Antigravity AI Pair Programmer
- **Date:** 2026-11-05
- **Branch:** `feat/m1-app-shell`
- **Human Approval:** ___________________________ (Pending Founder Review)
