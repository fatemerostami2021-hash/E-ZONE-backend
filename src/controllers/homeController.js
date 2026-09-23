const {
  getHomeStats,
  getHomeFeatures,
  getHomeRoadmap,
} = require('../models/homeModel');

const getHomeContent = async (req, res) => {
  try {
    const [stats, features, roadmap] = await Promise.all([
      getHomeStats(),
      getHomeFeatures(),
      getHomeRoadmap(),
    ]);
    res.json({ stats, features, roadmap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

module.exports = { getHomeContent };
