const pool = require('../config/db');

const getHomeStats = async () => {
  const result = await pool.query(
    `SELECT * FROM home_stats WHERE deleted_at IS NULL AND is_active = true ORDER BY display_order`
  );
  return result.rows;
};

const getHomeFeatures = async () => {
  const result = await pool.query(
    `SELECT * FROM home_features WHERE deleted_at IS NULL AND is_active = true ORDER BY display_order`
  );
  return result.rows;
};

const getHomeRoadmap = async () => {
  const result = await pool.query(
    `SELECT * FROM home_roadmap WHERE deleted_at IS NULL AND is_active = true ORDER BY display_order`
  );
  return result.rows;
};

module.exports = {
  getHomeStats,
  getHomeFeatures,
  getHomeRoadmap,
};