const {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  softDeleteUnit,
} = require('../models/unitModel');

const listUnits = async (req, res) => {
  try {
    const units = await getAllUnits();
    res.json({ units });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const getUnit = async (req, res) => {
  try {
    const unit = await getUnitById(req.params.id);
    if (!unit) {
      return res.status(404).json({ message: 'واحد یافت نشد / Unit not found' });
    }
    res.json({ unit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const addUnit = async (req, res) => {
  try {
    const { code, nameFa, nameEn } = req.body;

    if (!code || !nameFa || !nameEn) {
      return res.status(400).json({ message: 'کد، نام فارسی و انگلیسی الزامی است / Code, Persian and English names are required' });
    }

    const unit = await createUnit({ code, nameFa, nameEn, createdBy: req.user.id });
    res.status(201).json({ message: 'واحد ایجاد شد / Unit created', unit });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'این کد واحد قبلاً ثبت شده است / This unit code already exists' });
    }
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const editUnit = async (req, res) => {
  try {
    const existing = await getUnitById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'واحد یافت نشد / Unit not found' });
    }
    const unit = await updateUnit(req.params.id, req.body);
    res.json({ message: 'واحد ویرایش شد / Unit updated', unit });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'این کد واحد قبلاً ثبت شده است / This unit code already exists' });
    }
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const removeUnit = async (req, res) => {
  try {
    const deleted = await softDeleteUnit(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'واحد یافت نشد / Unit not found' });
    }
    res.json({ message: 'واحد حذف شد / Unit deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

module.exports = { listUnits, getUnit, addUnit, editUnit, removeUnit };
