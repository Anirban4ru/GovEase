# ADR-0003: Typography & Font Strategy

**Status:** Proposed (Awaiting Human Decision)  
**Date:** 2026-11-05  
**Decider:** Founder

---

## Context and Constraints

- Bilingual support at launch: English (Latin) and Hindi (Devanagari).
- Must be open-licensed (SIL Open Font License) and **self-hosted** (no Google Fonts CDN to protect user privacy).
- Must render cleanly on low-resolution Android displays.
- Devanagari requires proper ascender/matra clearance (`line-height` ~1.8-2.0 for Hindi text vs 1.5-1.6 for Latin).

## Options Proposed

### Option 1: Unified Noto Sans System [RECOMMENDED]

- **Typeface:** Noto Sans (Latin) + Noto Sans Devanagari (Hindi)
- **Character:** Engineered specifically for harmonious multi-script pairing. Standard across India's digital public infrastructure.
- **Bundle impact:** ~150-220 KB self-hosted WOFF2 with unicode range subsetting.

### Option 2: Instrument Sans + Noto Sans Devanagari

- **Typeface:** Instrument Sans (Latin UI/Display) + Noto Sans Devanagari (Hindi)
- **Character:** Contemporary humanist sans-serif with subtle warmth; highly legible interface font paired with trusted Devanagari.

### Option 3: DM Sans + Noto Sans Devanagari

- **Typeface:** DM Sans (Latin) + Noto Sans Devanagari (Hindi)
- **Character:** Geometric precision, high x-height, clear at small sizes. Pairs effectively with Option C (Stone & Ink) palette.

## Consequences

- Fonts will be downloaded and self-hosted under `/public/fonts/` with `next/font/local`.
- Dedicated CSS `[lang="hi"]` rules will enforce tailored line-height and letter-spacing for Devanagari script.
