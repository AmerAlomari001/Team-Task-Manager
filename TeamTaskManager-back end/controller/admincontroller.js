
const AdminService = require("../service/adminService");

const AdminController = {

  registerUser: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const newUser = await AdminService.registerUser(username, email, password, role);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to register user", detail: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await AdminService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users", detail: error.message });
    }
  },

  createTask: async (req, res) => {
    try {
      const { title, description, assignedTo } = req.body;
      const task = await AdminService.createTask(title, description, assignedTo);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to create task", detail: error.message });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await AdminService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks", detail: error.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await AdminService.updateTask(id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task", detail: error.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      await AdminService.deleteTask(id);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task", detail: error.message });
    }
  },
};

module.exports = AdminController;
