# ADR-0007: Internationalisation (i18n) Architecture

**Status:** Approved  
**Date:** 2026-11-05  
**Decider:** Founder / Engineering Lead

---

## Context and Constraints

- Launch languages: English (`en`) and Hindi (`hi`).
- Architecture must easily scale to additional Indian scheduled languages (Bengali, Tamil, Telugu, Marathi, etc.) without structural refactoring.
- Must support client-side static export without requiring Node.js middleware for language routing.
- No hardcoded English strings permitted in user-facing components.

## Decision

Implement a **client-side locale dictionary architecture with ICU message formatting**:

- Locale dictionaries stored as structured JSON files under `src/locales/{locale}.json`.
- React context (`I18nProvider`) manages active locale, persists user preference in `localStorage`, and provides a type-safe `useTranslation` hook.
- Content in the catalogue is bilingual at the schema level (`title.en`, `title.hi`).

## Consequences

- Every new user-facing string must be declared in `src/locales/en.json` and `src/locales/hi.json`.
- Machine translations are strictly tagged as unverified drafts until reviewed by a fluent human speaker.
