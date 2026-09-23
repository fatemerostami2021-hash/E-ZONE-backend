const express = require('express');
const router = express.Router();
const {
  listCompanies, getCompany, addCompany, editCompany, removeCompany,
} = require('../controllers/companyController');
const verifyToken = require('../middleware/auth');
const allowRoles = require('../middleware/roleCheck');

router.get('/', verifyToken, listCompanies);
router.get('/:id', verifyToken, getCompany);
router.post('/', verifyToken, allowRoles('admin'), addCompany);
router.put('/:id', verifyToken, allowRoles('admin'), editCompany);
router.delete('/:id', verifyToken, allowRoles('admin'), removeCompany);

module.exports = router;