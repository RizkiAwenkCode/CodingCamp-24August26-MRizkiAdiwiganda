# Requirements

Derived from the original project brief and all decisions made during this session.

---

## Technical Constraints

### TC-1 — Technology Stack
- HTML for structure
- CSS for styling
- Vanilla JavaScript only — no React, Vue, or any framework
- No backend server required
- No build tools, bundlers, or test runners

### TC-2 — Data Storage
- Browser `localStorage` API only
- All data stored client-side
- Safe access: all localStorage calls wrapped in try/catch

### TC-3 — Browser Compatibility
- Must work in: Chrome, Firefox, Edge, Safari (modern versions)
- Usable as a standalone web app (open `index.html` directly)

### TC-4 — Folder Rules (hard)
- Exactly **1 CSS file** inside `css/` — `css/styles.css`
- Exactly **1 JavaScript file** inside `js/` — `js/app.js`
- No additional files permitted inside those folders

---

## Non-Functional Requirements

### NFR-1 — Simplicity
- Clean, minimal interface
- No complex setup required
- No test setup required
- Open `index.html` in a browser and it works

### NFR-2 — Performance
- Fast load time — no bundling delay
- Responsive UI interactions — no noticeable lag
- Animations run at 60 FPS using `transform` and `opacity` only (GPU-friendly)
- No layout-triggering animation properties

### NFR-3 — Visual Design
- Daylight brand system (see `design.md`)
- Cardless editorial interface
- Bold 2px near-black dividers
- High saturation colour palette
- Clear typography hierarchy using Playfair Display / DM Sans / DM Mono
- Hardware-panel aesthetic on desktop: full viewport, no page scroll

### NFR-4 — Accessibility
- WCAG 2.1 AA target
- Full keyboard navigation
- Visible focus states (`outline: 2px solid var(--orange)`)
- Semantic HTML with correct heading order
- `aria-label` on all icon-only buttons
- `aria-live` on dynamic regions (clock, timer, task count)
- Touch targets ≥ 44×44px
- `prefers-reduced-motion` respected — all transforms and animations disabled

### NFR-5 — Responsive Behavior
- Desktop (≥960px): full-viewport hardware panel, no scroll
- Tablet (640–960px): 2-column grid, scroll restored, todo card full-width on top
- Mobile (<640px): single column stack, scroll, readable typography

---

## Functional Requirements

### FR-1 — Cinematic Intro (Welcome Experience)

**First-time users:**
- Initial screen is blank/dark (`#050505`)
- No flash of homepage content before intro completes
- Soft warm light beam sweeps in after ~300ms
- Text appears sequentially with 0.3s delay between each:
  - "Hi,"
  - "Welcome."
  - "Your name is [___]"
- Name input is visually fused into the display typography (no card/form)
- Input auto-focuses when visible
- Enter key or arrow button submits
- Empty name is rejected — input shakes, focus returns
- Name preserves the user's capitalisation
- Confirmation: "Nice to meet you, {name}."
- Seamless transition — homepage fades in, no page reload

**Returning users:**
- Short path: "Welcome back, {name}." then transition
- Full onboarding sequence is skipped
- Name persists via `localStorage` key `userName`

**State machine:**
```
First visit:  initial → lightReveal → greeting → nameInput → nameSubmitted → confirmation → transition → home
Returning:    initial → welcomeBack → transition → home
```

**Edge cases handled:**
- Empty name rejected gracefully
- Very long names (max 40 chars, `maxlength` attribute)
- localStorage unavailable (silent fallback)
- Mobile keyboard opening
- `prefers-reduced-motion`: animations removed, interaction flow preserved

---

### FR-2 — Greeting & Clock

- Displays current time in 12-hour format with seconds (e.g. `09:41:05 AM`)
- Updates every second via `setInterval`
- Displays current day, month, date, year
- Greeting label changes based on time of day:
  - 05:00–11:59 → "Good morning ☀️"
  - 12:00–16:59 → "Good afternoon 🌤️"
  - 17:00–20:59 → "Good evening 🌇"
  - 21:00–23:59 → "Good night 🌙"
  - 00:00–04:59 → "Burning midnight oil 🪔"
- Greeting headline personalised: "Hi, {name} 👋" (set by intro, persists on return)

---

### FR-3 — Focus Timer

- Default mode: 25-minute Pomodoro
- Three modes selectable at any time:
  - Focus — 25 minutes
  - Short Break — 5 minutes
  - Long Break — 15 minutes
- Controls:
  - **Start** — begins countdown
  - **Pause** — pauses, button changes to "Resume"
  - **Resume** — continues from where paused
  - **Reset** — returns to full duration for current mode, stops countdown
  - **Skip** — immediately triggers session completion for current mode
- Animated SVG ring shows remaining time proportion
- Ring gradient: orange → yellow
- Timer display: large Playfair Display numerals, `MM:SS` format
- Mode badge updates to reflect current mode
- On Focus session completion:
  - Counter increments
  - Toast notification fires: "Focus session complete! Take a break."
- Daily session count persisted in `localStorage` key `timerData`
- Session count resets on a new calendar day

---

### FR-4 — To-Do List

#### Adding tasks
- Text input + priority selector + add button in a single flush row
- Add via button click or Enter key
- Input cleared and re-focused after successful add
- **Duplicate prevention**: case-insensitive match against existing tasks — blocked with toast "Task already exists."
- Priority levels: High / Medium (default) / Low

#### Task object shape
```json
{ "id": 1234567890, "text": "Task text", "done": false, "priority": "medium" }
```

#### Editing tasks
- Edit button opens modal with current text and priority pre-filled
- Save via button or Enter key, cancel via button or Escape key
- Duplicate check on edit (excluding the task being edited)
- Blocked duplicate shows toast "Another task with that name already exists."

#### Completing tasks
- Checkbox marks task done
- Done tasks shown with strikethrough, reduced opacity
- Checkbox re-clicking un-completes a task

#### Deleting tasks
- Delete button (visible on row hover) removes task immediately
- "Clear done" button removes all completed tasks at once

#### Filtering
- All / Active / Done (status filters)
- 🔴 High / 🟡 Med / 🟢 Low (priority filters)
- All six filters are mutually exclusive pill buttons

#### Sorting
- Added (newest first — default)
- Priority (High → Medium → Low)
- A → Z (locale-aware alphabetical)
- Z → A (locale-aware reverse alphabetical)
- Sort applies after filter

#### Persistence
- All tasks stored in `localStorage` key `tasks`
- Legacy tasks without `priority` field migrated to `'medium'` on load

---

### FR-5 — Quick Links

- 2×N grid of link tiles
- Default links on first load: Google, YouTube, GitHub, Gmail
- Each link: emoji icon + name label
- Click opens URL in new tab (`noopener,noreferrer`)
- Keyboard accessible (Enter or Space activates)

#### Adding links
- "+ Add" button opens modal
- Fields: Label (required), URL (required), Emoji/Icon (optional)
- URL auto-prefixed with `https://` if protocol missing
- Emoji auto-assigned based on known domain map if no icon provided
- Fallback emoji: 🌐

#### Editing links
- Edit button (visible on tile hover) pre-fills modal
- Saves changes in place

#### Deleting links
- Delete button (visible on tile hover) removes immediately

#### Persistence
- Stored in `localStorage` key `quickLinks`
- Default links written to storage on first visit

---

### FR-6 — Modals

- Two modals: Edit Task, Add/Edit Link
- Open via `openModal()`, close via `closeModal()`
- Close on: Cancel button, Escape key, clicking the overlay backdrop
- Scroll lock on `<body>` while modal is open
- Slide-up entrance animation
- Flat panel design, no border-radius, bold border

---

### FR-7 — Toast Notifications

- Single reusable `showNotification(message, type)` function
- Types: `success` (green), `error` (red), `info` (near-black)
- Appears bottom-centre, auto-dismisses after 3 seconds
- Mono uppercase typography to match design system
- Never blocks interaction (pointer-events: none)
