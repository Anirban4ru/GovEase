# MOTION_SPEC.md — Unified Life Services Platform Motion Specification

**Project:** Unified Life Services Platform  
**Purpose:** Precise specification for all UI and spatial transitions per `UI_OVERHAUL_PROMPT.md` Section 2.  
**Status:** Approved  
**Last Updated:** 2026-11-06

---

## 1. Global Motion Rules

1. **Duration Ceilings:** Micro-interactions $150\text{ ms} - 240\text{ ms}$; standard transitions $200\text{ ms} - 320\text{ ms}$; view transitions up to $450\text{ ms}$.
2. **Easing Profiles:**
   - **Entrance & Reveal:** `cubic-bezier(0.16, 1, 0.3, 1)` (fluid ease-out). Zero spring bounce or overshoot.
   - **State Transition / Reordering:** `cubic-bezier(0.4, 0, 0.2, 1)` (standard ease-in-out).
3. **Properties Animated:** Strictly limited to `transform` and `opacity`. Layout properties (`width`, `height`, `margin`, `padding`) are never animated directly.
4. **Reduced Motion:** If `prefers-reduced-motion: reduce` or the user setting `calm-motion` is active, all animation durations instantly collapse to `0.01ms`.
5. **Presentation Mode Matrix:**
   - **Standard Mode:** Full motion set, interactive 3D hero tilt and ambient drift.
   - **Simple Mode:** Functional motion only (state changes, focus outlines, step progress). 3D and ambient drift disabled.
   - **Assisted Mode:** Step-by-step progress transitions only. Parallax, tilt, and ambient motion disabled.

---

## 2. The 12 Required Motion Moments

| #   | Moment Name              | Trigger                   | Animation Definition                                                                         | Duration                   | Easing                          | Simple Mode   | Assisted Mode | Reduced Motion |
| --- | ------------------------ | ------------------------- | -------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------- | ------------- | ------------- | -------------- |
| 1   | **First Load**           | Page mount                | Staggered fade + subtle $6\text{px}$ translateY of headline, search, then radial nodes       | 750ms total (80ms stagger) | `cubic-bezier(0.16, 1, 0.3, 1)` | Instant       | Instant       | Instant        |
| 2   | **Search Focus**         | Combobox focus            | Search container scales $1.01$; suggestion card panel slides down $4\text{px}$               | 180ms                      | `cubic-bezier(0.16, 1, 0.3, 1)` | Outline only  | Outline only  | Instant        |
| 3   | **Typing Results**       | Keyup filter              | Reordering results with FLIP transform; matching query keyword highlights                    | 150ms                      | `cubic-bezier(0.4, 0, 0.2, 1)`  | Instant text  | Instant text  | Instant text   |
| 4   | **Life Area Node Hover** | Pointer hover / Tab focus | Node translates $4\text{px}$ on Z/Y axes; elevation shadow deepens; summary preview fades in | 200ms                      | `cubic-bezier(0.16, 1, 0.3, 1)` | 2px border    | 2px border    | Border only    |
| 5   | **Entering Area**        | Click / Enter on node     | View Transitions API cross-fade (or CSS fallback) to area directory                          | 300ms                      | `cubic-bezier(0.4, 0, 0.2, 1)`  | Simple fade   | Simple fade   | Instant        |
| 6   | **Card List Reveal**     | Viewport intersection     | Cards animate in once with $8\text{px}$ translateY as scrolled into view                     | 240ms                      | `cubic-bezier(0.16, 1, 0.3, 1)` | Instant       | Instant       | Instant        |
| 7   | **Verified Badge**       | Badge mount / scroll      | Teal checkmark draws in via SVG stroke-dashoffset; date stamp fades in                       | 300ms                      | `cubic-bezier(0.16, 1, 0.3, 1)` | Instant       | Instant       | Instant        |
| 8   | **Save Bookmark**        | Click bookmark button     | Bookmark icon scales $1 \to 1.25 \to 1$ with color fill; toast confirmation appears          | 220ms                      | `cubic-bezier(0.16, 1, 0.3, 1)` | Instant color | Instant color | Instant color  |
| 9   | **Outbound Link**        | Click official link       | "Leaving to official portal" bottom confirmation sheet slides up $16\text{px}$               | 280ms                      | `cubic-bezier(0.16, 1, 0.3, 1)` | Instant modal | Instant modal | Instant modal  |
| 10  | **Journey Step Nav**     | Step change in guide      | Horizontal progress line fills smoothly; new step content fades in from right                | 250ms                      | `cubic-bezier(0.16, 1, 0.3, 1)` | Instant fill  | Instant fill  | Instant fill   |
| 11  | **Page Loading**         | Asset / route pending     | Semantic skeleton wireframes with gentle $1.8\text{s}$ shimmer loop; zero spinners           | 1.8s loop                  | `linear`                        | Static block  | Static block  | Static block   |
| 12  | **Empty / Error State**  | 0 search results / error  | Field compass pin gently settles ($6\text{px}$ drop with subtle damping)                     | 320ms                      | `cubic-bezier(0.16, 1, 0.3, 1)` | Static pin    | Static pin    | Static pin     |
