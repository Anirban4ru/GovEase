# ADR-0009: Motion and 3D Strategy — CSS 3D Baseline with Conditional WebGL

## Context

Per `Design System Specification` Section 2 & 3, the platform requires meaningful motion and restrained 3D presentation to elevate the user experience from a flat "six-box template" to an authentic "calm map of everyday life." However, the platform must maintain extreme performance on mid-range Android devices common in India, strictly adhere to WCAG 2.2 AA (including 2.2.2 Pause, Stop, Hide and 2.3.3 Animation from Interactions), and stay within tight JavaScript bundle limits ($\le 150\text{ KB}$ initial JS).

## Decision

1. **CSS 3D Transforms as Primary Baseline:**
   - The 6-node radial life system is built natively with CSS 3D transforms (`perspective`, `transform-style: preserve-3d`, `rotateX`, `rotateY`, `translateZ`).
   - Pointer-following tilt and subtle ambient drift are driven by `requestAnimationFrame` with zero external 3D libraries.
   - Cost: 0 KB added bundle size; 60fps on low-end hardware.
2. **Conditional WebGL Enhancement:**
   - A WebGL enhancement is dynamically imported (`import()`) post-FCP only when four strict conditions are satisfied:
     1. Standard presentation mode is active.
     2. `prefers-reduced-motion` is false.
     3. Device reports $\ge 4$ logical CPU cores (`navigator.hardwareConcurrency >= 4`).
     4. Frame rate maintains $\ge 45\text{ fps}$ across initial 2 seconds.
   - If any condition fails, it gracefully and silently unmounts, falling back to CSS 3D.
3. **Static SVG Poster Fallback:**
   - A semantic SVG graphic is always rendered for no-JavaScript environments and reduced-motion preferences, guaranteeing 100% accessible parity.
4. **Motion Safeguards:**
   - All ambient drift has a visible Pause/Play button and pauses automatically after 5 seconds of inactivity (WCAG 2.2.2).
   - All animations collapse to 0.01ms under `prefers-reduced-motion: reduce`.

## Consequences

- Preserves ₹0 runtime infrastructure cost and zero third-party tracking.
- Guarantees instant load on 2G/3G/4G connections while delivering visual depth on modern devices.
