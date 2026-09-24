const { createContentModel } = require('../models/contentModel');
const { createContentController } = require('./contentController');

const statsModel = createContentModel('home_stats', [
  'iconName', 'value', 'titleFa', 'titleEn', 'descriptionFa', 'descriptionEn', 'displayOrder', 'isActive',
]);
const featuresModel = createContentModel('home_features', [
  'iconName', 'titleFa', 'titleEn', 'descriptionFa', 'descriptionEn', 'displayOrder', 'isActive',
]);
const roadmapModel = createContentModel('home_roadmap', [
  'phaseLabel', 'status', 'titleFa', 'titleEn', 'descriptionFa', 'descriptionEn', 'displayOrder', 'isActive',
]);

const statsController = createContentController(
  statsModel,
  {
    notFound: 'آمار یافت نشد / Stat not found',
    created: 'آمار ایجاد شد / Stat created',
    updated: 'آمار ویرایش شد / Stat updated',
    deleted: 'آمار حذف شد / Stat deleted',
    requiredFieldsMissing: 'عنوان فارسی و انگلیسی الزامی است / Persian and English titles are required',
  },
  ['titleFa', 'titleEn']
);

const featuresController = createContentController(
  featuresModel,
  {
    notFound: 'ویژگی یافت نشد / Feature not found',
    created: 'ویژگی ایجاد شد / Feature created',
    updated: 'ویژگی ویرایش شد / Feature updated',
    deleted: 'ویژگی حذف شد / Feature deleted',
    requiredFieldsMissing: 'عنوان فارسی و انگلیسی الزامی است / Persian and English titles are required',
  },
  ['titleFa', 'titleEn']
);

const roadmapController = createContentController(
  roadmapModel,
  {
    notFound: 'رودمپ یافت نشد / Roadmap item not found',
    created: 'رودمپ ایجاد شد / Roadmap item created',
    updated: 'رودمپ ویرایش شد / Roadmap item updated',
    deleted: 'رودمپ حذف شد / Roadmap item deleted',
    requiredFieldsMissing: 'عنوان فارسی و انگلیسی الزامی است / Persian and English titles are required',
  },
  ['titleFa', 'titleEn']
);

module.exports = { statsController, featuresController, roadmapController };