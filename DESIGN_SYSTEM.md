# DESIGN_SYSTEM.md

**Project:** Unified Life Services Platform  
**Purpose:** Design system principles, tokens, and component specifications for the platform.  
**Owner:** Founder (pending team formation)  
**Status:** draft  
**Last updated:** 2026-11-05  

> [!NOTE]
> This document is part of the M0 deliverable. All design decisions must be recorded as ADRs before implementation begins. Tokens, palette, and typography must be finalised and human-approved before any M1 screen is built.

> [!IMPORTANT]
> All design decisions must be evidence-based, not aesthetic preference. Every token exists to serve a specific functional requirement. No hard-coded values in components — all values come from this token system.

---

## 1. Design principles

| Principle | What it means in practice |
|-----------|--------------------------|
| **Purpose over ornament** | Every visual element must support comprehension, navigation, trust, or task completion. If it serves none of these, remove it. |
| **Calm and professional** | No gratuitous gradients, decorative glassmorphism, excessive shadows, or ornamental animation. |
| **Information hierarchy first** | Typography, spacing, and layout communicate structure before colour or decoration does. |
| **Universal accessibility** | Design for people with low digital literacy, low vision, motor impairments, screen readers, and poor network quality — from the start, not as an afterthought. |
| **Performance is design** | A slow, heavy interface is a bad interface. Bundle size, render time, and interaction responsiveness are design constraints. |
| **Honesty** | Labels, states, and copy are accurate. No fake buttons, dead-end screens, or content that implies a capability that does not exist. |
| **Mobile-first** | Design begins at 360 px width. Wider layouts are progressive enhancements, not the primary canvas. |

---

## 2. Colour palette and semantic tokens

> [!WARNING]
> Exact hex values, contrast ratios, and dark-mode pairs are **pending human approval**. The structure below defines the token architecture; colour values must be measured for WCAG 2.2 AA compliance (4.5:1 for text, 3:1 for UI components) before implementation.

### 2.1 Semantic colour token structure

```css
/* Core brand — pending final palette decision */
--color-brand-primary:        [PENDING];  /* Primary action colour */
--color-brand-primary-hover:  [PENDING];  /* Hover state */
--color-brand-primary-active: [PENDING];  /* Active/pressed state */
--color-brand-primary-subtle: [PENDING];  /* Backgrounds, chips */

/* Neutral scale */
--color-neutral-0:    #ffffff;
--color-neutral-50:   [PENDING];
--color-neutral-100:  [PENDING];
--color-neutral-200:  [PENDING];
--color-neutral-300:  [PENDING];
--color-neutral-400:  [PENDING];
--color-neutral-500:  [PENDING];
--color-neutral-600:  [PENDING];
--color-neutral-700:  [PENDING];
--color-neutral-800:  [PENDING];
--color-neutral-900:  [PENDING];
--color-neutral-950:  [PENDING];
--color-neutral-1000: #000000;

/* Semantic surface tokens */
--color-surface-page:        [PENDING];  /* Page background */
--color-surface-card:        [PENDING];  /* Card/panel background */
--color-surface-raised:      [PENDING];  /* Elevated surface */
--color-surface-overlay:     [PENDING];  /* Modal, drawer overlay */

/* Semantic content tokens */
--color-content-primary:     [PENDING];  /* Body text, primary labels */
--color-content-secondary:   [PENDING];  /* Secondary text, metadata */
--color-content-disabled:    [PENDING];  /* Disabled state text */
--color-content-inverse:     [PENDING];  /* Text on dark/coloured backgrounds */
--color-content-link:        [PENDING];  /* Hyperlinks */
--color-content-link-visited:[PENDING];  /* Visited links */

/* Semantic border tokens */
--color-border-default:      [PENDING];
--color-border-strong:       [PENDING];
--color-border-focus:        [PENDING];  /* Focus ring colour */

/* Status tokens */
--color-status-error:        [PENDING];  /* Error messages, destructive actions */
--color-status-error-bg:     [PENDING];
--color-status-warning:      [PENDING];
--color-status-warning-bg:   [PENDING];
--color-status-success:      [PENDING];
--color-status-success-bg:   [PENDING];
--color-status-info:         [PENDING];
--color-status-info-bg:      [PENDING];

/* Never use colour as the only distinguishing signal — always pair with shape, icon, or text */
```

### 2.2 Colour usage rules
- Minimum contrast 4.5:1 for all body text against its background.
- Minimum contrast 3:1 for large text (18 pt or 14 pt bold) and UI component boundaries.
- Never use colour alone to convey meaning (error, success, state). Always pair with an icon, label, or pattern.
- Support `prefers-contrast: more` by defining high-contrast overrides.
- Brand primary is for primary interactive elements only. Do not use it decoratively.

---

## 3. Typography

> [!WARNING]
> Font selection is **pending human approval**. Requirements: open licence, Devanagari script support (for Hindi), self-hosted (privacy + performance), good rendering on Android. Candidates include Noto Sans (covers Devanagari), and others pending evaluation.

### 3.1 Type scale (pending final values)

| Token | Size | Weight | Line height | Use |
|-------|------|--------|-------------|-----|
| `--type-display-xl` | [PENDING] | [PENDING] | [PENDING] | Hero headings |
| `--type-display-lg` | [PENDING] | [PENDING] | [PENDING] | Page headings |
| `--type-heading-xl` | [PENDING] | [PENDING] | [PENDING] | Section headings |
| `--type-heading-lg` | [PENDING] | [PENDING] | [PENDING] | Card headings |
| `--type-heading-md` | [PENDING] | [PENDING] | [PENDING] | Sub-headings |
| `--type-body-lg`    | [PENDING] | [PENDING] | [PENDING] | Primary body text |
| `--type-body-md`    | [PENDING] | [PENDING] | [PENDING] | Secondary body text |
| `--type-body-sm`    | [PENDING] | [PENDING] | [PENDING] | Captions, metadata |
| `--type-label-lg`   | [PENDING] | [PENDING] | [PENDING] | Button labels, tabs |
| `--type-label-md`   | [PENDING] | [PENDING] | [PENDING] | Input labels |
| `--type-label-sm`   | [PENDING] | [PENDING] | [PENDING] | Helper text, badges |
| `--type-mono`       | [PENDING] | [PENDING] | [PENDING] | Code, identifiers |

### 3.2 Typography rules
- Minimum body font size: 16 px (1 rem) for normal text; 14 px for secondary metadata only.
- Line length: 60–80 characters for primary reading columns; shorter for simple and assisted modes.
- Text must reflow at 400% zoom without loss of content (WCAG 1.4.10 Reflow).
- No text as images. All text must be actual text nodes.
- Right-to-left readiness: use logical properties (`margin-inline-start`, not `margin-left`).
- Language attribute must be set on content in each supported language.

---

## 4. Spacing and layout system

```css
/* Spacing scale (rem-based, relative to 16px root) */
--space-1:   0.25rem;   /* 4px  */
--space-2:   0.5rem;    /* 8px  */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-5:   1.25rem;   /* 20px */
--space-6:   1.5rem;    /* 24px */
--space-8:   2rem;      /* 32px */
--space-10:  2.5rem;    /* 40px */
--space-12:  3rem;      /* 48px */
--space-16:  4rem;      /* 64px */
--space-20:  5rem;      /* 80px */
--space-24:  6rem;      /* 96px */
```

### 4.1 Layout grid
- Mobile (< 768 px): 4-column, 16 px gutters, 16 px margins.
- Tablet (768–1023 px): 8-column, 24 px gutters, 32 px margins.
- Desktop (≥ 1024 px): 12-column, 24 px gutters, 48+ px margins, max-width 1280 px.

### 4.2 Responsive breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `--breakpoint-xs` | 320px | Minimum supported width |
| `--breakpoint-sm` | 360px | Primary mobile target |
| `--breakpoint-md` | 768px | Tablet portrait |
| `--breakpoint-lg` | 1024px | Tablet landscape / small desktop |
| `--breakpoint-xl` | 1440px | Large desktop |

Test at 320, 360, 390, 768, 1024, and 1440 px. Verify at 200% and 400% text zoom.

---

## 5. Border, radius, and elevation

```css
/* Border radius */
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   16px;
--radius-pill: 9999px;  /* Tags, chips */

/* Borders */
--border-width-thin:   1px;
--border-width-medium: 2px;  /* Focus rings */
--border-width-thick:  3px;  /* Active states, errors */

/* Elevation (shadow tokens — no decorative shadows) */
/* Elevation exists only to communicate layering — never for aesthetics */
--elevation-0: none;
--elevation-1: [PENDING: tight shadow for modals/dropdowns];
--elevation-2: [PENDING: for sticky headers, overlays];
```

**Rule:** No arbitrary `box-shadow` values in components. All shadows come from elevation tokens.
Elevation is used to communicate z-layer relationships, not to look "premium".

---

## 6. Iconography

- **One icon set only.** Decision: pending human approval and ADR. Candidates: Lucide Icons (open source, MIT), Heroicons (MIT), Phosphor Icons (MIT). Requirements: outline style, consistent stroke weight, good at small sizes, available as SVG.
- Icons are always accompanied by a text label or `aria-label`. Icons-only buttons are not permitted without accessibility justification.
- Icon sizes align to the type scale: 16, 20, 24 px.
- Do not mix icon sets.
- Self-host icons as SVG sprites or inline SVG; do not use third-party CDN icon fonts.

---

## 7. Component specifications

> [!NOTE]
> Component specs are created per-milestone in the M1 app-shell work. This section lists the inventory; each component gets a full specification before implementation.

### 7.1 Core component inventory

| Component | States required | Accessibility requirements |
|-----------|-----------------|---------------------------|
| Button (primary, secondary, ghost, destructive) | default, hover, active, focus, disabled, loading | Role `button`, keyboard activatable, accessible name |
| Input (text, search) | default, focus, error, disabled, readonly | Label associated, error described, role `textbox` |
| Search bar | default, focused, loading, results, empty, error | Combobox pattern or simple input + results list |
| Card (service card) | default, hover, focus | If interactive: `role="article"` or link with accessible name |
| Navigation (bottom bar, top bar) | default, active, focus | `nav` landmark, `aria-current="page"` on active |
| Badge / status chip | n/a | Do not rely on colour alone; include text or icon |
| Dialog / Modal | open, closed | `role="dialog"`, focus trap, `aria-labelledby` |
| Offline banner | visible/hidden | Live region for screen readers |
| Toast / Notification | info, success, warning, error | Live region, dismissible, timeout |
| Empty state | n/a | Clear heading and next-step action |
| Loading skeleton | n/a | `aria-busy`, no fake content |
| Language/mode switcher | default, active | Labelled, keyboard accessible |

### 7.2 Three-mode presentation

Same data, same codebase, three presentations controlled by a persisted user setting:

| Mode | Characteristics |
|------|-----------------|
| **Standard** | Concise, information-dense, familiar |
| **Simple** | Larger controls and text, fewer items per screen, plain language, one primary action per screen, shortest paths |
| **Assisted** | Step-by-step guidance, contextual explanations in text; voice is deferred to a later milestone |

Mode switch must never lose the user's current context (page, service, scroll position).

---

## 8. Interaction, feedback, and motion

- **Motion exists only for functional feedback** — confirming an action, communicating state, orienting the user.
- Transitions must respect `prefers-reduced-motion: reduce`. When reduced motion is preferred, substitute instant state changes for transitions.
- Do not use animation to decorate, to appear "alive", or to fill loading time.
- Maximum meaningful transition duration: 300ms. Prefer 150–200ms for most interactions.
- Loading states: skeleton screens preferred over spinners for content loads; spinners for short-duration actions.
- All interactive states required: default, hover (desktop), active/pressed, focus-visible, disabled, loading, error, success.

```css
/* Motion tokens */
--motion-duration-fast:    150ms;
--motion-duration-normal:  250ms;
--motion-duration-slow:    350ms;
--motion-easing-standard:  cubic-bezier(0.4, 0, 0.2, 1);
--motion-easing-enter:     cubic-bezier(0, 0, 0.2, 1);
--motion-easing-exit:      cubic-bezier(0.4, 0, 1, 1);
```

---

## 9. Loading, empty, error, offline, and success states

Every component and page must have all relevant states designed and implemented.

| State | Required elements |
|-------|------------------|
| **Loading** | Skeleton or spinner; no layout shift when content arrives; `aria-busy` |
| **Empty** | Friendly heading, brief explanation, one clear next-step action |
| **Error** | Clear description of what went wrong, what the user can do, and how to contact support if needed; never expose technical internals |
| **Offline** | "You are offline" message; show cached content with its age; clear indication that the data may not be current |
| **Success** | Confirm the action completed; provide a clear next step |
| **Disabled** | Visual indication; `disabled` attribute (not just styling); explanation if the reason is non-obvious |

---

## 10. Accessibility requirements and validation

**Target:** WCAG 2.2 Level AA.

Verification approach:
1. Automated: axe-core via Playwright in CI. Zero critical or serious violations on release.
2. Manual per release: keyboard walkthrough of all core journeys; NVDA + browser on Windows; TalkBack on Android; 200% zoom; high-contrast; reduced motion.
3. Results recorded in `ACCESSIBILITY.md` with dates, tools, versions, and unresolved issues.
4. Do not claim conformance. State what was tested and what remains.

Specific requirements:
- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`, `h1`–`h6` hierarchy).
- ARIA only where native semantics are insufficient. No ARIA misuse.
- `lang` attribute on `<html>` and on inline content in a different language.
- Focus ring: 2 px minimum, high-contrast colour, never `outline: none` without a custom replacement.
- Skip-to-main-content link as the first focusable element.
- Error messages programmatically associated with their input (`aria-describedby`).
- No timeout that prevents a user completing a task (or extendable).

---

## 11. Content style guide and tone of voice

- **Plain language**: target Grade 6–8 reading level in each supported language.
- **No unexplained acronyms**: spell out every acronym on first use; never assume the user knows government terminology.
- **Active voice**: "To renew your licence, go to..." not "Licence renewal can be completed at..."
- **Goal-oriented headings**: "Find your driving licence" not "Driving Licence Services".
- **Honest labels**: never label a feature as available unless it is. Never label a link as a service if it is a link to an external site — always tell the user they are leaving and where they are going.
- **No marketing language**: "seamless", "powerful", "innovative", "world-class" — forbidden.
- **Last-verified dates**: always visible on catalogue entries. "Last verified: DD MMM YYYY."
- **Independent-guide notice**: every outbound link screen shows a plain-language statement that this is an independent guide, not an official government service.

---

## 12. Design system governance

- All design token values, font decisions, and palette choices require an ADR before implementation.
- No hard-coded hex values, font sizes, or spacing values in components.
- Changes to this document must be reviewed before implementation begins on the affected area.
- Machine-translated content must be labelled as such until a fluent human reviewer approves it.

---

*End of DESIGN_SYSTEM.md draft. All [PENDING] values require human decision and ADR before M1 begins.*

