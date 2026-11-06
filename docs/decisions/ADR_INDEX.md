# Architecture Decision Records (ADR) Index

**Project:** Unified Life Services Platform  
**Purpose:** Index of all architectural, technical, and design decisions with context and consequences.  
**Owner:** Engineering Lead / Founder  
**Status:** active  
**Last updated:** 2026-11-05

Per `PROMPT_FINAL.md` Section 10.1: Technology is chosen by evidence, not fashion. Every significant technical choice requires an ADR evaluated against security, maintainability, low-end device performance, accessibility, solo-developer ergonomics, and zero-budget feasibility.

---

| ADR ID                                             | Title                                        | Date       | Status   | Decision Summary                                                     |
| -------------------------------------------------- | -------------------------------------------- | ---------- | -------- | -------------------------------------------------------------------- |
| [`ADR-0001`](ADR-0001-framework-selection.md)      | Frontend Framework Selection                 | 2026-11-05 | Approved | Next.js 16 (App Router) with static export (`output: 'export'`)      |
| [`ADR-0002`](ADR-0002-colour-palette.md)           | Colour Palette Selection                     | 2026-11-05 | Proposed | Three accessible, zero-vibe-coding palettes proposed (A/B/C)         |
| [`ADR-0003`](ADR-0003-typography.md)               | Typography & Font Strategy                   | 2026-11-05 | Proposed | Three self-hosted, Devanagari-capable font systems proposed (1/2/3)  |
| [`ADR-0004`](ADR-0004-catalogue-format.md)         | Service Catalogue Storage & Validation       | 2026-11-05 | Approved | Version-controlled JSON files validated by JSON Schema in CI         |
| [`ADR-0005`](ADR-0005-search-approach.md)          | Search & Discovery Engine for Beta 0.1       | 2026-11-05 | Approved | Client-side in-memory search index (`minisearch`) with synonym maps  |
| [`ADR-0006`](ADR-0006-testing-strategy-tooling.md) | Multi-Tier Testing Strategy & Tooling        | 2026-11-05 | Approved | Vitest (unit/schema), Playwright (E2E), axe-core (a11y)              |
| [`ADR-0007`](ADR-0007-i18n-architecture.md)        | Internationalisation (i18n) Architecture     | 2026-11-05 | Approved | Client-side locale dictionary architecture with ICU formatting       |
| [`ADR-0008`](ADR-0008-hosting-candidates.md)       | Hosting Infrastructure & Deployment Strategy | 2026-11-05 | Proposed | Local-first ₹0 dev; evaluate Cloudflare Pages vs Vercel Pro          |
| [`ADR-0009`](ADR-0009-motion-and-3d-strategy.md)   | Motion & 3D Strategy                         | 2026-11-06 | Approved | CSS 3D baseline with conditional WebGL upgrade & static SVG fallback |
| [`ADR-0010`](ADR-0010-calm-map-colour-system.md)   | Calm Map of Everyday Life Colour System      | 2026-11-06 | Approved | Ink, Ground, Ochre, Teal, Clay tokens with WCAG 2.2 AA contrast      |
