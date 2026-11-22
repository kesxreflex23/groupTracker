/* app.js — behaviour: read/write tasks in localStorage, render the list.
   Storage layer = browser localStorage (no server in version one). */

const STORAGE_KEY = "group-tracker-tasks";

// ---- storage helpers -------------------------------------------------
// localStorage can be blocked (private mode, settings), so every call is
// wrapped and failures are reported to the user instead of crashing.

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return null; // signals "could not read" to the caller
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (err) {
    return false;
  }
}

// ---- status model ------------------------------------------------------
// todo → inprogress → done. Owner is a demo name (no real login in v1).
const STATUS_LABELS = {
  todo: "To do",
  inprogress: "In progress",
  done: "Done",
};

function nextTask(tasks, id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  if (task.status === "todo") {
    task.status = "inprogress";
    task.owner = "You";
  } else if (task.status === "inprogress") {
    task.status = "done";
  }
  if (!saveTasks(tasks)) {
    loadErrorEl.textContent = "Could not save: storage is unavailable.";
    loadErrorEl.classList.remove("hidden");
    return;
  }
  render(tasks);
}

// ---- rendering -------------------------------------------------------

const listEl = document.getElementById("task-list");
const emptyEl = document.getElementById("empty-state");
const loadErrorEl = document.getElementById("load-error");
const loadingEl = document.getElementById("loading");

function render(tasks) {
  listEl.innerHTML = "";

  if (tasks.length === 0) {
    emptyEl.classList.remove("hidden");
    return;
  }
  emptyEl.classList.add("hidden");

  for (const task of tasks) {
    const li = document.createElement("li");
    li.className = "task-item" + (task.status === "done" ? " task-done" : "");

    const title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.title;

    const deadline = document.createElement("p");
    deadline.className = "task-deadline";
    deadline.textContent = "Due: " + formatDeadline(task.deadline);

    const urgency = deadlineUrgency(task);
    if (urgency) {
      const urgent = document.createElement("span");
      urgent.className = "urgent " + urgency.cls;
      urgent.textContent = urgency.label;
      deadline.append(" ", urgent);
    }

    // Status badge: words AND colour (style.md accessibility rule).
    const status = task.status || "todo";
    const badge = document.createElement("span");
    badge.className = "badge badge-" + status;
    badge.textContent = STATUS_LABELS[status];

    li.append(badge, title, deadline);

    // Pick up (todo) → Mark done (inprogress). Done tasks get no button.
    if (status !== "done") {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-secondary";
      btn.textContent = status === "todo" ? "Pick up" : "Mark done";
      btn.addEventListener("click", () => {
        const fresh = loadTasks();
        if (fresh === null) {
          loadErrorEl.textContent = "Could not save: storage is unavailable.";
          loadErrorEl.classList.remove("hidden");
          return;
        }
        nextTask(fresh, task.id);
      });
      li.append(btn);
    }

    // Demo owner line (no real login in version one).
    if (task.owner) {
      const owner = document.createElement("p");
      owner.className = "task-owner";
      owner.textContent = "Picked up by " + task.owner;
      li.append(owner);
    }

    listEl.append(li);
  }
}

function formatDeadline(iso) {
  if (!iso) return "no deadline set";
  const date = new Date(iso + "T00:00:00");
  if (isNaN(date)) return iso;
  return date.toLocaleDateString(undefined, {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

// Urgency: words AND colour (style.md rule). Done tasks never warn.
function deadlineUrgency(task) {
  if (!task.deadline || task.status === "done") return null;
  const due = new Date(task.deadline + "T00:00:00");
  if (isNaN(due)) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysAway = Math.round((due - today) / (24 * 60 * 60 * 1000));
  if (daysAway < 0) return { label: "Overdue", cls: "urgent-overdue" };
  if (daysAway <= 7) return { label: "Due soon", cls: "urgent-soon" };
  return null;
}

// ---- first paint -----------------------------------------------------

const stored = loadTasks();
loadingEl.classList.add("hidden"); // reading localStorage is instant

if (stored === null) {
  loadErrorEl.textContent =
    "Could not read saved tasks (storage unavailable in this browser).";
  loadErrorEl.classList.remove("hidden");
  // Red-team fix: never show "No tasks yet" alongside a load error.
  emptyEl.classList.add("hidden");
  render([]);
} else {
  render(stored);
}

// ---- add-task form ---------------------------------------------------

const form = document.getElementById("add-task-form");
const titleInput = document.getElementById("task-title");
const deadlineInput = document.getElementById("task-deadline");
const formError = document.getElementById("form-error");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the browser reloading the page

  const title = titleInput.value.trim();
  if (!title) {
    formError.textContent = "Please give the task a title.";
    formError.classList.remove("hidden");
    titleInput.focus();
    return;
  }

  const deadline = deadlineInput.value;
  if (deadline && isNaN(new Date(deadline + "T00:00:00"))) {
    formError.textContent = "That deadline date is not valid.";
    formError.classList.remove("hidden");
    deadlineInput.focus();
    return;
  }

  formError.classList.add("hidden");

  const tasks = loadTasks();
  if (tasks === null) {
    formError.textContent = "Could not save: storage is unavailable.";
    formError.classList.remove("hidden");
    return;
  }

  tasks.push({
    id: "t" + Date.now(), // unique enough for a single-browser demo
    title,
    deadline,
    status: "todo",
  });
  if (!saveTasks(tasks)) {
    formError.textContent = "Could not save: storage is unavailable.";
    formError.classList.remove("hidden");
    return;
  }

  // Success: update the list immediately and reset the form.
  render(tasks);
  form.reset();
  titleInput.focus();
});

// ---- roles demo (Student / Tutor) -------------------------------------
// A visible demo switch, NOT security — anyone can change roles.
// Real authentication + server-side permissions is version two.

const ROLE_KEY = "group-tracker-role";
const roleStudentBtn = document.getElementById("role-student");
const roleTutorBtn = document.getElementById("role-tutor");
const tutorNotice = document.getElementById("tutor-notice");

function setRole(role) {
  try {
    localStorage.setItem(ROLE_KEY, role);
  } catch (err) {
    // Role just won't survive refresh if storage is blocked; not fatal.
  }

  const isTutor = role === "tutor";
  roleStudentBtn.setAttribute("aria-pressed", String(!isTutor));
  roleTutorBtn.setAttribute("aria-pressed", String(isTutor));
  roleStudentBtn.classList.toggle("role-active", !isTutor);
  roleTutorBtn.classList.toggle("role-active", isTutor);
  tutorNotice.classList.toggle("hidden", !isTutor);
  document.body.classList.toggle("tutor-view", isTutor);
}

roleStudentBtn.addEventListener("click", () => setRole("student"));
roleTutorBtn.addEventListener("click", () => setRole("tutor"));

// Restore the saved role on load (default: student).
let savedRole = "student";
try {
  savedRole = localStorage.getItem(ROLE_KEY) || "student";
} catch (err) {
  // storage blocked → default role
}
setRole(savedRole === "tutor" ? "tutor" : "student");
