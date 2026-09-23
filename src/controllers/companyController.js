const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  softDeleteCompany,
} = require('../models/companyModel');

const listCompanies = async (req, res) => {
  try {
    const companies = await getAllCompanies();
    res.json({ companies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const getCompany = async (req, res) => {
  try {
    const company = await getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'شرکت یافت نشد / Company not found' });
    }
    res.json({ company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const addCompany = async (req, res) => {
  try {
    const { nameFa, nameEn, registrationNumber, economicCode, addressFa, addressEn, isActive } = req.body;

    if (!nameFa || !nameEn) {
      return res.status(400).json({ message: 'نام فارسی و انگلیسی الزامی است / Persian and English names are required' });
    }

    const company = await createCompany({
      nameFa, nameEn, registrationNumber, economicCode, addressFa, addressEn,
      isActive, createdBy: req.user.id,
    });

    res.status(201).json({ message: 'شرکت ایجاد شد / Company created', company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const editCompany = async (req, res) => {
  try {
    const existing = await getCompanyById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'شرکت یافت نشد / Company not found' });
    }

    const company = await updateCompany(req.params.id, req.body);
    res.json({ message: 'شرکت ویرایش شد / Company updated', company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const removeCompany = async (req, res) => {
  try {
    const deleted = await softDeleteCompany(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'شرکت یافت نشد / Company not found' });
    }
    res.json({ message: 'شرکت حذف شد / Company deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

module.exports = { listCompanies, getCompany, addCompany, editCompany, removeCompany };