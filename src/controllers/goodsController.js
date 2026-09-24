const {
  getAllGoods,
  getGoodsById,
  createGoods,
  updateGoods,
  softDeleteGoods,
} = require('../models/goodsModel');

const VALID_ITEM_TYPES = ['raw_material', 'part', 'finished_product', 'machinery', 'waste'];

const listGoods = async (req, res) => {
  try {
    const goods = await getAllGoods(req.query.companyId);
    res.json({ goods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const getGoods = async (req, res) => {
  try {
    const item = await getGoodsById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'کالا یافت نشد / Goods not found' });
    }
    res.json({ goods: item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const addGoods = async (req, res) => {
  try {
    const { companyId, itemCode, nameFa, nameEn, hsCode, unitId, itemType, isActive } = req.body;

    if (!companyId || !itemCode || !nameFa || !nameEn || !unitId || !itemType) {
      return res.status(400).json({ message: 'شرکت، کد کالا، نام فارسی/انگلیسی، واحد و نوع کالا الزامی است / Company, item code, names, unit and item type are required' });
    }

    if (!VALID_ITEM_TYPES.includes(itemType)) {
      return res.status(400).json({ message: 'نوع کالا نامعتبر است / Invalid item type' });
    }

    const goods = await createGoods({
      companyId, itemCode, nameFa, nameEn, hsCode, unitId, itemType, isActive, createdBy: req.user.id,
    });

    res.status(201).json({ message: 'کالا ایجاد شد / Goods created', goods });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'این کد کالا برای این شرکت قبلاً ثبت شده است / This item code already exists for this company' });
    }
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const editGoods = async (req, res) => {
  try {
    const existing = await getGoodsById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'کالا یافت نشد / Goods not found' });
    }

    if (req.body.itemType && !VALID_ITEM_TYPES.includes(req.body.itemType)) {
      return res.status(400).json({ message: 'نوع کالا نامعتبر است / Invalid item type' });
    }

    const goods = await updateGoods(req.params.id, req.body);
    res.json({ message: 'کالا ویرایش شد / Goods updated', goods });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'این کد کالا برای این شرکت قبلاً ثبت شده است / This item code already exists for this company' });
    }
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const removeGoods = async (req, res) => {
  try {
    const deleted = await softDeleteGoods(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'کالا یافت نشد / Goods not found' });
    }
    res.json({ message: 'کالا حذف شد / Goods deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

module.exports = { listGoods, getGoods, addGoods, editGoods, removeGoods };
