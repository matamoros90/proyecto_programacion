// src/models/fisica.js
const db = require('./db');

const store = async (voltaje, temperatura, distancia, fechaDatos) => {
  const fecha = fechaDatos || new Date();
  const sql = `
    INSERT INTO public.fisica (voltaje, temperatura, distancia, fecha_datos)
    VALUES ($1, $2, $3, $4)
    RETURNING id_fisica AS id
  `;
  const { rows } = await db.query(sql, [voltaje, temperatura, distancia, fecha]);
  return rows[0]; // { id: <nuevo id> }
};

const findAll = async () => {
  const { rows } = await db.query(`
    SELECT
      id_fisica         AS id,
      voltaje,
      temperatura,
      distancia,
      fecha_datos       AS fecha
    FROM public.fisica
    ORDER BY id_fisica ASC
  `);
  return rows;
};

const findById = async (id) => {
  const { rows } = await db.query(`
    SELECT
      id_fisica         AS id,
      voltaje,
      temperatura,
      distancia,
      fecha_datos       AS fecha
    FROM public.fisica
    WHERE id_fisica = $1
  `, [id]);
  return rows[0] || null;
};

const update = async (id, voltaje, temperatura, distancia, fecha) => {
  await db.query(`
    UPDATE public.fisica
    SET voltaje = $1,
        temperatura = $2,
        distancia = $3,
        fecha_datos = COALESCE($4, fecha_datos)
    WHERE id_fisica = $5
  `, [voltaje, temperatura, distancia, fecha || null, id]);
  return { ok: true };
};

const destroy = async (id) => {
  await db.query('DELETE FROM public.fisica WHERE id_fisica = $1', [id]);
  return { ok: true };
};

module.exports = { store, findAll, findById, update, destroy };
