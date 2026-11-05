# Known Issues & Defect Register

**Project:** Unified Life Services Platform  
**Purpose:** Central tracking of all known bugs, technical debt, and pending investigations with severity and reproduction steps.  
**Owner:** Engineering Lead / Founder  
**Status:** active (M0 Foundation)  
**Last updated:** 2026-11-05

Per `PROMPT_FINAL.md` Section 14.1A:  
No defects may be hidden or untracked. All known limitations and bugs must be listed here until resolved with a regression test.

---

## Defect Severity Classifications

- **Critical:** Security vulnerability, data loss, crash on core journey, false information displayed to citizen. (Blocks release)
- **High:** Major functional failure, broken navigation, accessibility barrier, test failure. (Blocks release)
- **Medium:** Minor layout glitch, non-blocking edge case, suboptimal performance.
- **Low:** Cosmetic imperfection, documentation typo, code style refinement.

---

## Active Defect Log

| Issue ID | Severity | Component | Summary / Description                               | Reproduction Steps | Resolution / Workaround | Owner | Target Milestone |
| -------- | -------- | --------- | --------------------------------------------------- | ------------------ | ----------------------- | ----- | ---------------- |
| _None_   | -        | -         | Initial M0 build clean. No active defects reported. | -                  | -                       | -     | -                |

---

## Technical Debt & Deferred Work

| Item ID | Category | Summary                                   | Reason Deferred                                                   | Action Required                                       | Target     |
| ------- | -------- | ----------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------- | ---------- |
| TD-001  | Design   | Final design token values in `tokens.css` | Awaiting human decision on Palette (A/B/C) and Typography (1/2/3) | Update `tokens.css` once human approves ADR-0002/0003 | M0 Closure |
| TD-002  | Testing  | Browser-based E2E Playwright tests        | App shell UI will be built in M1                                  | Add Playwright journey tests in M1                    | M1         |
