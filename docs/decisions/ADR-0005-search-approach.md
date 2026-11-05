# ADR-0005: Search & Discovery Engine for Beta 0.1

**Status:** Approved  
**Date:** 2026-11-05  
**Decider:** Founder / Engineering Lead

---

## Context and Constraints

- Target catalogue size for Beta 0.1 is 40-80 high-value services.
- Search must operate with zero network latency, work fully offline in the PWA, and collect zero server-side query logs to preserve citizen privacy.
- Must support ordinary language queries, acronym expansions, spelling mistakes, and transliterated Hindi queries (e.g., "driving licence", "gaadi licence", "parivahan").

## Options Considered

1. **Client-Side In-Memory Search (`minisearch`) [SELECTED]**
2. **Server-Side Full-Text Search (PostgreSQL `tsvector` or Meilisearch)**
3. **External Search as a Service (Algolia / Elastic)**

## Decision

Adopt **`minisearch`** as a lightweight, client-side, in-memory search index built at application startup from the pre-compiled static catalogue.

## Rationale

- **Zero Privacy Risk:** Search queries remain 100% on the user's device and are never sent over the wire or logged to an analytics server.
- **Offline Capable:** Works seamlessly when the user is disconnected or on an unstable 2G/3G connection.
- **Tiny Footprint:** Less than 6 KB gzipped with zero external runtime dependencies.
- **Fuzzy Matching & Prefix Search:** Handles user typos, prefixes, and weighted field scoring (title > goal > summary > category).

## Consequences

- Meilisearch or server-side search is unnecessary in Beta 0.1 and is deferred until catalogue scale exceeds several thousand entries.
