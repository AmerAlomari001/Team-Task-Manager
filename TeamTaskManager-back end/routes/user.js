const express = require("express");
const router = express.Router();
const UserController = require("../controller/usercontrooler");
const authenticateToken = require("../middelware/auth");



router.post("/login", UserController.login);

router.get("/tasks", authenticateToken, UserController.getMyTasks);

router.put("/:id", authenticateToken, UserController.updateMyTaskStatus);

module.exports = router;
