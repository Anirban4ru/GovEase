# ADR-0006: Multi-Tier Testing Strategy & Tooling

**Status:** Approved  
**Date:** 2026-11-05  
**Decider:** Founder / Engineering Lead

---

## Context and Constraints

- Quality over speed. No feature may be marked `implemented-and-tested` without executable test evidence.
- Must cover unit logic, schema contracts, automated accessibility (WCAG 2.2 AA), and cross-browser user journeys.
- Zero-cost tooling that runs cleanly on local developer machines and standard CI runners.

## Decision & Tooling Matrix

1. **Unit & Logic Tests:** **Vitest** (fast, TypeScript-native, ESM support, sub-second execution).
2. **Component Testing:** **React Testing Library** (focuses on user interaction and accessibility semantics rather than implementation details).
3. **End-to-End User Journeys:** **Playwright** (Chromium, Firefox, WebKit, and mobile emulation for the 7 core user journeys in §4.2).
4. **Automated Accessibility:** **`@axe-core/playwright`** (enforces 0 critical/serious violations in CI).
5. **Catalogue Schema Validation:** **`ajv`** with custom governance scripts (`scripts/validate-catalogue.mjs`).
6. **Code Hygiene & Security SAST:** **ESLint**, **TypeScript (`tsc --noEmit`)**, and **Prettier**.

## Consequences

- All tests run in local development and are strictly enforced in GitHub Actions (`.github/workflows/ci.yml`).
- Failing tests block pull requests and release gates.
