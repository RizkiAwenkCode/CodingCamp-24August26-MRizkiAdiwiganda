/* ═══════════════════════════════════════════════════════════════
   LIFE DASHBOARD — app.js
   Vanilla JS · localStorage · No frameworks
═══════════════════════════════════════════════════════════════ */

'use strict';

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
   1. GREETING & CLOCK
══════════════════════════════════════════════ */
const clockTimeEl   = document.getElementById('clock-time');
const clockDateEl   = document.getElementById('clock-date');
const greetingEl    = document.getElementById('greeting-text');
const greetingSubEl = document.getElementById('greeting-sub');

const GREETINGS = [
  { range: [5,  12], text: 'Good morning \u2600\uFE0F',   sub: 'Start your day strong!'      },
  { range: [12, 17], text: 'Good afternoon \uD83C\uDF24\uFE0F', sub: 'Keep the momentum going!' },
  { range: [17, 21], text: 'Good evening \uD83C\uDF07',  sub: 'Wind down and reflect.'      },
  { range: [21, 24], text: 'Good night \uD83C\uDF19',    sub: 'Rest well tonight.'           },
  { range: [0,   5], text: 'Burning midnight oil \uD83D\uDD6F\uFE0F', sub: 'Stay focused!'  },
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
  const g = match || GREETINGS[GREETINGS.length - 1];
  greetingEl.textContent    = g.text;
  greetingSubEl.textContent = g.sub;
}

updateClock();
setInterval(updateClock, 1000);


/* ══════════════════════════════════════════════
   2. FOCUS TIMER
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
  total:    25 * 60,
  remaining: 25 * 60,
  running:  false,
  tick:     null,
  label:    'Focus',
  sessions: 0,
  sessionDate: null,
};

/* persist / restore session count */
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
  const m = Math.floor(timer.remaining / 60);
  const s = timer.remaining % 60;
  timerDisplayEl.textContent = `${pad2(m)}:${pad2(s)}`;

  const ratio   = timer.remaining / timer.total;
  const offset  = RING_CIRCUMFERENCE * (1 - ratio);
  ringProgressEl.style.strokeDashoffset = offset;
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
  if (timer.running) {
    pauseTimer();
  } else {
    startTimer();
  }
});

timerResetBtn.addEventListener('click', resetTimer);

timerSkipBtn.addEventListener('click', () => {
  stopTimer();
  timer.remaining = 0;
  renderTimer();
  // trigger completion
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
   3. TO-DO LIST
══════════════════════════════════════════════ */
const todoInput      = document.getElementById('todo-input');
const todoAddBtn     = document.getElementById('todo-add-btn');
const todoListEl     = document.getElementById('todo-list');
const todoCountBadge = document.getElementById('todo-count-badge');
const todoDoneText   = document.getElementById('todo-done-text');
const todoClearBtn   = document.getElementById('todo-clear-done');
const filterBtns     = document.querySelectorAll('.filter-btn');

/* edit modal */
const taskModal       = document.getElementById('task-modal');
const taskEditInput   = document.getElementById('task-edit-input');
const taskModalCancel = document.getElementById('task-modal-cancel');
const taskModalSave   = document.getElementById('task-modal-save');

let tasks       = [];
let taskFilter  = 'all';
let editingTaskId = null;

/* ── storage ── */
function loadTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* ── CRUD ── */
function addTask(text) {
  text = text.trim();
  if (!text) return;
  tasks.unshift({ id: Date.now(), text, done: false });
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
  taskEditInput.value = t.text;
  openModal(taskModal);
  taskEditInput.focus();
  taskEditInput.select();
}

function saveEditTask() {
  const t = tasks.find((t) => t.id === editingTaskId);
  if (t && taskEditInput.value.trim()) {
    t.text = taskEditInput.value.trim();
    saveTasks();
    renderTasks();
  }
  closeModal(taskModal);
}

function clearDoneTasks() {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  renderTasks();
}

/* ── render ── */
function getFilteredTasks() {
  if (taskFilter === 'active') return tasks.filter((t) => !t.done);
  if (taskFilter === 'done')   return tasks.filter((t) =>  t.done);
  return tasks;
}

function renderTasks() {
  const visible  = getFilteredTasks();
  const total    = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const leftCount = total - doneCount;

  todoCountBadge.textContent = `${leftCount} left`;
  todoDoneText.textContent   = `${doneCount} of ${total} done`;

  todoListEl.innerHTML = '';

  if (visible.length === 0) {
    const empty = document.createElement('li');
    empty.style.cssText = 'text-align:center;color:var(--clr-text-muted);font-size:0.85rem;padding:1.5rem 0;list-style:none;';
    empty.textContent = taskFilter === 'done' ? 'No completed tasks yet.' :
                        taskFilter === 'active' ? 'No active tasks. Add one above!' :
                        'Your list is empty. Add a task!';
    todoListEl.appendChild(empty);
    return;
  }

  visible.forEach((task) => {
    const li = document.createElement('li');
    li.className = `todo-item${task.done ? ' done' : ''}`;
    li.dataset.id = task.id;

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.className = 'todo-checkbox';
    cb.checked = task.done;
    cb.setAttribute('aria-label', 'Mark task done');
    cb.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'todo-task-text';
    span.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'todo-item-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-action edit';
    editBtn.title = 'Edit task';
    editBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
    editBtn.addEventListener('click', () => openEditTask(task.id));

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-action delete';
    delBtn.title = 'Delete task';
    delBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`;
    delBtn.addEventListener('click', () => deleteTask(task.id));

    actions.append(editBtn, delBtn);
    li.append(cb, span, actions);
    todoListEl.appendChild(li);
  });
}

/* ── events ── */
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

/* task modal events */
taskModalCancel.addEventListener('click', () => closeModal(taskModal));
taskModalSave.addEventListener('click', saveEditTask);
taskEditInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter')  saveEditTask();
  if (e.key === 'Escape') closeModal(taskModal);
});

loadTasks();
renderTasks();


/* ══════════════════════════════════════════════
   4. QUICK LINKS
══════════════════════════════════════════════ */
const linksGrid      = document.getElementById('links-grid');
const linksEmpty     = document.getElementById('links-empty');
const addLinkBtn     = document.getElementById('add-link-btn');

/* link modal */
const linkModal       = document.getElementById('link-modal');
const linkModalTitle  = document.getElementById('link-modal-title');
const linkNameInput   = document.getElementById('link-name-input');
const linkUrlInput    = document.getElementById('link-url-input');
const linkIconInput   = document.getElementById('link-icon-input');
const linkModalCancel = document.getElementById('link-modal-cancel');
const linkModalSave   = document.getElementById('link-modal-save');

let links       = [];
let editingLinkId = null;

const DEFAULT_LINKS = [
  { id: 1, name: 'Google',    url: 'https://google.com',    icon: '\uD83D\uDD0D' },
  { id: 2, name: 'YouTube',   url: 'https://youtube.com',   icon: '\uD83C\uDFA5' },
  { id: 3, name: 'GitHub',    url: 'https://github.com',    icon: '\uD83D\uDC19' },
  { id: 4, name: 'Gmail',     url: 'https://mail.google.com', icon: '\uD83D\uDCE7' },
];

/* ── storage ── */
function loadLinks() {
  const saved = localStorage.getItem('quickLinks');
  links = saved ? JSON.parse(saved) : [...DEFAULT_LINKS];
  if (!saved) saveLinks();
}

function saveLinks() {
  localStorage.setItem('quickLinks', JSON.stringify(links));
}

/* ── CRUD ── */
function addLink(name, url, icon) {
  name = name.trim();
  url  = url.trim();
  if (!name || !url) return false;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  links.push({ id: Date.now(), name, url, icon: icon.trim() || getFavicon(url) });
  saveLinks();
  renderLinks();
  return true;
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
      'google.com': '\uD83D\uDD0D', 'youtube.com': '\uD83C\uDFA5',
      'github.com': '\uD83D\uDC19',  'twitter.com': '\uD83D\uDC26',
      'x.com': '\uD83D\uDC26',        'reddit.com': '\uD83E\uDD16',
      'netflix.com': '\uD83C\uDFAC',  'spotify.com': '\uD83C\uDFB5',
      'mail.google.com': '\uD83D\uDCE7', 'notion.so': '\uD83D\uDCDD',
      'figma.com': '\uD83C\uDFA8',    'linkedin.com': '\uD83D\uDCBC',
    };
    for (const key of Object.keys(map)) {
      if (domain.includes(key)) return map[key];
    }
  } catch (_) {}
  return '\uD83C\uDF10';
}

/* ── render ── */
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

    item.innerHTML = `
      <span class="link-icon">${link.icon || '\uD83C\uDF10'}</span>
      <span class="link-name">${escHtml(link.name)}</span>
      <div class="link-overlay">
        <button class="btn-action edit" title="Edit link" data-id="${link.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-action delete" title="Delete link" data-id="${link.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>`;

    /* open URL on main click (not action buttons) */
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

/* ── events ── */
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
   5. MODAL HELPERS
══════════════════════════════════════════════ */
function openModal(modal) {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = '';
  editingTaskId = null;
  editingLinkId = null;
}

/* close on overlay click */
[linkModal, taskModal].forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

/* close on Escape key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (linkModal.style.display === 'flex') closeModal(linkModal);
    if (taskModal.style.display === 'flex') closeModal(taskModal);
  }
});


/* ══════════════════════════════════════════════
   6. TOAST NOTIFICATIONS
══════════════════════════════════════════════ */
let toastTimeout = null;

function showNotification(message, type = 'info') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = [
      'position:fixed', 'bottom:1.5rem', 'left:50%', 'transform:translateX(-50%)',
      'padding:0.7em 1.4em', 'border-radius:99px', 'font-family:Inter,sans-serif',
      'font-size:0.875rem', 'font-weight:500', 'z-index:200',
      'box-shadow:0 8px 24px rgba(0,0,0,0.4)', 'transition:opacity 300ms ease',
      'pointer-events:none', 'white-space:nowrap',
    ].join(';');
    document.body.appendChild(toast);
  }

  const palette = {
    success: { bg: '#43e97b', color: '#0a2e1a' },
    error:   { bg: '#ff5f6d', color: '#fff'    },
    info:    { bg: '#6c63ff', color: '#fff'    },
  };
  const { bg, color } = palette[type] || palette.info;
  toast.style.background = bg;
  toast.style.color       = color;
  toast.textContent       = message;
  toast.style.opacity     = '1';

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}


/* ══════════════════════════════════════════════
   7. UTILITIES
══════════════════════════════════════════════ */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
