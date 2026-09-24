const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { listGoods, getGoods, addGoods, editGoods, removeGoods } = require('../controllers/goodsController');

router.use(verifyToken);

router.get('/', listGoods);
router.get('/:id', getGoods);
router.post('/', addGoods);
router.put('/:id', editGoods);
router.delete('/:id', removeGoods);

module.exports = router;
