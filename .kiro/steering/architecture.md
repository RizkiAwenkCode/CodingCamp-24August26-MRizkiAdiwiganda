# Architecture & Code Rules

## File structure

```
index.html          — all HTML structure, modals, intro overlay
css/styles.css      — ALL styles (one file, no exceptions)
js/app.js           — ALL JavaScript (one file, no exceptions)
design.md           — Daylight brand specification (read-only reference)
.kiro/              — Kiro configuration
```

## HTML conventions

- One `<link>` to `css/styles.css`
- One `<script src="js/app.js">` at end of `<body>`
- Flash prevention: inline `<style>.dashboard { visibility: hidden; }</style>` in `<head>` — never remove this
- Intro overlay `#intro` must appear before `.dashboard` in DOM order
- All interactive elements need `aria-label` or visible label
- `aria-live` on clock, timer display, count badges

## JavaScript conventions

- `'use strict';` at top of file
- No frameworks, no imports, no build step
- Section order in `app.js`:
  1. Cinematic intro (IIFE `introModule`)
  2. SVG gradient injection (IIFE)
  3. Greeting & clock
  4. Focus timer
  5. To-do list
  6. Quick links
  7. Modal helpers
  8. Toast notifications
  9. Utilities (`escHtml`, `pad2`)
- Safe localStorage: always wrap in try/catch
- Never use `innerHTML` with unsanitised user input — use `escHtml()` or `textContent`

## Intro state machine

States (in order):
```
initial → lightReveal → greeting → nameInput → nameSubmitted → confirmation → transition → home
```
Returning user shortcut:
```
initial → welcomeBack → transition → home
```
- `lsGet('userName')` drives which path runs
- `applyNameToHomepage(name)` writes to `#greeting-name`
- Dashboard revealed by adding `.dashboard-visible` class — never by setting `visibility` directly in JS

## To-do list rules

- Duplicate check: `isDuplicate(text, excludeId)` — case-insensitive, fires toast on block
- Task object shape: `{ id: Date.now(), text, done: false, priority: 'medium' }`
- Legacy tasks without `priority` are migrated to `'medium'` on load
- Filter pipeline: `getFilteredTasks()` → `getSortedTasks(list)` → `renderTasks()`
- Priority order for sort: `high=0, medium=1, low=2`

## CSS conventions

- All design tokens in `:root` at top of file
- `--divider` token used for every structural line — never hardcode border values
- `.card` class is always reset to transparent/no-border — section-specific styles override it
- Intro and dashboard-reveal styles live at the bottom of the file, before responsive blocks
- Responsive breakpoints: `1100px`, `960px`, `640px`
- `prefers-reduced-motion` block at the very end

## What never to change

- localStorage key names (`userName`, `tasks`, `timerData`, `quickLinks`)
- All HTML element IDs — JS depends on every single one
- JS-generated class names (`todo-item`, `todo-checkbox`, `priority-badge`, `link-item`, etc.)
- The intro state machine flow
- The `escHtml()` utility
- Flash-prevention inline style in `<head>`
