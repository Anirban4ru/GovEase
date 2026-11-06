# UI_OVERHAUL_PROMPT.md: Motion, Depth, and Visual Overhaul

**Project:** Unified Life Services Platform (working name)
**Scope:** Visual design, motion, 3D presentation, and UX refinement of the existing Beta build
**Priority order:** India-first, then globally extensible
**Status of this prompt:** Overrides the motion restrictions in PROMPT.md Section 7.1 for this overhaul only. All accessibility, performance, honest-labelling, and privacy rules in PROMPT.md still apply in full.

---

## 0. Read first

### 0.1 What exists now
The current build at localhost:3000 is clean, legible, and correctly labelled. The trust signals are right: "Independent Guide, Not a Government Portal", zero advertising, zero data sharing, dated verification badges, and a visible language switcher with EN, हिंदी, বাংলা, and தமிழ். Keep all of these.

The problem is that it reads as a competent template. Six identical cards, flat backgrounds, no sense of motion, no spatial structure, and no moment that makes a person feel the product is alive or thought through. Nothing in the layout tells the story of the product: that a person arrives with a goal and is guided to the right official door.

### 0.2 What this overhaul must achieve
1. **Presence:** the first screen should feel crafted and confident within two seconds, on a mid-range Android phone and on a desktop.
2. **Motion with meaning:** animation should explain structure, show progress, confirm actions, and guide attention. It must never be decoration for its own sake, and it must never delay a task.
3. **Depth:** a restrained 3D treatment that makes the six life areas feel like a connected system rather than six boxes.
4. **Trust preserved:** the visual upgrade must make the independent-guide status and the "last verified" dates more visible, not less. No glossy effects that resemble official government branding, and no dark patterns.
5. **Global-ready:** the design system should work for any script, any direction, and any country pack without redesign.

### 0.3 Explicit non-goals
- Do not copy the visual identity of any government, bank, or commercial app.
- Do not use the national emblem, the tricolour as a brand element, or any official logo.
- Do not add ads, promotional banners, animated urgency ("Act now!"), countdowns, or streak or gamification mechanics.
- Do not add features. This is a presentation and interaction overhaul of existing journeys.

---

## 1. Creative direction

### 1.1 Concept
**"A calm map of everyday life."** The product is a guide. Its visual language should feel like a well-made field map: precise, warm, navigable, with clear paths and clearly marked destinations. Depth and motion should suggest a system of connected places, not a shop window.

### 1.2 Mood keywords
Calm, precise, warm, dependable, human, modern, quietly confident, unhurried.

### 1.3 Anti-keywords
Flashy, sci-fi, neon, glassmorphism everywhere, crypto aesthetic, generic AI-dashboard, loud gradients, bouncing elements, government-form grey.

### 1.4 Colour (India-first, globally neutral)
Build a token system with these roles. Hex values are starting points; the designer agent must test contrast and adjust, and document final values with ratios.
- **Ink** (primary text and deep surfaces): deep navy-ink, for example `#0F1B2D`.
- **Ground** (page background): warm off-white, for example `#FBF8F3`, with a dark mode variant at `#0B1220`.
- **Ochre** (primary accent, for actions and focus): saffron-ochre, for example `#C8731A`. Use only for actions and highlights, never for large fills behind body text.
- **Teal** (secondary accent, for verification and success): for example `#0E7C7B`.
- **Clay** (for warnings and "check before you go" notes): for example `#9A3412`.
- **Ink-blue** (links and the "official destination" state): for example `#1D4ED8`.

Rules: every text-on-surface pair meets WCAG 2.2 AA (4.5:1 body, 3:1 large text and UI components). Provide a high-contrast theme that meets AAA where practical. Colour must never be the only carrier of meaning; pair it with icons and text.

### 1.5 Pattern language (originality rule)
Create a small original motif set: thin-line contour and grid patterns, and a six-node radial mark for the six life areas. Any cultural inspiration (for example, traditional folk line-art) must be original abstraction, not reproduction of a specific artwork, and must be recorded in `docs/design/MOTIF_NOTES.md` with the design rationale. Use motifs at low opacity as texture, never behind body text.

### 1.6 Typography
- Self-host open-licence fonts. Latin: a humanist sans with strong legibility at small sizes. Devanagari: Noto Sans Devanagari or an equivalent with matched weights. Bengali and Tamil: Noto counterparts. Verify licences and file sizes; subset where possible.
- Define a fluid type scale using `clamp()`. Body minimum 17px on mobile; respect user font-size settings.
- Set line-height per script. Devanagari and Bengali need more line-height than Latin; test this explicitly.
- Never truncate a heading in a way that hides meaning. Long translations (Tamil and Devanagari often run longer) must reflow without breaking cards.

---

## 2. Motion system

### 2.1 Principles
1. **Purposeful:** every animation answers one of: where did this come from, what changed, what can I do next, did it work, where am I.
2. **Short:** UI transitions 150 to 320 ms. Page or view transitions up to 450 ms. Nothing over 600 ms outside the hero.
3. **Eased, not bouncy:** use ease-out for entrances and ease-in-out for movement. No spring overshoot on public-service screens.
4. **Interruptible:** a user action always wins. Pressing a button mid-animation must respond immediately.
5. **Respectful:** honour `prefers-reduced-motion` by replacing motion with instant state changes or simple opacity fades. Honour a user "Calm motion" setting that exists independently of the OS setting.
6. **Mode-aware:** Standard uses the full motion set below. Simple mode uses only functional motion (state changes, focus, progress). Assisted mode uses step transitions only, with no parallax or ambient motion.
7. **Performance-first:** animate only `transform` and `opacity`. Avoid animating layout properties. Use `will-change` sparingly and remove it after the animation.

### 2.2 Required motion set (Standard mode)
| Moment | Motion | Purpose |
|---|---|---|
| First load | Staggered reveal of headline, search, then life-area nodes (total under 900 ms) | Establish hierarchy |
| Search focus | Search field expands slightly; suggestions fade and slide in from the field | Show where results come from |
| Typing results | Results reorder with a smooth FLIP transition; matched text briefly highlights | Show what changed |
| Life-area node hover or focus | Node lifts with subtle depth shadow and reveals a one-line summary | Preview without navigating |
| Entering a life area | Shared-element transition from node to the area page (View Transitions API, with fallback) | Show continuity |
| Service card list | Cards reveal on scroll, once, with a small vertical offset | Pace the content |
| Verified badge | Teal check draws in once; the date fades in beside it | Make verification feel earned and visible |
| Save action | Bookmark fills with a short scale and colour change; a brief confirmation appears at the bottom | Confirm without a modal |
| Outbound link | A short "You are leaving to the official website of {provider}" sheet slides up before navigation | Protect the user and reinforce the independent-guide status |
| Journey or steps | A progress line fills as the user moves through steps; the current step is highlighted | Show position in a process |
| Page loading | Skeletons shaped like the real content, with a gentle shimmer; no spinners on text content | Reduce perceived wait |
| Error and empty states | Single icon animates once (for example a map pin settling); message and next step appear | Calm recovery |

### 2.3 Scroll behaviour
- Use scroll-linked motion sparingly: a progress indicator in the header, and one scroll-driven section on the home page that reveals the six-node system as the user scrolls.
- Never hijack scrolling. Never use scroll-jacking.
- Sticky elements must not cover focused content (check with keyboard navigation).

### 2.4 Libraries (propose; record each in an ADR)
- `motion` (formerly Framer Motion) for React component animation, layout transitions, and gestures. Verify licence, bundle size, and tree-shaking.
- Native View Transitions API with a graceful fallback.
- CSS for simple hover, focus, and reveal states, which costs nothing at runtime.
- GSAP only if a scroll-driven sequence cannot be achieved cleanly otherwise. Justify in an ADR, because it adds weight.
- Avoid large Lottie files. If Lottie is used, keep each animation under 40 KB and lazy-load it.

---

## 3. Depth and 3D

### 3.1 Where 3D is allowed
Exactly two places in Standard mode, and nowhere else:
1. **Hero system:** a 3D or pseudo-3D arrangement of six life-area nodes around a central "you are here" point, slowly drifting, responding to pointer or device tilt. Clicking a node moves the camera toward it and opens the area.
2. **Journey view:** a shallow 3D path or stacked-layer depth effect behind a multi-step guide, purely decorative and disabled in Simple and Assisted modes.

### 3.2 Technical approach
- Prefer **CSS 3D transforms** (`perspective`, `transform-style: preserve-3d`) for the hero nodes. This is cheap and works on low-end devices. Use this as the baseline.
- Offer a **WebGL scene** (Three.js via React Three Fiber, or an equivalent maintained library) as an enhancement only when all of these hold: the user is in Standard mode, reduced motion is off, the device has at least 4 logical cores and reports reasonable memory where the browser exposes it, and the measured frame rate over the first two seconds stays above 45 fps. If any condition fails, fall back to CSS 3D automatically, silently.
- Load the WebGL scene with dynamic import, after first contentful paint. It must never sit on the critical rendering path.
- Cap the WebGL scene at 60 draw calls, one light source, no post-processing passes, a pixel-ratio cap of 1.5, and a pause when the tab is hidden or the hero is off-screen (IntersectionObserver).
- Use simple geometry (spheres, rings, thin lines). No large textures or GLTF models above 200 KB. Compress and self-host everything.
- Provide a static SVG poster of the hero as the no-JavaScript and reduced-motion fallback, with identical content.

### 3.3 Depth rules
- Depth must reinforce hierarchy: nearer elements are the active task, further elements are context.
- Shadows are soft, low-opacity, and used to show elevation changes, not decoration.
- No glass blur behind text. If a translucent surface is used, the text behind must still meet contrast in the worst case.

---

## 4. Layout and information design

### 4.1 Home page (rebuild)
Keep the current content order, with these changes:
1. **Hero:** headline, one plain-language sentence, search as the dominant element, and the 3D or CSS system beside it on desktop and below it on mobile.
2. **"What would you like to do?":** six to eight goal-phrased entries (for example "Get a birth certificate", "Find a scholarship", "Check my ABHA card"), not department names. Goal-phrased entries are more useful than area names here.
3. **The six life areas:** presented as the connected system from the hero, not as six identical cards. Each area shows its name, one plain line, the verification type badge, and a count of verified services.
4. **Trust strip:** independent-guide status, zero advertising, zero data sharing, and "last catalogue update" with a real date. This strip is always visible at the top, unchanged in meaning.
5. **Footer:** feedback and correction link, privacy notice, accessibility statement (draft until reviewed), and the independence statement.

### 4.2 Service detail page
- Above the fold: service name, plain summary, verified badge with date, the single primary action "Go to the official website", and provider name.
- Below: what you may need, eligibility information (informational only, with "check on the official site"), fees only if sourced, steps as a numbered, animated progress list, and a "Report an issue" link.
- The outbound-link sheet is mandatory before leaving.

### 4.3 Explore and Life Navigator
- Explore: a filter rail (desktop) or a bottom sheet (mobile), with clear active filter chips and a result count.
- Life Navigator: a guided, question-based route ("What is your goal? Where are you? What do you already have?") that narrows to services. This is the Assisted-mode flagship. Show progress and let users go back without losing answers.

### 4.4 Responsive rules
- Design mobile-first at 360 px. Verify at 320, 360, 390, 768, 1024, 1440 px and at 200% text zoom.
- Touch targets at least 48 × 48 px for primary actions.
- Navigation: bottom bar on mobile (Home, Explore, Saved, Help), top navigation on desktop.
- No horizontal scrolling at any width, except deliberately scrollable chip rows with visible affordance.

### 4.5 Mode differences (the same product, three presentations)
| Element | Standard | Simple | Assisted |
|---|---|---|---|
| Decorative 3D | On (WebGL or CSS) | Off | Off |
| Ambient motion | Subtle drift | Off | Off |
| Functional motion | Full | Reduced | Step transitions only |
| Text size | Base | Base +2 steps | Base +1 step |
| Choices per screen | Up to 8 | Up to 4 | One primary question |
| Language of labels | Standard terms with plain explanations on hover and focus | Plain language only | Plain language with step-by-step explanation |

---

## 5. Internationalisation and global readiness

### 5.1 Structure
- All strings externalised. ICU message format. No concatenated sentences.
- Locale-aware dates, numbers, currency, and sorting.
- Script-aware typography (Section 1.6).
- RTL support tested with a pseudo-locale and a real RTL language before adding one. Mirror directional icons and progress motion; do not mirror logos, maps, or numerals.
- Test every layout with a pseudo-locale that expands strings by 40% and adds diacritics.

### 5.2 Country packs (for global expansion)
Design the visual system so a country pack can supply: its catalogue, its launch languages, its font fallback stack, its official-domain allow-list, and its neutral accent colour variant. A country pack must not change the trust strip, the independence statement, or the outbound-link sheet. Those are fixed across all countries.

### 5.3 India-first specifics
- Launch languages: English, हिंदी, বাংলা, தமிழ் (already in the build). Each needs a reviewed type specimen and a screenshot test.
- Address mobile-data realities: the whole home page must render usefully within 1.5 MB on first load on a throttled connection, with the 3D enhancement excluded from that budget.
- Consider feature-phone-adjacent users: the Simple mode must remain fully usable with a keyboard-only and screen-reader setup.

---

## 6. Accessibility and performance (non-negotiable)

### 6.1 Accessibility
- WCAG 2.2 AA throughout; the motion system must not violate WCAG 2.3.3 (Animation from Interactions) or 2.2.2 (Pause, Stop, Hide) for any auto-playing motion. The ambient hero drift must have a visible pause control and must stop automatically after 5 seconds if the user has not interacted, unless the user chose otherwise.
- Keyboard: every 3D node reachable and operable from the keyboard with a visible focus ring, with the same behaviour as pointer users.
- Screen readers: the 3D hero has a text equivalent describing the six areas and how to navigate them; decorative canvas is `aria-hidden`; state changes (saved, link opened, step changed) use polite live regions.
- Test with NVDA on Windows, TalkBack on Android, and keyboard-only, and record results in `ACCESSIBILITY.md`.

### 6.2 Performance budgets (enforce in CI)
- Home page first load JavaScript: under 150 KB compressed, excluding the optional WebGL chunk.
- WebGL chunk: loaded only when conditions in Section 3.2 are met; under 250 KB compressed.
- Largest Contentful Paint under 2.5 s on a mid-range Android device over throttled 4G.
- Interaction to Next Paint under 200 ms for every control.
- Cumulative Layout Shift under 0.1, including during entrance animations (animate transforms, reserve space).
- Maintain 60 fps for UI transitions on the reference mid-range device; if a transition drops below 50 fps, simplify it automatically.

Record measurements in `PERFORMANCE_REPORT.md` with device, network profile, and date.

---

## 7. Trust, honesty, and anti-patterns

- The independent-guide status must remain visible on every page at a size and contrast no smaller than the current build.
- No animation may imply that a service is live, submitted, or completed unless it is. Use "Go to official site" language, never "Applying..." or "Submitted".
- Verification badges must show the actual verification date. A badge without a date is not allowed.
- Saved items are stored on the device. Show this on the Saved page with the "clear my data" control.
- No fake progress bars, fake "loading your results" theatre, or fake counters.
- No auto-playing sound, no notifications to attract return visits, and no streaks, points, or badges for engagement.

---

## 8. Known issues to fix in this overhaul

1. The verification chip on the "Mobility & Transport" card reads **"VERIFIED MORTH LINKS"**. It should be "VERIFIED ROAD LINKS" or a correct equivalent; confirm the wording with the human and check every chip for similar errors.
2. The category chips on the six cards are inconsistent in meaning: "Official portals", "Official information", "No financial storage", "Verified links", "State & municipal portals". Define a fixed set of verification-type labels with one meaning each, and document them in `CATALOGUE_GOVERNANCE.md`.
3. The "Install" banner occupies the top of the page on first load and competes with the trust strip. Move install prompting to after the first successful service view, or to a non-blocking location, and make it dismissible permanently.
4. The hero badge "IN India-First Unified Public Life Services Guide" uses a small country code "IN" as a visual element. Replace with a clear text label or an icon with an accessible name.
5. Card headings wrap unevenly across cards. Set a consistent two-line heading rule with reserved height.
6. Cards in the grid have inconsistent visual weight between "Explore area" links and empty space. Align links to the bottom edge of each card.

---

## 9. Deliverables

1. Updated `UI_UX_GUIDELINES.md` and `DESIGN_SYSTEM.md` with the new token set, motion specification, and mode matrix.
2. `docs/design/MOTION_SPEC.md`: every animation in Section 2.2 with duration, easing, reduced-motion fallback, and mode behaviour.
3. `docs/design/MOTIF_NOTES.md`: rationale and originality notes for every pattern and motif.
4. ADRs for: motion library choice; 3D approach (CSS-first with optional WebGL); font selection and licensing; View Transitions usage and fallback.
5. Before and after screenshots at 360, 768, and 1440 px in English and हिंदी, in Standard, Simple, and Assisted modes, saved under `docs/design/screenshots/`.
6. Motion and accessibility test results, including reduced-motion and 200% zoom checks, in `ACCESSIBILITY.md`.
7. Performance report against Section 6.2 budgets.
8. A short `CHANGELOG.md` entry describing what changed for users.

---

## 10. Process and checkpoints

1. **Plan first.** Produce a visual plan: the token set, a motion inventory matching Section 2.2, the 3D approach with the fallback logic, and a list of files to change. Wait for human approval before changing components.
2. **Foundation before flourish.** Implement tokens, typography, and the mode system first. Then layout. Then motion. Then 3D last, behind the feature checks.
3. **Compare, do not replace blindly.** Keep the current home page reachable behind a feature flag until the new version passes the acceptance checks, so the human can compare the two side by side.
4. **Inspect the real UI.** Open the running build in the browser at each viewport, in each mode, in each language, and in reduced-motion. Attach screenshots. Do not judge the result from code.
5. **Stop and ask** before adding any new dependency over the size budget, before changing any trust element, and before any change to legal or privacy text.

---

## 11. Acceptance checklist

- [ ] Home page feels distinct from a template at first glance; the hero and the six-area system are memorable.
- [ ] Every animation in the motion spec exists, respects reduced motion, and is disabled in Simple mode where specified.
- [ ] The 3D hero runs in Standard mode on a capable device, falls back to CSS 3D on a weaker device, and shows a static poster when JavaScript is unavailable.
- [ ] No animation delays a task or blocks input.
- [ ] Independent-guide status, verification dates, and the outbound-link sheet are present and more visible than before.
- [ ] All four launch languages render correctly at all viewports, with no clipped or overlapping text.
- [ ] Contrast passes WCAG 2.2 AA for every token pair, documented.
- [ ] Keyboard-only and NVDA or TalkBack walkthroughs of the home page, a service page, and the Saved page are recorded.
- [ ] Performance budgets in Section 6.2 are met and recorded.
- [ ] Known issues in Section 8 are fixed or logged in `KNOWN_ISSUES.md`.
- [ ] Human has reviewed before and after screenshots and approved the direction.
