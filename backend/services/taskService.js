const db = require("../storage/database");

class TaskService {
  validateTaskText(text) {
    if (!text || typeof text !== "string") {
      throw new Error("Task text is required");
    }

    const trimmed = text.trim();

    if (trimmed.length === 0) {
      throw new Error("Task text cannot be empty");
    }

    if (trimmed.length > 500) {
      throw new Error("Task text must be under 500 characters");
    }

    return trimmed;
  }

  getAllTasks() {
    const stmt = db.prepare("SELECT * FROM tasks ORDER BY created_at DESC");
    return stmt.all();
  }

  taskExists(text) {
    const stmt = db.prepare(
      "SELECT COUNT(*) AS count FROM tasks WHERE LOWER(text) = LOWER(?)",
    );
    return stmt.get(text).count > 0;
  }

  createTask(text) {
    const validatedText = this.validateTaskText(text);

    if (this.taskExists(validatedText)) {
      throw new Error("This task already exists");
    }

    const insert = db.prepare(
      "INSERT INTO tasks (text, created_at) VALUES (?, ?)",
    );

    const result = insert.run(validatedText, new Date().toISOString());

    return db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(result.lastInsertRowid);
  }

  deleteTask(id) {
    if (!id) throw new Error("Invalid task ID");

    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      throw new Error("Task not found");
    }
  }
}

module.exports = new TaskService();
