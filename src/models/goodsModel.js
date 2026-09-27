const { pool } = require('../config/db');



const SELECT_BASE = `
  SELECT g.*,
    c.name_fa AS company_name_fa, c.name_en AS company_name_en,
    u.name_fa AS unit_name_fa, u.name_en AS unit_name_en, u.code AS unit_code
  FROM goods g
  JOIN companies c ON c.id = g.company_id
  JOIN units u ON u.id = g.unit_id
`;

const getAllGoods = async (companyId) => {
  const conditions = ['g.deleted_at IS NULL'];
  const params = [];
  if (companyId) {
    params.push(companyId);
    conditions.push(`g.company_id = $${params.length}`);
  }
  const result = await pool.query(
    `${SELECT_BASE} WHERE ${conditions.join(' AND ')} ORDER BY g.id`,
    params
  );
  return result.rows;
};

const getGoodsById = async (id) => {
  const result = await pool.query(
    `${SELECT_BASE} WHERE g.id = $1 AND g.deleted_at IS NULL`,
    [id]
  );
  return result.rows[0];
};

const createGoods = async ({
  companyId, itemCode, nameFa, nameEn, hsCode, unitId, itemType, isActive, createdBy,
}) => {
  const result = await pool.query(
    `INSERT INTO goods
      (company_id, item_code, name_fa, name_en, hs_code, unit_id, item_type, is_active, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [companyId, itemCode, nameFa, nameEn, hsCode || null, unitId, itemType, isActive ?? true, createdBy || null]
  );
  return result.rows[0];
};

const updateGoods = async (id, {
  companyId, itemCode, nameFa, nameEn, hsCode, unitId, itemType, isActive,
}) => {
  const result = await pool.query(
    `UPDATE goods SET
      company_id = COALESCE($1, company_id),
      item_code = COALESCE($2, item_code),
      name_fa = COALESCE($3, name_fa),
      name_en = COALESCE($4, name_en),
      hs_code = COALESCE($5, hs_code),
      unit_id = COALESCE($6, unit_id),
      item_type = COALESCE($7, item_type),
      is_active = COALESCE($8, is_active)
     WHERE id = $9 AND deleted_at IS NULL
     RETURNING *`,
    [companyId, itemCode, nameFa, nameEn, hsCode, unitId, itemType, isActive, id]
  );
  return result.rows[0];
};

const softDeleteGoods = async (id) => {
  const result = await pool.query(
    `UPDATE goods SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllGoods,
  getGoodsById,
  createGoods,
  updateGoods,
  softDeleteGoods,
};
