/**
 * Factory عمومی برای کنترلرهای CRUD محتوای CMS.
 * @param {object} model - خروجی createContentModel
 * @param {object} messages - پیام‌های دوزبانه اختصاصی این جدول
 *   { notFound, created, updated, deleted, requiredFieldsMissing }
 * @param {string[]} requiredFields - فیلدهای اجباری هنگام create
 */
const createContentController = (model, messages, requiredFields = []) => {
  const list = async (req, res) => {
    try {
      const includeInactive = req.query.all === 'true';
      const items = await model.getAll({ includeInactive });
      res.json({ items });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطای سرور / Server error' });
    }
  };

  const getOne = async (req, res) => {
    try {
      const item = await model.getById(req.params.id);
      if (!item) return res.status(404).json({ message: messages.notFound });
      res.json({ item });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطای سرور / Server error' });
    }
  };

  const add = async (req, res) => {
    try {
      const missing = requiredFields.filter((f) => !req.body[f]);
      if (missing.length > 0) {
        return res.status(400).json({ message: messages.requiredFieldsMissing });
      }
      const item = await model.create(req.body);
      res.status(201).json({ message: messages.created, item });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطای سرور / Server error' });
    }
  };

  const edit = async (req, res) => {
    try {
      const existing = await model.getById(req.params.id);
      if (!existing) return res.status(404).json({ message: messages.notFound });
      const item = await model.update(req.params.id, req.body);
      res.json({ message: messages.updated, item });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطای سرور / Server error' });
    }
  };

  const remove = async (req, res) => {
    try {
      const deleted = await model.softDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: messages.notFound });
      res.json({ message: messages.deleted });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطای سرور / Server error' });
    }
  };

  return { list, getOne, add, edit, remove };
};

module.exports = { createContentController };