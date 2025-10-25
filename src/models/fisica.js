const db = require('./db');

async function store(voltaje, temperatura, distancia, fechaDatos) {
  const sql = `
    INSERT INTO fisica (voltaje, temperatura, distancia, "Fecha_Datos")
    VALUES ($1, $2, $3, $4)
    RETURNING ID_FISICA AS id_fisica;`;
  const params = [voltaje, temperatura, distancia, fechaDatos || new Date()];
  const { rows } = await db.query(sql, params);
  return rows[0];
}

async function findAll() {
  const sql = `
    SELECT
      ID_FISICA AS id_fisica,
      VOLTAJE   AS voltaje,
      TEMPERATURA AS temperatura,
      DISTANCIA AS distancia,
      "Fecha_Datos"
    FROM fisica
    ORDER BY ID_FISICA ASC`;
  const { rows } = await db.query(sql);
  return rows;
}

async function findById(id) {
  const sql = `
    SELECT
      ID_FISICA AS id_fisica,
      VOLTAJE   AS voltaje,
      TEMPERATURA AS temperatura,
      DISTANCIA AS distancia,
      "Fecha_Datos"
    FROM fisica
    WHERE ID_FISICA = $1`;
  const { rows } = await db.query(sql, [id]);
  return rows[0];
}

module.exports = { store, findAll, findById };
