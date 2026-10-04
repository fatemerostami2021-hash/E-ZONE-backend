const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * اتصال به دیتابیس:
 *  - اگر DATABASE_URL ست شده باشد (Neon / Render / Heroku)، از آن استفاده می‌کنیم
 *  - در غیر این صورت به متغیرهای جدا برمی‌گردیم (محیط لوکال)
 */
const useUrl = !!process.env.DATABASE_URL;

const pool = new Pool(
  useUrl
    ? {
        connectionString: process.env.DATABASE_URL,
        max: Number(process.env.DB_POOL_MAX || 10),
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 5_000,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: Number(process.env.DB_POOL_MAX || 10),
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 5_000,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
      },
);

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