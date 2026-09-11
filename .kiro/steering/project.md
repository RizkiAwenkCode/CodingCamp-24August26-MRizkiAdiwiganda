# Project: Life Dashboard

## What this project is

A "Todo List Life Dashboard" — a single-page, client-side-only web app that runs directly in the browser with no backend or build step required.

## Technical stack

- **HTML** — `index.html` (one file, all structure)
- **CSS** — `css/styles.css` (one file, all styles)
- **JavaScript** — `js/app.js` (one file, all logic)
- **Storage** — browser `localStorage` only
- **Fonts** — Google Fonts CDN: Playfair Display, DM Sans, DM Mono

## Folder rules (hard constraints)

- Only **1 CSS file** inside `css/`
- Only **1 JavaScript file** inside `js/`
- No additional files may be added inside those folders
- Do **not** create a build system, bundler, or test runner

## Features (MVP — all implemented)

1. **Cinematic intro** — first-load welcome with name input, persisted in localStorage
2. **Greeting + clock** — live 12h clock, date, time-of-day greeting, personalised with user name
3. **Focus timer** — 25min Pomodoro with Start/Pause/Resume/Reset/Skip; 3 modes (Focus 25m, Short 5m, Long 15m); SVG ring; daily session count persisted
4. **To-do list** — add/edit/delete tasks; duplicate prevention (case-insensitive); priority levels (high/medium/low); filter by status (all/active/done) and by priority; sort by added/priority/A-Z/Z-A; all data in localStorage
5. **Quick links** — add/edit/delete favourite URLs with emoji icons; 4 default links; opens in new tab; stored in localStorage

## localStorage keys

| Key | Purpose |
|---|---|
| `userName` | User's name from intro onboarding |
| `tasks` | Todo list tasks array |
| `timerData` | Sessions count + date |
| `quickLinks` | Quick links array |

## Browser compatibility

Chrome, Firefox, Edge, Safari (modern versions). Works as standalone web app.
