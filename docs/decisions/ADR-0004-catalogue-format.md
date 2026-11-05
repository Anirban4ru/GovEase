# ADR-0004: Service Catalogue Storage & Validation

**Status:** Approved  
**Date:** 2026-11-05  
**Decider:** Founder / Engineering Lead

---

## Context and Constraints

- The catalogue is the core asset of the platform.
- Accuracy, freshness, and traceability are paramount.
- Initial size: 40-80 curated, human-verified services across 6 ecosystems.
- Zero server database budget in Beta 0.1.

## Options Considered

1. **JSON Files in Repository with JSON Schema Validation in CI [SELECTED]**
2. **PostgreSQL Database with Prisma ORM**
3. **Headless CMS / Contentful / Strapi**

## Decision

Store catalogue entries as **individual JSON files under `catalogue/services/`**, validated against JSON Schema Draft-07 in CI before any release or build.

## Rationale

- **Zero Cost & Offline Native:** Files are committed directly in Git and bundled during static build; zero operational hosting cost and instant offline availability in the PWA.
- **Auditable History:** Every single change, URL fix, or fee update has a full Git commit history with author, date, and diff.
- **CI-Enforced Integrity:** Automated validator (`scripts/validate-catalogue.mjs`) checks schema compliance, mandatory human verification dates, informational eligibility flags, and allow-listed domains on every commit.

## Consequences

- Adding or editing services requires a Git commit or pull request.
- Moving to a relational database (PostgreSQL) is deferred until a later release (R1/R2) when dynamic user-generated content or server synchronization is introduced.
