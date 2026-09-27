const { pool } = require('../config/db');


const getAllCompanies = async () => {
  const result = await pool.query(
    `SELECT * FROM companies WHERE deleted_at IS NULL ORDER BY id`
  );
  return result.rows;
};

const getCompanyById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM companies WHERE id = $1 AND deleted_at IS NULL`,
    [id]
  );
  return result.rows[0];
};

const createCompany = async ({
  nameFa, nameEn, registrationNumber, economicCode,
  addressFa, addressEn, isActive, createdBy,
}) => {
  const result = await pool.query(
    `INSERT INTO companies
      (name_fa, name_en, registration_number, economic_code, address_fa, address_en, is_active, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [nameFa, nameEn, registrationNumber || null, economicCode || null,
     addressFa || null, addressEn || null, isActive ?? true, createdBy || null]
  );
  return result.rows[0];
};

const updateCompany = async (id, {
  nameFa, nameEn, registrationNumber, economicCode, addressFa, addressEn, isActive,
}) => {
  const result = await pool.query(
    `UPDATE companies SET
      name_fa = COALESCE($1, name_fa),
      name_en = COALESCE($2, name_en),
      registration_number = COALESCE($3, registration_number),
      economic_code = COALESCE($4, economic_code),
      address_fa = COALESCE($5, address_fa),
      address_en = COALESCE($6, address_en),
      is_active = COALESCE($7, is_active)
     WHERE id = $8 AND deleted_at IS NULL
     RETURNING *`,
    [nameFa, nameEn, registrationNumber, economicCode, addressFa, addressEn, isActive, id]
  );
  return result.rows[0];
};

const softDeleteCompany = async (id) => {
  const result = await pool.query(
    `UPDATE companies SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  softDeleteCompany,
};