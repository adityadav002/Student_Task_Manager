// ===========================
// Configuration
// ===========================
const CONFIG = {
  API_BASE_URL: "http://localhost:3000/api",
  MESSAGE_DURATION: 3000,
  MAX_TASK_LENGTH: 500,
};

// ===========================
// API Layer
// ===========================
class TaskAPI {
  static async request(url, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Request failed");
    }

    return data;
  }

  static getAllTasks() {
    return this.request(`${CONFIG.API_BASE_URL}/tasks`);
  }

  static createTask(text) {
    return this.request(`${CONFIG.API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
  }

  static deleteTask(id) {
    return this.request(`${CONFIG.API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
  }
}

// ===========================
// UI Manager
// ===========================
class UIManager {
  constructor() {
    this.el = {
      input: document.getElementById("taskInput"),
      button: document.getElementById("addTaskBtn"),
      list: document.getElementById("taskList"),
      count: document.getElementById("taskCount"),
      message: document.getElementById("messageContainer"),
      loading: document.getElementById("loadingState"),
      empty: document.getElementById("emptyState"),
    };

    this.messageTimeout = null;
  }

  // Ensure only ONE state is visible at a time
  showLoading(show = true) {
    this.el.loading.classList.toggle("hidden", !show);
    this.el.list.classList.toggle("hidden", show);
    this.el.empty.classList.add("hidden");
  }

  showEmpty(show = true) {
    this.el.empty.classList.toggle("hidden", !show);
    this.el.list.classList.toggle("hidden", show);
    this.el.loading.classList.add("hidden");
  }

  showList() {
    this.el.list.classList.remove("hidden");
    this.el.loading.classList.add("hidden");
    this.el.empty.classList.add("hidden");
  }

  showMessage(message, type = "success") {
    clearTimeout(this.messageTimeout);

    this.el.message.innerHTML = `
      <div class="message message-${type}">
        ${this.escapeHtml(message)}
      </div>
    `;

    this.messageTimeout = setTimeout(() => {
      this.el.message.innerHTML = "";
    }, CONFIG.MESSAGE_DURATION);
  }

  setButtonLoading(isLoading) {
    this.el.button.disabled = isLoading;
    this.el.button.textContent = isLoading ? "Adding..." : "Add Task";
  }

  updateCount(count) {
    this.el.count.textContent = `${count} task${count !== 1 ? "s" : ""}`;
  }

  clearInput() {
    this.el.input.value = "";
    this.el.input.focus();
  }

  renderTasks(tasks) {
    if (!tasks || tasks.length === 0) {
      this.showEmpty(true);
      this.updateCount(0);
      this.el.list.innerHTML = "";
      return;
    }

    this.showList();
    this.updateCount(tasks.length);
    this.el.list.innerHTML = tasks.map((t) => this.taskHTML(t)).join("");
  }

  prependTask(task) {
    this.showList();
    this.el.list.insertAdjacentHTML("afterbegin", this.taskHTML(task));
  }

  removeTaskFromUI(id) {
    const taskElement = this.el.list.querySelector(`[data-id="${id}"]`);
    if (taskElement) taskElement.remove();
  }

  taskHTML(task) {
    return `
      <li class="task-item" data-id="${task.id}">
        <div class="task-text">${this.escapeHtml(task.text)}</div>

        <div class="task-meta">
          <span>📅 ${this.formatDate(task.created_at)}</span>

          <div class="task-actions">
            <span class="task-badge">#${task.id}</span>
            <button class="delete-btn" data-id="${task.id}">🗑 Delete</button>
          </div>
        </div>
      </li>
    `;
  }

  formatDate(dateStr) {
    const date = new Date(dateStr);
    const diff = Date.now() - date;

    const min = Math.floor(diff / 60000);
    const hr = Math.floor(diff / 3600000);
    const day = Math.floor(diff / 86400000);

    if (min < 1) return "Just now";
    if (min < 60) return `${min} min ago`;
    if (hr < 24) return `${hr} hour${hr > 1 ? "s" : ""} ago`;
    if (day < 7) return `${day} day${day > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString();
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

// ===========================
// App Controller
// ===========================
class TaskManager {
  constructor() {
    this.ui = new UIManager();
    this.tasks = [];
    this.isSubmitting = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadTasks();
  }

  bindEvents() {
    this.ui.el.button.addEventListener("click", () => this.addTask());

    this.ui.el.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.addTask();
    });

    // DELETE BUTTON HANDLER (Event Delegation)
    this.ui.el.list.addEventListener("click", (e) => {
      const btn = e.target.closest(".delete-btn");
      if (!btn) return;

      const id = btn.dataset.id;
      this.deleteTask(id);
    });
  }

  async loadTasks() {
    try {
      this.ui.showLoading(true);

      const res = await TaskAPI.getAllTasks();
      this.tasks = res.data || [];

      this.ui.renderTasks(this.tasks);
    } catch {
      this.ui.showMessage("Failed to load tasks. Refresh page.", "error");
      this.ui.showEmpty(true);
    } finally {
      this.ui.showLoading(false);
    }
  }

  async addTask() {
    if (this.isSubmitting) return;

    const text = this.ui.el.input.value.trim();

    if (!text) {
      this.ui.showMessage("Please enter a task", "error");
      return;
    }

    if (text.length > CONFIG.MAX_TASK_LENGTH) {
      this.ui.showMessage("Task too long", "error");
      return;
    }

    try {
      this.isSubmitting = true;
      this.ui.setButtonLoading(true);

      const res = await TaskAPI.createTask(text);

      this.tasks.unshift(res.data);
      this.ui.prependTask(res.data);

      this.ui.updateCount(this.tasks.length);
      this.ui.showMessage("Task added successfully 🎉");
      this.ui.clearInput();
    } catch (err) {
      this.ui.showMessage(err.message, "error");
    } finally {
      this.isSubmitting = false;
      this.ui.setButtonLoading(false);
    }
  }

  async deleteTask(id) {
    const confirmDelete = confirm("Delete this task?");
    if (!confirmDelete) return;

    try {
      await TaskAPI.deleteTask(id);

      // Remove from state
      this.tasks = this.tasks.filter((task) => task.id != id);

      // Re-render UI
      this.ui.renderTasks(this.tasks);

      // Show success message
      this.ui.showMessage("Task deleted 🗑", "success");
    } catch (err) {
      this.ui.showMessage(err.message, "error");
    }
  }
}

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  new TaskManager();
  console.log("📚 Student Task Manager Ready");
});
