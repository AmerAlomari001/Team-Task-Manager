const UserService = require("../service/userservice");
const TaskService = require("../service/taskservice");

const UserController = {

  login: async (req, res) => {
    try {
      const data = await UserService.login(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getMyTasks: async (req, res) => {
    try {
      const userId = req.user.id;  
      const tasks = await TaskService.getTasksByUser(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  },
   updateMyTaskStatus: async (req, res) => {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      const { status } = req.body;

      const result = await TaskService.updateTaskStatus(taskId, userId, status);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = UserController;
