const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { listUnits, getUnit, addUnit, editUnit, removeUnit } = require('../controllers/unitController');

router.use(verifyToken);

router.get('/', listUnits);
router.get('/:id', getUnit);
router.post('/', addUnit);
router.put('/:id', editUnit);
router.delete('/:id', removeUnit);

module.exports = router;
