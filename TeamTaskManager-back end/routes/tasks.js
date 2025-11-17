const express = require("express");
const router = express.Router();

const TaskController = require("../controller/taskscontrooler");
const authenticateToken = require("../middelware/auth");


router.get("/", authenticateToken, TaskController.getMyTasks);

router.put("/:id", authenticateToken, TaskController.updateMyTaskStatus);

module.exports = router;
