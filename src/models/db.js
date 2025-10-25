// src/models/db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }   // necesario en Render
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
