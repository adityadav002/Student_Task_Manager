const taskService = require("../services/taskService");

class TaskController {
  getAllTasks(req, res) {
    try {
      const tasks = taskService.getAllTasks();

      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks,
      });
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({
        success: false,
        error: "Failed to fetch tasks",
      });
    }
  }

  createTask(req, res) {
    try {
      const { text } = req.body;
      const task = taskService.createTask(text);

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (err) {
      console.error("Create error:", err);

      const isValidationError =
        err.message.includes("required") ||
        err.message.includes("empty") ||
        err.message.includes("exists") ||
        err.message.includes("under");

      res.status(isValidationError ? 400 : 500).json({
        success: false,
        error: err.message,
      });
    }
  }

  deleteTask(req, res) {
    try {
      const id = Number(req.params.id);
      taskService.deleteTask(id);

      res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        error: err.message,
      });
    }
  }
}

module.exports = new TaskController();
