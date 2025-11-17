const { pool } = require("../db");

const AdminModel = {
  
  createUser: async ({ username, email, password, role }) => {
    const [result] = await pool.query(
      `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
      [username, email, password, role]
    );
    return { id: result.insertId, username, email, role };
  },

  getAllUsers: async () => {
    const [rows] = await pool.query(`SELECT id, username, email, role FROM users`);
    return rows;
  },

  createTask: async ({ title, description, assignedTo }) => {
    const [result] = await pool.query(
      `INSERT INTO tasks (title, description, assignedTo) VALUES (?, ?, ?)`,
      [title, description, assignedTo]
    );
    return { id: result.insertId, title, description, assignedTo };
  },

  getAllTasks: async () => {
    const [rows] = await pool.query(`SELECT * FROM tasks`);
    return rows;
  },

  updateTask: async (id, taskData) => {
    const fields = Object.keys(taskData)
      .map(key => `${key} = ?`)
      .join(", ");

    const values = Object.values(taskData);

    await pool.query(`UPDATE tasks SET ${fields} WHERE id = ?`, [...values, id]);
    return true;
  },

  deleteTask: async (id) => {
    await pool.query(`DELETE FROM tasks WHERE id = ?`, [id]);
    return true;
  }
};

module.exports = AdminModel;
