const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // جلوگیری از ایجاد اتصال‌های بیش از حد
  max: Number(process.env.DB_POOL_MAX || 10),

  // آزادسازی اتصال‌های idle
  idleTimeoutMillis: 30_000,

  // جلوگیری از معطل‌ماندن درخواست هنگام قطع دیتابیس
  connectionTimeoutMillis: 5_000,

  // برای PostgreSQL ابری معمولاً در production لازم است
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
});

pool.on('connect', () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('✅ PostgreSQL connection established');
  }
});

pool.on('error', (error) => {
  console.error('❌ Unexpected PostgreSQL pool error:', error.message);
});

async function checkDatabaseConnection() {
  const client = await pool.connect();

  try {
    await client.query('SELECT 1');
    console.log('✅ PostgreSQL health check passed');
  } finally {
    client.release();
  }
}

async function closeDatabaseConnection() {
  await pool.end();
  console.log('PostgreSQL pool closed');
}

module.exports = {
  pool,
  checkDatabaseConnection,
  closeDatabaseConnection,
};
