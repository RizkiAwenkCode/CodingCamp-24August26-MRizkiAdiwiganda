/* ═══════════════════════════════════════════════════════════════
   LIFE DASHBOARD — app.js
   Vanilla JS · localStorage · No frameworks
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   SECTION 1 — CINEMATIC INTRO
   State machine: initial → lightReveal → greeting → nameInput
                → nameSubmitted → confirmation → transition → home
   Returning:    initial → welcomeBack → transition → home
══════════════════════════════════════════════════════════════ */

(function introModule() {

  /* ── DOM refs ─────────────────────────────────────────── */
  const introEl       = document.getElementById('intro');
  const beamEl        = document.querySelector('.intro-beam');
  const wordHi        = document.getElementById('intro-hi');
  const wordWelcome   = document.getElementById('intro-welcome');
  const nameLine      = document.getElementById('intro-name-line');
  const nameInput     = document.getElementById('intro-name-input');
  const submitBtn     = document.getElementById('intro-submit-btn');
  const confirmEl     = document.getElementById('intro-confirm');
  const dashboardEl   = document.querySelector('.dashboard');
  const greetingNameEl = document.getElementById('greeting-name');

  /* ── Constants ────────────────────────────────────────── */
  const LS_KEY       = 'userName';
  const WORD_DELAY   = 300;   // ms between each word appearing
  const WORD_DUR     = 500;   // matches CSS transition duration
  const BEAM_DELAY   = 300;   // ms before beam fires
  const CONFIRM_HOLD = 1400;  // ms to hold confirmation before transitioning

  /* ── Detect reduced-motion preference ────────────────── */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Safe localStorage wrapper ────────────────────────── */
  function lsGet(key) {
    try { return localStorage.getItem(key); }
    catch (_) { return null; }
  }

  function lsSet(key, val) {
    try { localStorage.setItem(key, val); }
    catch (_) { /* storage unavailable — silently continue */ }
  }

  /* ── State ────────────────────────────────────────────── */
  let state = 'initial';

  function setState(next) {
    state = next;
    if (introEl) introEl.dataset.state = next;
  }

  /* ── Helpers ──────────────────────────────────────────── */

  // Reveal a .intro-word element (fade + rise)
  function showWord(el, delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        el.classList.add('intro-word--visible');
        setTimeout(resolve, WORD_DUR);
      }, delay);
    });
  }

  // Grow input width to match typed content
  function syncInputWidth() {
    const len = nameInput.value.length || nameInput.placeholder.length;
    // clamp between 2ch and 12ch
    nameInput.style.width = Math.min(Math.max(len, 2), 12) + 'ch';
  }

  // Write the personalized greeting into the homepage header
  function applyNameToHomepage(name) {
    if (!greetingNameEl) return;
    greetingNameEl.textContent = `Hi, ${name} 👋`;
  }

  // Reveal dashboard and remove intro from paint
  function revealHomepage() {
    setState('transition');

    // Let CSS opacity transition run (700ms), then fully remove intro
    const delay = reducedMotion ? 50 : 720;
    setTimeout(() => {
      setState('done');
      dashboardEl.classList.add('dashboard-visible');
    }, delay);
  }

  /* ── Sequence: full first-time onboarding ─────────────── */
  async function runFirstTimeSequence() {
    setState('lightReveal');

    // 1. Beam appears
    await new Promise((resolve) => {
      setTimeout(() => {
        beamEl.classList.add('intro-beam--active');
        setTimeout(resolve, reducedMotion ? 0 : 600);
      }, BEAM_DELAY);
    });

    // 2. "Hi,"
    setState('greeting');
    await showWord(wordHi, 0);

    // 3. "Welcome."
    await showWord(wordWelcome, WORD_DELAY);

    // 4. "Your name is ___"
    setState('nameInput');
    await showWord(nameLine, WORD_DELAY);

    // Focus the input after it becomes visible
    setTimeout(() => nameInput.focus(), 80);
  }

  /* ── Submit handler ───────────────────────────────────── */
  function handleSubmit() {
    const raw  = nameInput.value;
    const name = raw.trim();

    // Reject empty — shake the input
    if (!name) {
      nameInput.classList.remove('intro-name-input--shake');
      // Force reflow so the animation re-triggers on repeated attempts
      void nameInput.offsetWidth;
      nameInput.classList.add('intro-name-input--shake');
      nameInput.focus();
      return;
    }

    setState('nameSubmitted');

    // Persist (preserve user's capitalisation)
    lsSet(LS_KEY, name);
    applyNameToHomepage(name);

    // Hide input line, show confirmation
    nameLine.classList.remove('intro-word--visible');

    confirmEl.textContent = `Nice to meet you, ${name}.`;

    setTimeout(async () => {
      setState('confirmation');
      await showWord(confirmEl, 0);

      // Hold briefly, then transition to homepage
      setTimeout(revealHomepage, CONFIRM_HOLD);
    }, 200);
  }

  /* ── Sequence: short returning-user experience ─────────── */
  async function runReturningSequence(name) {
    setState('welcomeBack');

    applyNameToHomepage(name);

    // Re-use confirmEl to show the welcome-back message
    confirmEl.textContent = `Welcome back, ${name}.`;
    await showWord(confirmEl, reducedMotion ? 0 : 400);

    setTimeout(revealHomepage, reducedMotion ? 300 : 1600);
  }

  /* ── Input event wiring ────────────────────────────────── */
  function wireInputEvents() {
    nameInput.addEventListener('input', () => {
      syncInputWidth();
      // Clear shake class on new input
      nameInput.classList.remove('intro-name-input--shake');
    });

    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    });

    submitBtn.addEventListener('click', handleSubmit);

    // Remove shake class when animation ends
    nameInput.addEventListener('animationend', () => {
      nameInput.classList.remove('intro-name-input--shake');
    });
  }

  /* ── Boot ─────────────────────────────────────────────── */
  function boot() {
    // Guard: if intro element was somehow removed, just reveal dashboard
    if (!introEl || !dashboardEl) {
      if (dashboardEl) dashboardEl.classList.add('dashboard-visible');
      return;
    }

    wireInputEvents();

    const savedName = lsGet(LS_KEY);

    if (savedName) {
      // Returning user — short path
      runReturningSequence(savedName);
    } else {
      // First-time user — full sequence
      runFirstTimeSequence();
    }
  }

  // Run after DOM is ready (script is deferred by being at end of body)
  boot();

})(); // end introModule


/* ──────────────────────────────────────────────
   INJECT SVG GRADIENT for timer ring
────────────────────────────────────────────── */
(function injectSVGDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('hidden-defs');
  svg.innerHTML = `
    <defs>
      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#F66F00"/>
        <stop offset="100%" stop-color="#FCCC3C"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svg);
})();


/* ══════════════════════════════════════════════
   SECTION 2 — GREETING & CLOCK
══════════════════════════════════════════════ */
const clockTimeEl   = document.getElementById('clock-time');
const clockDateEl   = document.getElementById('clock-date');
const greetingEl    = document.getElementById('greeting-text');
const greetingSubEl = document.getElementById('greeting-sub');

const GREETINGS = [
  { range: [5,  12], text: 'Good morning ☀️',          sub: 'Start your day strong!'    },
  { range: [12, 17], text: 'Good afternoon 🌤️',        sub: 'Keep the momentum going!'  },
  { range: [17, 21], text: 'Good evening 🌇',           sub: 'Wind down and reflect.'    },
  { range: [21, 24], text: 'Good night 🌙',             sub: 'Rest well tonight.'        },
  { range: [0,   5], text: 'Burning midnight oil 🪔',   sub: 'Stay focused!'             },
];

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

function pad2(n) { return String(n).padStart(2, '0'); }

function updateClock() {
  const now  = new Date();
  const h    = now.getHours();
  const m    = now.getMinutes();
  const s    = now.getSeconds();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12  = h % 12 || 12;

  clockTimeEl.textContent =
    `${pad2(h12)}:${pad2(m)}:${pad2(s)} ${ampm}`;
  clockDateEl.textContent =
    `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  const match = GREETINGS.find(({ range }) => h >= range[0] && h < range[1]);
  const g     = match || GREETINGS[GREETINGS.length - 1];
  greetingEl.textContent    = g.text;
  greetingSubEl.textContent = g.sub;
}

updateClock();
setInterval(updateClock, 1000);


/* ══════════════════════════════════════════════
   SECTION 2B — THEME TOGGLE (dark / light)
══════════════════════════════════════════════ */
(function themeModule() {
  const LS_THEME = 'theme';
  const toggleBtn = document.getElementById('theme-toggle');

  // Apply theme to <html> and persist
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(LS_THEME, theme); } catch (_) {}
  }

  // Initialise from stored preference, fallback to system preference
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(LS_THEME); } catch (_) {}

    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  initTheme();
})();


/* ══════════════════════════════════════════════
   SECTION 3 — FOCUS TIMER
══════════════════════════════════════════════ */
const RING_CIRCUMFERENCE = 2 * Math.PI * 88; // ~553.27

const timerDisplayEl  = document.getElementById('timer-display');
const timerStartBtn   = document.getElementById('timer-start');
const timerResetBtn   = document.getElementById('timer-reset');
const timerSkipBtn    = document.getElementById('timer-skip');
const ringProgressEl  = document.getElementById('ring-progress');
const timerModeBadge  = document.getElementById('timer-mode-badge');
const sessionsCountEl = document.getElementById('sessions-count');
const modeBtns        = document.querySelectorAll('.mode-btn');

ringProgressEl.style.strokeDasharray = RING_CIRCUMFERENCE;

const timer = {
  total:       25 * 60,
  remaining:   25 * 60,
  running:     false,
  tick:        null,
  label:       'Focus',
  sessions:    0,
  sessionDate: null,
};

function loadTimerData() {
  const saved = JSON.parse(localStorage.getItem('timerData') || '{}');
  const today = new Date().toDateString();
  if (saved.sessionDate === today) {
    timer.sessions    = saved.sessions    || 0;
    timer.sessionDate = saved.sessionDate;
  }
  sessionsCountEl.textContent = timer.sessions;
}

function saveTimerData() {
  localStorage.setItem('timerData', JSON.stringify({
    sessions:    timer.sessions,
    sessionDate: new Date().toDateString(),
  }));
}

function renderTimer() {
  const m      = Math.floor(timer.remaining / 60);
  const s      = timer.remaining % 60;
  const ratio  = timer.remaining / timer.total;
  const offset = RING_CIRCUMFERENCE * (1 - ratio);
  timerDisplayEl.textContent             = `${pad2(m)}:${pad2(s)}`;
  ringProgressEl.style.strokeDashoffset  = offset;
}

function setTimerMode(minutes, label) {
  stopTimer();
  timer.total     = minutes * 60;
  timer.remaining = minutes * 60;
  timer.label     = label;
  timerModeBadge.textContent = label;
  timerStartBtn.textContent  = 'Start';
  renderTimer();
}

function startTimer() {
  if (timer.running) return;
  timer.running = true;
  timerStartBtn.textContent = 'Pause';
  timer.tick = setInterval(() => {
    if (timer.remaining <= 0) {
      clearInterval(timer.tick);
      timer.running = false;
      timerStartBtn.textContent = 'Start';
      if (timer.label === 'Focus') {
        timer.sessions++;
        sessionsCountEl.textContent = timer.sessions;
        saveTimerData();
        showNotification('Focus session complete! Take a break.', 'success');
      }
      return;
    }
    timer.remaining--;
    renderTimer();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer.tick);
  timer.running = false;
  timerStartBtn.textContent = 'Resume';
}

function stopTimer() {
  clearInterval(timer.tick);
  timer.running = false;
  timerStartBtn.textContent = 'Start';
}

function resetTimer() {
  stopTimer();
  timer.remaining = timer.total;
  renderTimer();
}

timerStartBtn.addEventListener('click', () => {
  if (timer.running) { pauseTimer(); } else { startTimer(); }
});

timerResetBtn.addEventListener('click', resetTimer);

timerSkipBtn.addEventListener('click', () => {
  stopTimer();
  timer.remaining = 0;
  renderTimer();
  if (timer.label === 'Focus') {
    timer.sessions++;
    sessionsCountEl.textContent = timer.sessions;
    saveTimerData();
  }
});

modeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modeBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    setTimerMode(Number(btn.dataset.minutes), btn.dataset.label);
  });
});

loadTimerData();
renderTimer();


/* ══════════════════════════════════════════════
   SECTION 4 — TO-DO LIST
   Features:
     • Duplicate prevention (case-insensitive)
     • Priority levels: high / medium / low
     • Filter by status (all / active / done) or priority
     • Sort by: added date / priority / alphabetical
══════════════════════════════════════════════ */
const todoInput        = document.getElementById('todo-input');
const todoAddBtn       = document.getElementById('todo-add-btn');
const todoListEl       = document.getElementById('todo-list');
const todoCountBadge   = document.getElementById('todo-count-badge');
const todoDoneText     = document.getElementById('todo-done-text');
const todoClearBtn     = document.getElementById('todo-clear-done');
const todoPriorityEl   = document.getElementById('todo-priority');
const todoSortEl       = document.getElementById('todo-sort');
const filterBtns       = document.querySelectorAll('.filter-btn');

/* edit modal */
const taskModal           = document.getElementById('task-modal');
const taskEditInput       = document.getElementById('task-edit-input');
const taskEditPriorityEl  = document.getElementById('task-edit-priority');
const taskModalCancel     = document.getElementById('task-modal-cancel');
const taskModalSave       = document.getElementById('task-modal-save');

/* Priority ordering for sort (lower number = higher priority) */
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

let tasks         = [];
let taskFilter    = 'all';
let taskSort      = 'added';
let editingTaskId = null;

/* ── Storage ─────────────────────────────────── */
function loadTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  // Migrate legacy tasks that have no priority field
  tasks.forEach((t) => { if (!t.priority) t.priority = 'medium'; });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* ── Duplicate check ─────────────────────────── */
function isDuplicate(text, excludeId = null) {
  const normalised = text.trim().toLowerCase();
  return tasks.some((t) =>
    t.id !== excludeId &&
    t.text.toLowerCase() === normalised
  );
}

/* ── CRUD ────────────────────────────────────── */
function addTask(text) {
  text = text.trim();
  if (!text) return;

  if (isDuplicate(text)) {
    showNotification('Task already exists.', 'error');
    return;
  }

  const priority = todoPriorityEl ? todoPriorityEl.value : 'medium';
  tasks.unshift({ id: Date.now(), text, done: false, priority });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  const t = tasks.find((t) => t.id === id);
  if (t) t.done = !t.done;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function openEditTask(id) {
  const t = tasks.find((t) => t.id === id);
  if (!t) return;
  editingTaskId = id;
  taskEditInput.value           = t.text;
  taskEditPriorityEl.value      = t.priority || 'medium';
  openModal(taskModal);
  taskEditInput.focus();
  taskEditInput.select();
}

function saveEditTask() {
  const t       = tasks.find((t) => t.id === editingTaskId);
  const newText = taskEditInput.value.trim();

  if (!t || !newText) {
    closeModal(taskModal);
    return;
  }

  // Block duplicate — allow keeping the same text on the same task
  if (newText.toLowerCase() !== t.text.toLowerCase() && isDuplicate(newText, editingTaskId)) {
    showNotification('Another task with that name already exists.', 'error');
    taskEditInput.focus();
    return;
  }

  t.text     = newText;
  t.priority = taskEditPriorityEl.value;
  saveTasks();
  renderTasks();
  closeModal(taskModal);
}

function clearDoneTasks() {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  renderTasks();
}

/* ── Filter + Sort pipeline ──────────────────── */
function getFilteredTasks() {
  switch (taskFilter) {
    case 'active': return tasks.filter((t) => !t.done);
    case 'done':   return tasks.filter((t) =>  t.done);
    case 'high':   return tasks.filter((t) => t.priority === 'high');
    case 'medium': return tasks.filter((t) => t.priority === 'medium');
    case 'low':    return tasks.filter((t) => t.priority === 'low');
    default:       return [...tasks];
  }
}

function getSortedTasks(list) {
  const sorted = [...list];
  switch (taskSort) {
    case 'priority':
      sorted.sort((a, b) =>
        (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1)
      );
      break;
    case 'alpha':
      sorted.sort((a, b) => a.text.localeCompare(b.text));
      break;
    case 'alpha-desc':
      sorted.sort((a, b) => b.text.localeCompare(a.text));
      break;
    case 'added':
    default:
      // Tasks are stored newest-first; no additional sort needed
      break;
  }
  return sorted;
}

/* ── Render ──────────────────────────────────── */
const PRIORITY_META = {
  high:   { label: 'High',   cls: 'priority-high'   },
  medium: { label: 'Med',    cls: 'priority-medium'  },
  low:    { label: 'Low',    cls: 'priority-low'     },
};

function renderTasks() {
  const filtered  = getFilteredTasks();
  const visible   = getSortedTasks(filtered);
  const total     = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const leftCount = total - doneCount;

  todoCountBadge.textContent = `${leftCount} left`;
  todoDoneText.textContent   = `${doneCount} of ${total} done`;
  todoListEl.innerHTML       = '';

  if (visible.length === 0) {
    const empty = document.createElement('li');
    empty.style.cssText =
      'text-align:center;color:var(--grey);font-size:0.75rem;' +
      'padding:1.5rem 0;list-style:none;font-family:var(--font-mono);' +
      'letter-spacing:0.08em;text-transform:uppercase;';
    empty.textContent =
      taskFilter === 'done'   ? 'No completed tasks yet.'        :
      taskFilter === 'active' ? 'No active tasks. Add one above!' :
      taskFilter === 'high'   ? 'No high-priority tasks.'         :
      taskFilter === 'medium' ? 'No medium-priority tasks.'       :
      taskFilter === 'low'    ? 'No low-priority tasks.'          :
                                'Your list is empty. Add a task!';
    todoListEl.appendChild(empty);
    return;
  }

  visible.forEach((task) => {
    const li = document.createElement('li');
    li.className  = `todo-item${task.done ? ' done' : ''} priority-item-${task.priority || 'medium'}`;
    li.dataset.id = task.id;

    /* Checkbox */
    const cb = document.createElement('input');
    cb.type      = 'checkbox';
    cb.className = 'todo-checkbox';
    cb.checked   = task.done;
    cb.setAttribute('aria-label', 'Mark task done');
    cb.addEventListener('change', () => toggleTask(task.id));

    /* Priority badge */
    const meta  = PRIORITY_META[task.priority] || PRIORITY_META.medium;
    const badge = document.createElement('span');
    badge.className   = `priority-badge ${meta.cls}`;
    badge.textContent = meta.label;
    badge.setAttribute('aria-label', `Priority: ${meta.label}`);

    /* Text */
    const span = document.createElement('span');
    span.className   = 'todo-task-text';
    span.textContent = task.text;

    /* Action buttons */
    const actions = document.createElement('div');
    actions.className = 'todo-item-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-action edit';
    editBtn.title     = 'Edit task';
    editBtn.innerHTML =
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
         <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
         <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
       </svg>`;
    editBtn.addEventListener('click', () => openEditTask(task.id));

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-action delete';
    delBtn.title     = 'Delete task';
    delBtn.innerHTML =
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
         <polyline points="3 6 5 6 21 6"/>
         <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
         <path d="M10 11v6"/><path d="M14 11v6"/>
         <path d="M9 6V4h6v2"/>
       </svg>`;
    delBtn.addEventListener('click', () => deleteTask(task.id));

    actions.append(editBtn, delBtn);
    li.append(cb, badge, span, actions);
    todoListEl.appendChild(li);
  });
}

/* ── Event wiring ────────────────────────────── */
todoAddBtn.addEventListener('click', () => {
  addTask(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask(todoInput.value);
    todoInput.value = '';
  }
});

todoClearBtn.addEventListener('click', clearDoneTasks);

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    taskFilter = btn.dataset.filter;
    renderTasks();
  });
});

todoSortEl.addEventListener('change', () => {
  taskSort = todoSortEl.value;
  renderTasks();
});

taskModalCancel.addEventListener('click', () => closeModal(taskModal));
taskModalSave.addEventListener('click', saveEditTask);
taskEditInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter')  saveEditTask();
  if (e.key === 'Escape') closeModal(taskModal);
});

loadTasks();
renderTasks();


/* ══════════════════════════════════════════════
   SECTION 5 — QUICK LINKS
══════════════════════════════════════════════ */
const linksGrid      = document.getElementById('links-grid');
const linksEmpty     = document.getElementById('links-empty');
const addLinkBtn     = document.getElementById('add-link-btn');

const linkModal       = document.getElementById('link-modal');
const linkModalTitle  = document.getElementById('link-modal-title');
const linkNameInput   = document.getElementById('link-name-input');
const linkUrlInput    = document.getElementById('link-url-input');
const linkIconInput   = document.getElementById('link-icon-input');
const linkModalCancel = document.getElementById('link-modal-cancel');
const linkModalSave   = document.getElementById('link-modal-save');

let links         = [];
let editingLinkId = null;

const DEFAULT_LINKS = [
  { id: 1, name: 'Google',  url: 'https://google.com',       icon: '🔍' },
  { id: 2, name: 'YouTube', url: 'https://youtube.com',      icon: '🎥' },
  { id: 3, name: 'GitHub',  url: 'https://github.com',       icon: '🐙' },
  { id: 4, name: 'Gmail',   url: 'https://mail.google.com',  icon: '📧' },
];

function loadLinks() {
  const saved = localStorage.getItem('quickLinks');
  links = saved ? JSON.parse(saved) : [...DEFAULT_LINKS];
  if (!saved) saveLinks();
}

function saveLinks() {
  localStorage.setItem('quickLinks', JSON.stringify(links));
}

function deleteLink(id) {
  links = links.filter((l) => l.id !== id);
  saveLinks();
  renderLinks();
}

function openEditLink(id) {
  const link = links.find((l) => l.id === id);
  if (!link) return;
  editingLinkId = id;
  linkModalTitle.textContent = 'Edit Quick Link';
  linkNameInput.value = link.name;
  linkUrlInput.value  = link.url;
  linkIconInput.value = link.icon || '';
  openModal(linkModal);
  linkNameInput.focus();
}

function saveLinkModal() {
  const name = linkNameInput.value.trim();
  let   url  = linkUrlInput.value.trim();
  const icon = linkIconInput.value.trim();

  if (!name || !url) {
    showNotification('Please fill in Name and URL.', 'error');
    return;
  }
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  if (editingLinkId !== null) {
    const link = links.find((l) => l.id === editingLinkId);
    if (link) { link.name = name; link.url = url; link.icon = icon || getFavicon(url); }
  } else {
    links.push({ id: Date.now(), name, url, icon: icon || getFavicon(url) });
  }
  saveLinks();
  renderLinks();
  closeModal(linkModal);
}

function getFavicon(url) {
  try {
    const domain = new URL(url).hostname;
    const map = {
      'google.com':       '🔍',
      'youtube.com':      '🎥',
      'github.com':       '🐙',
      'twitter.com':      '🐦',
      'x.com':            '🐦',
      'reddit.com':       '🤖',
      'netflix.com':      '🎬',
      'spotify.com':      '🎵',
      'mail.google.com':  '📧',
      'notion.so':        '📝',
      'figma.com':        '🎨',
      'linkedin.com':     '💼',
    };
    for (const key of Object.keys(map)) {
      if (domain.includes(key)) return map[key];
    }
  } catch (_) {}
  return '🌐';
}

function renderLinks() {
  linksGrid.innerHTML = '';

  if (links.length === 0) {
    linksEmpty.style.display = 'block';
    return;
  }
  linksEmpty.style.display = 'none';

  links.forEach((link) => {
    const item = document.createElement('div');
    item.className = 'link-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', link.name);

    item.innerHTML =
      `<span class="link-icon">${link.icon || '🌐'}</span>
       <span class="link-name">${escHtml(link.name)}</span>
       <div class="link-overlay">
         <button class="btn-action edit" title="Edit link" data-id="${link.id}">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
           </svg>
         </button>
         <button class="btn-action delete" title="Delete link" data-id="${link.id}">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
             <polyline points="3 6 5 6 21 6"/>
             <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
             <path d="M10 11v6"/><path d="M14 11v6"/>
             <path d="M9 6V4h6v2"/>
           </svg>
         </button>
       </div>`;

    item.addEventListener('click', (e) => {
      if (e.target.closest('.btn-action')) return;
      window.open(link.url, '_blank', 'noopener,noreferrer');
    });

    item.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.btn-action')) {
        e.preventDefault();
        window.open(link.url, '_blank', 'noopener,noreferrer');
      }
    });

    item.querySelector('[title="Edit link"]').addEventListener('click', (e) => {
      e.stopPropagation();
      openEditLink(link.id);
    });

    item.querySelector('[title="Delete link"]').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteLink(link.id);
    });

    linksGrid.appendChild(item);
  });
}

addLinkBtn.addEventListener('click', () => {
  editingLinkId = null;
  linkModalTitle.textContent = 'Add Quick Link';
  linkNameInput.value = '';
  linkUrlInput.value  = '';
  linkIconInput.value = '';
  openModal(linkModal);
  linkNameInput.focus();
});

linkModalCancel.addEventListener('click', () => closeModal(linkModal));
linkModalSave.addEventListener('click', saveLinkModal);

[linkNameInput, linkUrlInput, linkIconInput].forEach((input) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')  saveLinkModal();
    if (e.key === 'Escape') closeModal(linkModal);
  });
});

loadLinks();
renderLinks();


/* ══════════════════════════════════════════════
   SECTION 6 — MODAL HELPERS
══════════════════════════════════════════════ */
function openModal(modal) {
  modal.style.display      = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.style.display          = 'none';
  document.body.style.overflow = '';
  editingTaskId = null;
  editingLinkId = null;
}

[linkModal, taskModal].forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (linkModal.style.display === 'flex') closeModal(linkModal);
  if (taskModal.style.display === 'flex') closeModal(taskModal);
});


/* ══════════════════════════════════════════════
   SECTION 7 — TOAST NOTIFICATIONS
══════════════════════════════════════════════ */
let toastTimeout = null;

function showNotification(message, type = 'info') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = [
      'position:fixed',
      'bottom:1.5rem',
      'left:50%',
      'transform:translateX(-50%)',
      'padding:0.65em 1.4em',
      'border-radius:4px',
      'font-family:var(--font-mono)',
      'font-size:0.78rem',
      'letter-spacing:0.08em',
      'text-transform:uppercase',
      'font-weight:400',
      'z-index:800',
      'box-shadow:0 4px 20px rgba(76,40,6,0.15)',
      'transition:opacity 300ms ease',
      'pointer-events:none',
      'white-space:nowrap',
    ].join(';');
    document.body.appendChild(toast);
  }

  const palette = {
    success: { bg: '#1A7A4A', color: '#FFF7E9' },
    error:   { bg: '#C0392B', color: '#FFF7E9' },
    info:    { bg: '#111111', color: '#FFF7E9' },
  };
  const { bg, color } = palette[type] || palette.info;
  toast.style.background = bg;
  toast.style.color      = color;
  toast.textContent      = message;
  toast.style.opacity    = '1';

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}


/* ══════════════════════════════════════════════
   SECTION 8 — UTILITIES
══════════════════════════════════════════════ */
function escHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}
