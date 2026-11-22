# Stack Decision — smallest practical version

## Proposal: browser-only app (no server, no database)

Your brief mentions students *and* tutors sharing one view. A true shared
multi-user app needs a login system and a database (a running server).
That is a big jump for version one, so here is the simpler version —
**it runs fully in the browser and needs no installs beyond what you already have.**

| Layer | Choice | Plain-language role |
|---|---|---|
| Interface | Plain HTML + CSS + JavaScript (no frameworks) | The page you see and tap |
| Storage | Browser `localStorage` | Saves tasks on *this device* so they survive a refresh |
| Server | None | Nothing to deploy or pay for |
| Logins | None (demo "Student / Tutor" role switcher) | Demonstrates the roles from your brief |

### What this means honestly
- ✅ Works on a phone and desktop, offline, free.
- ✅ Tasks survive refresh and closing the browser (on that device).
- ⚠️ Tasks are **not shared** between different people/devices — real sharing
  needs a server + database, which we save for version two.
- ⚠️ No real login — roles are a visible demo switch, not security.

### File layout
```
index.html      the whole interface
styles.css      look and feel (mobile-first)
app.js          behaviour + localStorage saving
docs/           planning and progress notes
missions/       one Mission Card per build step
```

**Run it:** just open `index.html` in a browser — no commands needed.

If you want the shared-server version instead, say so and we will plan that.
