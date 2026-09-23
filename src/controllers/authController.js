const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { fullName, email, password, roleId } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'همه فیلدها الزامی است / All fields are required' });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'این ایمیل قبلاً ثبت شده / Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ fullName, email, passwordHash, roleId: roleId || 3 });

    res.status(201).json({ message: 'کاربر ساخته شد / User created', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'ایمیل یا رمز اشتباه است / Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'ایمیل یا رمز اشتباه است / Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role_name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'ورود موفق / Login successful',
      token,
      user: { id: user.id, fullName: user.full_name, email: user.email, role: user.role_name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور / Server error' });
  }
};

module.exports = { register, login };
