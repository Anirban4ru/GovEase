# ADR-0010: "Calm Map of Everyday Life" Colour System & Contrast Specification

## Context

Per `Design System Specification` Section 1.4 and Section 0.3, the platform must transition away from generic government grey and national flag brand elements (prohibiting tricolour bars or national emblems as logos) toward an original, field-map aesthetic: "A calm map of everyday life." The visual tone must be precise, warm, dependable, human, and modern, with every text-on-surface pair exceeding WCAG 2.2 AA contrast ratios ($> 4.5:1$ body, $> 3:1$ large UI).

## Decision

We adopt the "Calm Map" palette with the following primary functional roles:

- **Ink (`#0F1B2D`):** Primary text and deep structural lines. Contrast on Ground is **14.8:1** (exceeds AAA).
- **Ground (`#FBF8F3`):** Warm off-white field-map background (Dark mode variant: `#0B1220`).
- **Ground Elevated (`#FFFFFF`):** Crisp white surface for cards and interactive panels.
- **Ground Muted (`#F2ECE1`):** Subtle warm tint for secondary containers and chips.
- **Ochre (`#A55705` / UI `#C8731A`):** Saffron-ochre accent for primary user actions, search focus highlights, and active breadcrumbs. Contrast on Ground is **5.0:1** for `#A55705` (AA text compliant) and **4.88:1** on Ink for `#C8731A` (AA UI compliant). Used strictly for interactive focal points, never for large fills behind body text.
- **Teal (`#0E7C7B`):** Verification stamps, success confirmations, and official status tags. Contrast on Ground is **4.8:1** (AA compliant).
- **Clay (`#9A3412`):** Warning notes, "check before you go" disclaimers, and physical preparation alerts. Contrast on Ground is **5.8:1** (AA compliant).
- **Ink-Blue (`#1D4ED8`):** Official external destination links and handoff prompts. Contrast on Ground is **5.1:1** (AA compliant).

## Consequences

- Every color pair meets or exceeds WCAG 2.2 AA contrast requirements.
- Color is never the sole carrier of meaning; always paired with explicit text and iconography.
- Eliminates any confusion with official government portal branding while projecting trust and precision.

