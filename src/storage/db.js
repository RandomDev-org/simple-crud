const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const initDb = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id         SERIAL PRIMARY KEY,
        name       TEXT NOT NULL,
        isVerified BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE IF NOT EXISTS places (
        id         SERIAL PRIMARY KEY,
        address    TEXT NOT NULL,
        isVerified BOOLEAN DEFAULT FALSE,
        capacity   INTEGER NOT NULL,
        owner      INTEGER NOT NULL REFERENCES profiles(id)
      );
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing database', err);
  } finally {
    client.release();
  }
};

// Start initialization
initDb();

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
