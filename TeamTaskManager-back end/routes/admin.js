const express = require("express");
const router = express.Router();

const authenticateToken = require("../middelware/auth");
const adminOnly = require("../middelware/adminOnly");

const adminController = require("../controller/admincontroller");

router.post("/register", authenticateToken, adminOnly, adminController.registerUser);
router.get("/users", authenticateToken, adminOnly, adminController.getAllUsers);
router.post("/tasks", authenticateToken, adminOnly, adminController.createTask);
router.get("/tasks", authenticateToken, adminOnly, adminController.getAllTasks);
router.put("/tasks/:id", authenticateToken, adminOnly, adminController.updateTask);
router.delete("/tasks/:id", authenticateToken, adminOnly, adminController.deleteTask);

module.exports = router;
