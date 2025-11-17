const { pool } = require("../db");

const UserModel = {
  
  createUser: async ({ username, email, password, role }) => {
    const [result] = await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [username, email, password, role]
    );

    return {
      id: result.insertId,
      username,
      email,
      role
    };
  },

  getAllUsers: async () => {
    const [rows] = await pool.query(
      `SELECT id, username, email, role FROM users`
    );
    return rows;
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  deleteUserById: async (id) => {
    const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = UserModel;
