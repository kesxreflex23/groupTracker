# Group Tracker — Keeping group projects on track

A beginner-built MVP for HackDev Build Quest (built with the Apexelerate
brief). Shows a group's tasks and deadlines on one simple page so nobody
has to dig through chat messages.

## What it does (version one)
- Add tasks with a title and deadline.
- Pick up a task (To do → In progress) and mark it done.
- Status badges: To do / In progress / Done (words AND colour).
- Deadline urgency: **Overdue** (red) and **Due soon** (orange).
- Student / Tutor view switcher (a **demo** — not real login).

## Honest limitations
- Tasks are saved in **this browser only** (localStorage) — they are NOT
  shared between people or devices. Real sharing needs a server (version two).
- The Tutor role is a visible switch, not security.
- No logins, no payments, no external services.

## How to run it
1. Download or clone this folder.
2. Double-click `index.html` — it opens in your browser. Nothing to install.
   (Optional: `npx serve .` then visit http://localhost:3000 for a local server.)

## Directory map
```
index.html      page structure (what you see)
styles.css      look and feel (mobile-first, accessibility rules)
app.js          behaviour + localStorage saving (the "storage layer")
docs/
  idea.md       original Apexelerate brief, unchanged
  brief.md      scope restated
  stack.md      stack decision + honest limits
  style.md      design rules
  roadmap.md    mission plan
  savefile.md   progress log with test results
missions/       one Mission Card per build step, each with a self-test
```

## Environment variables
None. Version one has no server and no secrets — nothing to configure.
If version two adds a server, a `.env.example` with names only will be
added here (real credentials never go in the repo).

## What was tested (2026-11-22)
- Syntax check on `app.js` with `node --check` — passed.
- Self-tests from missions 01–04 performed by the builder (Kesava):
  add task → refresh → task persists; status buttons cycle correctly;
  role switch persists; Overdue/Due soon labels show correctly.
- NOT verified: multi-user sharing (out of scope in v1 — no server).

## Known failure states handled
- Empty list → "No tasks yet" guidance.
- Empty task title → red inline error.
- Storage unavailable → visible error, app doesn't crash silently.
