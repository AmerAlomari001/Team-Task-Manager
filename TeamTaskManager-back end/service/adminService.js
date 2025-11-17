// service/adminService.js

const UserModel = require("../models/User");
const TaskModel = require("../models/Task");
const bcrypt = require("bcryptjs");

const AdminService = {

  registerUser: async (username, email, password, role) => {
    const hashed = await bcrypt.hash(password, 10);
    return UserModel.createUser({ username, email, password: hashed, role });
  },

  getAllUsers: async () => {
    return UserModel.getAllUsers();
  },

  createTask: async (title, description, assignedTo) => {
    return TaskModel.createTask({ title, description, assignedTo });
  },

  getAllTasks: async () => {
    return TaskModel.getAllTasks();
  },

  updateTask: async (id, updates) => {
    return TaskModel.updateTask(id, updates);
  },

  deleteTask: async (id) => {
    return TaskModel.deleteTask(id);
  }
};

module.exports = AdminService;
