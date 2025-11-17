
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const TaskModel = require("../models/Task");

require("dotenv").config();

const UserService = {

  login: async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  },
    getTasksByUser: async (userId) => {
    return TaskModel.getTasksByUserId(userId);
  },
  updateTaskStatus: async (taskId, userId, status) => {
    const task = await TaskModel.findById(taskId);

    if (!task) throw new Error("Task not found");
    if (task.assignedTo !== userId) throw new Error("Not your task");

    return TaskModel.updateTaskStatus(taskId, status);
  }
};

module.exports = UserService;
