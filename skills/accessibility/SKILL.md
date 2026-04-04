---
name: accessibility
description: Accessibility (a11y) skill for writing inclusive, standards-compliant frontend code. Covers semantic HTML, ARIA roles and attributes, keyboard navigation, focus management, color contrast, screen reader support, and accessible patterns for common UI components.
---

# Accessibility (a11y) Skill

This skill guides the AI in writing and reviewing frontend code that meets accessibility standards — primarily WCAG 2.1 AA — so that interfaces work for all users, including those using screen readers, keyboard navigation, or other assistive technologies.

## Core Principles

- **Perceivable**: Information must be presentable to users in ways they can perceive.
- **Operable**: UI components must be operable via keyboard and other input methods.
- **Understandable**: Content and operation must be understandable.
- **Robust**: Content must be robust enough to be interpreted by assistive technologies.

## 1. Semantic HTML First

Prefer native HTML elements over custom ones. Native elements come with built-in accessibility semantics at no cost.

| Use this | Instead of |
|---|---|
| `<button>` | `<div onClick>` |
| `<a href>` | `<span onClick>` |
| `<nav>` | `<div id="nav">` |
| `<header>`, `<main>`, `<footer>` | `<div class="header">` etc. |
| `<ul>` / `<ol>` | `<div>` lists |
| `<table>` with `<th scope>` | CSS-grid fake tables |
| `<label for>` | Placeholder-only inputs |

- Use heading hierarchy (`<h1>` → `<h2>` → `<h3>`) logically, not for visual sizing.
- Use `<fieldset>` and `<legend>` for grouped form controls.

## 2. ARIA — Use Sparingly and Correctly

ARIA should supplement, not replace, native semantics. Follow the first rule of ARIA: **don't use ARIA if a native HTML element can do the job.**

### When to use ARIA
- Custom widgets with no native HTML equivalent (e.g., tabs, comboboxes, tree views, carousels)
- Dynamic content regions that update without a page reload

### Common ARIA patterns
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` for modals
- `role="alert"` or `aria-live="polite"` for status messages and notifications
- `aria-expanded`, `aria-controls` for disclosure patterns (accordions, dropdowns)
- `aria-haspopup`, `aria-expanded` for menu buttons
- `aria-label` or `aria-labelledby` when visible text label is absent
- `aria-describedby` for supplementary descriptions (e.g., input hints, error messages)
- `aria-current="page"` for active nav items
- `aria-hidden="true"` to hide decorative elements from screen readers

### ARIA don'ts
- Do not override native semantics unless necessary (e.g., `role="button"` on a `<button>` is redundant)
- Do not use `aria-label` on elements that already have visible text — use `aria-labelledby` instead
- Do not hide meaningful content with `aria-hidden="true"`

## 3. Keyboard Navigation

Every interactive element must be reachable and operable by keyboard alone.

- All interactive elements must be focusable. Use `tabindex="0"` to add non-native elements to tab order; never use `tabindex > 0`.
- Preserve natural DOM order for logical tab sequence.
- Implement correct keyboard interactions for custom widgets:
  - **Buttons**: `Enter` and `Space` activate
  - **Links**: `Enter` activates
  - **Menus**: arrow keys navigate items, `Escape` closes
  - **Dialogs**: `Escape` closes, focus is trapped inside while open
  - **Tabs**: arrow keys switch tabs, `Enter`/`Space` activates
  - **Comboboxes**: arrow keys navigate options, `Escape` collapses
- Do not use `outline: none` / `outline: 0` without providing a visible custom focus style.

## 4. Focus Management

- On modal open: move focus to the first focusable element inside the modal.
- On modal close: return focus to the element that triggered it.
- For page navigation (SPAs): move focus to the main heading or a skip-link target after route change.
- Trap focus inside modals and other overlay components while they are open.
- Use `focus()` programmatically when focus must move as a result of user interaction.

## 5. Color and Visual Design

- **Contrast ratio**: minimum 4.5:1 for normal text, 3:1 for large text (18pt / 14pt bold) — WCAG AA.
- Never rely on color alone to convey information (e.g., red = error). Always pair color with text, icons, or patterns.
- Ensure focus indicators are visible and have sufficient contrast against their background.
- Support `prefers-reduced-motion`: wrap animations in `@media (prefers-reduced-motion: no-preference)` or disable them when the preference is set.

## 6. Images and Media

- All meaningful `<img>` elements must have descriptive `alt` text.
- Decorative images must have `alt=""` (empty string, not omitted).
- Complex images (charts, diagrams) should have a long description via `aria-describedby` or adjacent text.
- Videos must have captions. Audio content must have transcripts.
- SVGs used as icons: add `aria-hidden="true"` if decorative; add `role="img"` and `aria-label` if meaningful.

## 7. Forms

- Every input must have a visible, associated `<label>` (use `for`/`id` pairing or wrap input in label).
- Do not use `placeholder` as a substitute for a label — placeholders disappear on input and have poor contrast.
- Associate error messages with inputs using `aria-describedby`.
- Mark required fields with `aria-required="true"` (or the native `required` attribute) and indicate this visually.
- On validation failure, move focus to the first invalid field or to an error summary.
- Group related inputs with `<fieldset>` and `<legend>`.

## 8. Dynamic Content and Live Regions

- Use `aria-live="polite"` for non-urgent updates (search results, status messages).
- Use `aria-live="assertive"` only for critical, time-sensitive alerts (use sparingly).
- Use `role="status"` for low-priority status updates.
- Use `role="alert"` for important errors or warnings.
- Ensure dynamically injected content (e.g., toast notifications, loading states) is announced to screen readers.

## 9. Common Component Patterns

### Modal / Dialog
```html
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Delete</h2>
  <!-- content -->
  <button>Cancel</button>
  <button>Delete</button>
</div>
```
- Trap focus inside. Return focus on close.

### Disclosure (Accordion)
```html
<button aria-expanded="false" aria-controls="section1-content">Section 1</button>
<div id="section1-content" hidden>...</div>
```

### Navigation with Current Page
```html
<nav aria-label="Main navigation">
  <a href="/home" aria-current="page">Home</a>
  <a href="/about">About</a>
</nav>
```

### Icon Button (no visible text)
```html
<button aria-label="Close">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>
```

### Skip Link
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content">...</main>
```
- Skip links should be the first focusable element on the page.
- Visible on focus, can be visually hidden at rest.

## 10. Testing Accessibility

When reviewing or generating code, verify against these checks:

- [ ] All interactive elements reachable and operable by keyboard
- [ ] No `outline: none` without a custom focus style
- [ ] All images have appropriate `alt` text
- [ ] All form inputs have associated labels
- [ ] Color contrast meets WCAG AA minimums
- [ ] ARIA attributes are valid and used correctly
- [ ] Dynamic content updates are announced via live regions
- [ ] Focus is managed correctly for modals and route changes
- [ ] Heading hierarchy is logical
- [ ] Page has a `<main>` landmark and skip link

## Standards Reference

- **WCAG 2.1 AA** — primary compliance target
- **WAI-ARIA 1.2** — ARIA roles, states, and properties
- **APG (ARIA Authoring Practices Guide)** — canonical patterns for custom widgets: https://www.w3.org/WAI/ARIA/apg/
