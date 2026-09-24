require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const unitRoutes = require('./routes/unitRoutes');
const goodsRoutes = require('./routes/goodsRoutes');
const homeRoutes = require('./routes/homeRoutes');
const homeAdminRoutes = require('./routes/homeAdminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/goods', goodsRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin/home', homeAdminRoutes);

// 404 برای API
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'مسیر پیدا نشد / Not found' });
});

// هندلر خطای سرور
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'خطای سرور / Server error' });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});