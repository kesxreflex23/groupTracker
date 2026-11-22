# Project Brief — Keeping Group Projects on Track

## Problem
Group projects stall because tasks and deadlines live in scattered messages.
Nobody can see, at a glance, what is due and who is on it.

## Product (MVP)
A simple group task board: a list of tasks with owners and deadlines,
kept visible so the whole team knows what is next.

## First-release outcome
**Keep a group task and deadline visible.** A student opens the page and
immediately sees the tasks, their deadlines, and their status.

## Users and permissions
- **Student** — sees tasks, picks one up ("choose an option"), marks it done.
- **Tutor** — same view for now; a tutor-flavoured badge/notice is a demo feature.

## Scope and constraints
- Must work on a phone (responsive layout).
- No payment, no login system in version one.
- Sample data only — no real personal details.

## Main user journey
1. Open the page → see the task list (or a friendly empty state).
2. Choose an option (e.g. pick up a task, or mark it done).
3. Confirm → see the result update immediately.

## Failure cases to handle
- No tasks yet → empty state with guidance.
- Save fails (storage unavailable) → visible error message.
- Wrong/empty input when adding a task → useful feedback.

## Acceptance test (the one that matters)
On a phone-sized window: add a task with a deadline, refresh the page,
and the task is still there with the correct deadline shown.
