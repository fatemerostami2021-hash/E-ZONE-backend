const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');
const allowRoles = require('../middleware/roleCheck');

router.post('/register', register);
router.post('/login', login);

router.get('/admin-only', verifyToken, allowRoles('admin'), (req, res) => {
  res.json({ message: `خوش آمدی ${req.user.email} / Welcome admin` });
});

module.exports = router;
