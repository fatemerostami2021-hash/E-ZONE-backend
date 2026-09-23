const pool = require('../config/db');

const getHomeStats = async () => {
  const result = await pool.query(
    `SELECT * FROM home_stats ORDER BY display_order`
  );
  return result.rows;
};

const getHomeFeatures = async () => {
  const result = await pool.query(
    `SELECT * FROM home_features ORDER BY display_order`
  );
  return result.rows;
};

const getHomeRoadmap = async () => {
  const result = await pool.query(
    `SELECT * FROM home_roadmap ORDER BY display_order`
  );
  return result.rows;
};

module.exports = {
  getHomeStats,
  getHomeFeatures,
  getHomeRoadmap,
};
