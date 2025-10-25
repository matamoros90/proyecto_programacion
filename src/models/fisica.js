// src/models/fisica.js
const db = require('./db');

// INSERT
const store = async (voltaje, temperatura, distancia, fechaDatos) => {
  const fecha = fechaDatos || new Date();
  const sql = `
    INSERT INTO fisica (voltaje, temperatura, distancia, "Fecha_Datos")
    VALUES ($1, $2, $3, $4)
  `;
  await db.query(sql, [voltaje, temperatura, distancia, fecha]);
  return { ok: true };
};

// SELECT (listado)
const findAll = async () => {
  const { rows } = await db.query(`
    SELECT
      id_fisica                       AS "ID_FISICA",
      voltaje,
      temperatura,
      distancia,
      "Fecha_Datos"                   AS "Fecha_Datos"
    FROM fisica
    ORDER BY id_fisica ASC
  `);
  return rows;
};

// SELECT (detalle)
const findById = async (id) => {
  const { rows } = await db.query(`
    SELECT
      id_fisica                       AS "ID_FISICA",
      voltaje,
      temperatura,
      distancia,
      "Fecha_Datos"                   AS "Fecha_Datos"
    FROM fisica
    WHERE id_fisica = $1
  `, [id]);
  return rows[0];
};

// UPDATE / DELETE (id_fisica está en minúsculas en la tabla, así está bien)
const update = async (id, voltaje, temperatura, distancia) => {
  await db.query(`
    UPDATE fisica
    SET voltaje = $1, temperatura = $2, distancia = $3
    WHERE id_fisica = $4
  `, [voltaje, temperatura, distancia, id]);
  return { ok: true };
};

const destroy = async (id) => {
  await db.query(`DELETE FROM fisica WHERE id_fisica = $1`, [id]);
  return { ok: true };
};

module.exports = { store, findAll, findById, update, destroy };
