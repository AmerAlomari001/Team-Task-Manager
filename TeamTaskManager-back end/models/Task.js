// models/Task.js
const { pool } = require("../db");

const TaskModel = {

  createTask: async ({ title, description, assignedTo }) => {
    const [result] = await pool.query(
      `INSERT INTO tasks (title, description, assignedTo) VALUES (?, ?, ?)`,
      [title, description, assignedTo]
    );

    return { id: result.insertId, title, description, assignedTo };
  },

  getTasksByUserId: async (userId) => {
    const [rows] = await pool.query(
      `SELECT * FROM tasks WHERE assignedTo = ?`,
      [userId]
    );
    return rows;
  },

  getAllTasks: async () => {
    const [rows] = await pool.query(`SELECT * FROM tasks`);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query(
      `SELECT * FROM tasks WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  updateTaskStatus: async (taskId, status) => {
    await pool.query(
      `UPDATE tasks SET status = ? WHERE id = ?`,
      [status, taskId]
    );
    return true;
  },

  updateTask: async (id, data) => {
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(data);

    await pool.query(`UPDATE tasks SET ${fields} WHERE id = ?`, [...values, id]);
    return true;
  },

  deleteTask: async (id) => {
    await pool.query(`DELETE FROM tasks WHERE id = ?`, [id]);
    return true;
  },
};

module.exports = TaskModel;
