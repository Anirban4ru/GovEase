# ADR-0001: Frontend Framework Selection

**Status:** Approved  
**Date:** 2026-11-05  
**Decider:** Founder / Engineering Lead

---

## Context and Constraints

- The platform is an India-first public technology initiative targeting users on low-end Android mobile devices over throttled/unreliable networks, as well as desktop users.
- Initial budget is ₹0.
- Beta 0.1 explicitly excludes server-side accounts, document storage, and live provider API proxying.
- The product requires a fast, responsive, installable Progressive Web App (PWA) with complete offline capability for its cached catalogue shell.

## Options Considered

1. **Next.js 16 (App Router) with Static Export (`output: 'export'`) [SELECTED]**
2. **Vite + React (Vanilla SPA)**
3. **Astro (Content-focused static site)**
4. **Remix (Vite SPA mode)**

## Decision

Adopt **Next.js 16 with TypeScript and static export (`output: 'export'`)**.

## Rationale

- **Zero Server Overhead:** Static export produces plain HTML, CSS, and JS bundles deployable to any static host or local HTTP server with zero runtime server costs.
- **Strict Typing & Modern Tooling:** Turbopack and TypeScript 5 compiler support deliver fast builds and robust type checking.
- **PWA & Offline Readiness:** Standard service worker integration allows full offline navigation of the cached catalogue shell.
- **Smooth Evolution:** When server-side features (such as authenticated sync or provider adapters) are approved in later releases (R1/R2), the architecture can transition to hybrid server rendering without a rewrite.

## Consequences

- No Node.js runtime server required for Beta 0.1.
- Dynamic server-rendered API routes are disabled; all service data is embedded or client-fetched.
- Images must use static unoptimized settings or pre-generated responsive sizes.
