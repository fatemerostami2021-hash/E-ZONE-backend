const pool = require('../config/db');

const getAllUnits = async () => {
  const result = await pool.query(
    `SELECT * FROM units WHERE deleted_at IS NULL ORDER BY id`
  );
  return result.rows;
};

const getUnitById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM units WHERE id = $1 AND deleted_at IS NULL`,
    [id]
  );
  return result.rows[0];
};

const createUnit = async ({ code, nameFa, nameEn, createdBy }) => {
  const result = await pool.query(
    `INSERT INTO units (code, name_fa, name_en, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [code, nameFa, nameEn, createdBy || null]
  );
  return result.rows[0];
};

const updateUnit = async (id, { code, nameFa, nameEn }) => {
  const result = await pool.query(
    `UPDATE units SET
      code = COALESCE($1, code),
      name_fa = COALESCE($2, name_fa),
      name_en = COALESCE($3, name_en)
     WHERE id = $4 AND deleted_at IS NULL
     RETURNING *`,
    [code, nameFa, nameEn, id]
  );
  return result.rows[0];
};

const softDeleteUnit = async (id) => {
  const result = await pool.query(
    `UPDATE units SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  softDeleteUnit,
};
