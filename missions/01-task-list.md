# Mission Card 01 — Task list that survives a refresh

## 🎯 Goal
Build the first real version of the page:
a **group task list** where each task shows a **title and a deadline**,
plus an **"Add task"** form. Tasks are saved in the browser's
localStorage so they are still there after a refresh.

## 🚧 Limits (what this card does NOT include)
- No status buttons yet (pick up / done come in Mission 02).
- No roles, no styling polish beyond basic readable layout.
- No server, no login. Sample data only (fake module names).

## 🧪 Your self-test (do this yourself in the browser)
1. Open the page — you should see the empty state: "No tasks yet".
2. Add a task, e.g. title `Draft slides` and deadline `2026-11-30`.
3. It appears in the list. **Refresh the page (F5)** — it is still there. ✅
4. Try adding a task with an empty title — you should see an error message,
   not a broken empty task.

## 📂 Files this card creates
`index.html`, `styles.css`, `app.js`

## What you'll learn
How the three files divide the work (structure / looks / behaviour),
and how localStorage is the "storage layer" when there is no server.
