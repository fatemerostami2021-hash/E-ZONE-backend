const { pool } = require('../config/db');


const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT u.*, r.name AS role_name
     FROM users u
     LEFT JOIN roles r ON u.role_id = r.id
     WHERE u.email = $1`,
    [email]
  );
  return result.rows[0];
};

const createUser = async ({ fullName, email, passwordHash, roleId }) => {
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash, role_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, full_name, email, role_id, created_at`,
    [fullName, email, passwordHash, roleId]
  );
  return result.rows[0];
};

module.exports = { findUserByEmail, createUser };
