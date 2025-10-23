const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, // dirección del servidor de la base de datos
  user: process.env.DB_USER, // nombre de usuario
  password: process.env.DB_PASS, // contraseña
  database: process.env.DB_NAME, // nombre de la base de datos
});

module.exports = pool;  