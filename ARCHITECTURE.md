# ARCHITECTURE — how a request travels in Group Tracker

Version one has **no server**: the browser does everything. This file
explains the journey of one user action using the real file paths, then
describes what changes in version two.

## Version one (current): browser-only

```
┌──────────────────────────────────────────────┐
│ Browser (one tab)                            │
│                                              │
│ index.html   ← the screen (structure)        │
│    │                                         │
│    ├─ styles.css   ← how it looks            │
│    │                                         │
│    └─ app.js       ← the brain               │
│         │                                    │
│         ▼                                    │
│ localStorage  ← the storage ("D:\UITMCODESUMMIT"│
│   keys: group-tracker-tasks,    lives in the  │
│         group-tracker-role      browser)     │
└──────────────────────────────────────────────┘
```

### Journey: user clicks "Pick up"
1. **Screen** — the button lives in a task item rendered by
   `app.js` inside the `<ul id="task-list">` in `index.html`.
2. **Event** — `app.js` button click handler fires; it re-reads
   `localStorage` (`loadTasks()`) to work on the freshest data.
3. **Logic** — `nextTask()` in `app.js` flips the task's status
   `todo → inprogress` and sets `owner = "You"`.
4. **Storage** — `saveTasks()` writes the whole task array back to
   localStorage under `group-tracker-tasks`.
5. **Back to screen** — `render()` rebuilds the list; the badge
   changes to "In progress" (orange, styled in `styles.css`).
6. **Failure path** — if storage throws (blocked/private mode),
   the red error in `#load-error` (`index.html`) is shown instead.

### Why localStorage is the "database"
It's key→value storage inside the browser, private to that browser
profile. That's why tasks survive refresh but don't sync to a friend's
device — the honest limit recorded in `docs/stack.md`.

## Version two (planned): real sharing

```
index.html + app.js  →  fetch()  →  server (e.g. Node/Express)
                                      ├─ auth: real logins, roles
                                      ├─ permissions enforced HERE
                                      └─ database (shared tasks)
```
What changes: `loadTasks`/`saveTasks` become API calls; permission
checks move server-side (one student must not read another's data —
testable per the working agreement); roles become real sessions.
