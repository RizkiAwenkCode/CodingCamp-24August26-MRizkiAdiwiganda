# Working Agreements

## Before making any change

1. Read the file you are about to edit — never modify code you haven't seen
2. Check all HTML element IDs used in JS before touching HTML
3. Check all JS-generated class names before touching CSS
4. Run `node --check js/app.js` after every JS change
5. Verify folder rules: exactly 1 file in `css/`, exactly 1 file in `js/`

## Scope discipline

- A visual change goes in `css/styles.css` only
- A structural change goes in `index.html` only
- A logic/behaviour change goes in `js/app.js` only
- Never duplicate functionality across files
- Do not add new files inside `css/` or `js/`

## CSS changes

- Update `--divider`, palette tokens, or spacing tokens at the `:root` level — not scattered inline
- Use `str_replace` for targeted edits; use `fs_write` only when rewriting the full file
- After a full rewrite, verify every JS-generated class name still exists in the new CSS

## JS changes

- Only Section 4 (To-do list) owns task state — do not scatter task logic elsewhere
- Only the `introModule` IIFE owns the intro sequence — do not modify it from other sections
- `showNotification()` is the only toast entry point — reuse it, don't create alternatives
- `openModal()` / `closeModal()` are the only modal helpers — always use them

## HTML changes

- Never remove or rename an element ID
- Never change `<script src="js/app.js">` or `<link href="css/styles.css">`
- Never remove the inline flash-prevention `<style>` block in `<head>`
- New modal structures follow the existing pattern: `.modal-overlay > .modal`

## Verification checklist before finishing any task

- [ ] JS syntax: `node --check js/app.js` passes
- [ ] All `getElementById` calls in JS have matching `id` in HTML
- [ ] All JS-generated class names exist in CSS
- [ ] `css/` contains exactly 1 file
- [ ] `js/` contains exactly 1 file
- [ ] No stale `src="app.js"` or `href="styles.css"` root-level paths in HTML

## Preserving the intro

- Never remove `#intro` from the HTML
- Never remove the `data-state` attribute logic from `introModule`
- Never remove `.dashboard-visible` from CSS
- Returning users (`lsGet('userName')` returns a value) must always get the short path
- The name input must always auto-focus, reject empty strings, and persist to `localStorage`

## Accessibility minimums

- All buttons have `aria-label` if they contain only an icon
- Form inputs have `aria-label` or an associated `<label>`
- Dynamic regions use `aria-live`
- Focus styles use `outline: 2px solid var(--orange)` — never `outline: none`
- Touch targets are at minimum 44×44px height
- `prefers-reduced-motion` block in CSS disables all transform/animation transitions
