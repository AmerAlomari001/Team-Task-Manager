
const TaskModel = require("../models/Task");

const TaskService = {
  
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

module.exports = TaskService;
