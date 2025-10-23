const pool = require('./mysql');

const store = async (voltaje, temperatura, distancia, fechaDatos) => {
  const sql = "INSERT INTO fisica (voltaje, temperatura, distancia, `Fecha_Datos`) VALUES (?, ?, ?, ?)";
  const fecha = fechaDatos || new Date();
  const [result] = await pool.query(sql, [voltaje, temperatura, distancia, fecha]);
  return result;
};

const findAll = async () => {
  const sql = `
    SELECT 
      ID_FISICA,
      VOLTAJE      AS voltaje,
      TEMPERATURA  AS temperatura,
      DISTANCIA    AS distancia,
      Fecha_Datos  AS Fecha_Datos
    FROM fisica
    ORDER BY ID_FISICA ASC
  `;
  const [rows] = await pool.query(sql);
  return rows;
};

const findById = async (id) => {
  const sql = `
    SELECT 
      ID_FISICA,
      VOLTAJE      AS voltaje,
      TEMPERATURA  AS temperatura,
      DISTANCIA    AS distancia,
      Fecha_Datos  AS Fecha_Datos
    FROM fisica
    WHERE ID_FISICA = ?
  `;
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

const update = async (id, voltaje, temperatura, distancia) => {
  const sql = "UPDATE fisica SET voltaje = ?, temperatura = ?, distancia = ? WHERE ID_FISICA = ?";
  const [result] = await pool.query(sql, [voltaje, temperatura, distancia, id]);
  return result;
};

const destroy = async (id) => {
  const sql = "DELETE FROM fisica WHERE ID_FISICA = ?";
  const [result] = await pool.query(sql, [id]);
  return result;
};

module.exports = { store, findAll, findById, update, destroy };