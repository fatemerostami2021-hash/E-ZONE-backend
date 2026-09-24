const pool = require('../config/db');

/**
 * Factory عمومی برای جدول‌های محتوای CMS که از الگوی مشترک پیروی می‌کنن:
 * id, فیلدهای محتوا, display_order, is_active, deleted_at, created_at, updated_at
 *
 * @param {string} tableName - مثلاً 'home_stats'
 * @param {string[]} fields - نام فیلدهای camelCase که مجاز به create/update هستن
 */
const createContentModel = (tableName, fields) => {
  const toSnake = (s) => s.replace(/[A-Z]/g, (l) => `_${l.toLowerCase()}`);

  const getAll = async ({ includeInactive = false } = {}) => {
    const where = includeInactive
      ? 'WHERE deleted_at IS NULL'
      : 'WHERE deleted_at IS NULL AND is_active = true';
    const result = await pool.query(
      `SELECT * FROM ${tableName} ${where} ORDER BY display_order, id`
    );
    return result.rows;
  };

  const getById = async (id) => {
    const result = await pool.query(
      `SELECT * FROM ${tableName} WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );
    return result.rows[0];
  };

  const create = async (data) => {
    const cols = fields.filter((f) => data[f] !== undefined);
    const columnNames = cols.map(toSnake);
    const placeholders = cols.map((_, i) => `$${i + 1}`);
    const values = cols.map((f) => data[f]);

    const result = await pool.query(
      `INSERT INTO ${tableName} (${columnNames.join(', ')})
       VALUES (${placeholders.join(', ')})
       RETURNING *`,
      values
    );
    return result.rows[0];
  };

  const update = async (id, data) => {
    const cols = fields.filter((f) => data[f] !== undefined);
    if (cols.length === 0) return getById(id);

    const setClauses = cols.map((f, i) => `${toSnake(f)} = $${i + 1}`);
    const values = cols.map((f) => data[f]);

    const result = await pool.query(
      `UPDATE ${tableName} SET
        ${setClauses.join(', ')},
        updated_at = NOW()
       WHERE id = $${cols.length + 1} AND deleted_at IS NULL
       RETURNING *`,
      [...values, id]
    );
    return result.rows[0];
  };

  const softDelete = async (id) => {
    const result = await pool.query(
      `UPDATE ${tableName} SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
      [id]
    );
    return result.rows[0];
  };

  return { getAll, getById, create, update, softDelete };
};

module.exports = { createContentModel };