# Style Guide

## Feel
Clean student-planner look: friendly, uncluttered, high contrast.

## Palette
- Background: `#f6f7fb` (light grey-blue)
- Surface/cards: `#ffffff`
- Text: `#1f2430`
- Accent (primary buttons, highlights): `#3b5bdb` (blue)
- Success (done tasks): `#2f9e44` (green)
- Warning (deadline soon): `#e8590c` (orange)
- Error messages: `#c92a2a` (red)

## Type
- System font stack (`system-ui, sans-serif`) — fast, native feel on phones.
- Base size 16px; task titles bold; deadlines smaller and coloured by urgency.

## Layout rules (mobile-first)
- One column on phones; content max-width ~640px centred on desktop.
- Big tap targets (min 44px tall) for buttons.
- Cards for tasks: title, deadline, owner, status badge, action button.

## Accessibility
- Every button has a clear text label (no icon-only buttons).
- Status is shown with words AND colour (not colour alone).
- Keyboard works: tab through controls, Enter activates.
- Page has one `<h1>` and logical heading order.

## States every screen must show
- **Empty** — "No tasks yet" + how to add one.
- **Loading** — brief "Loading…" if data read takes time.
- **Success** — the list updates immediately after an action.
- **Failure** — red inline message if saving/reading fails.
