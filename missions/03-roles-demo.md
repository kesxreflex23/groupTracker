# Mission Card 03 — Roles demo (Student / Tutor)

## 🎯 Goal
A **Student / Tutor** switcher in the header. It changes the view:
- **Student** (default) — the normal task list.
- **Tutor** — shows a tutor notice ("Viewing as tutor — demo only")
  and highlights which tasks are picked up and done, so a tutor can
  see progress at a glance.
The chosen role is remembered after refresh (localStorage).

## 🚧 Limits
- This is a **demo**, not security: there is no password, and anyone can
  switch roles. Real login + server-side permissions is version two.
- No tutor-only editing in this card (adding tasks stays the same for both).

## 🧪 Your self-test
1. Page opens as **Student** (default).
2. Switch to **Tutor** → orange demo notice appears under the header.
3. **Refresh** → you are still Tutor (role remembered). ✅
4. Switch back to **Student** → notice disappears, view is normal.
