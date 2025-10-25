const model = require('../models/fisica');

const store = async (req, res) => {
  const { voltaje, temperatura, distancia, fecha } = req.body;
  const v = Number(voltaje);
  const t = Number(temperatura);
  const d = Number(distancia);
  const fechaDatos = fecha ? new Date(fecha) : new Date();

  try {
    await model.store(v, t, d, fechaDatos);
    return res.redirect('/fisica');   // ← así verás de inmediato el registro
  } catch (error) {
    console.error('[store]', error);
    return res.status(500).render('fisica/create', { mensaje: 'Error al agregar datos' });
  }
};

// listado
const index = async (req, res) => {
  try {
    const fisica = await model.findAll();
    return res.render('fisica/index', { fisica: fisica || [], error: null });
  } catch (error) {
    console.error('[index]', error);
    return res.status(500).render('fisica/index', { fisica: [], error: 'Error al obtener datos' });
  }
};

// detalle (defensivo)
const show = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).render('fisica/show', { fisica: null, error: 'ID inválido' });
  }
  try {
    const fisica = await model.findById(id);
    if (!fisica) {
      return res.status(404).render('fisica/show', { fisica: null, error: 'Registro no encontrado' });
    }
    return res.render('fisica/show', { fisica, error: null });
  } catch (e) {
    console.error('[show]', e);
    return res.status(500).render('fisica/show', { fisica: null, error: 'Error al obtener datos' });
  }
};

// edición (defensivo)
const edit = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).render('fisica/edit', { fisica: null, error: 'ID inválido' });
  }
  try {
    const fis = await model.findById(id);
    if (!fis) {
      return res.status(404).render('fisica/edit', { fisica: null, error: 'Registro no encontrado' });
    }
    return res.render('fisica/edit', { fisica: fis, error: null });
  } catch (e) {
    console.error('[edit]', e);
    return res.status(500).render('fisica/edit', { fisica: null, error: 'Error al obtener datos' });
  }
};

// actualizar
const update = async (req, res) => {
  const { id } = req.params;
  const { voltaje, temperatura, distancia } = req.body;
  const v = parseFloat(voltaje);
  const t = parseFloat(temperatura);
  const d = parseFloat(distancia);

  try {
    await model.update(id, v, t, d);
    return res.redirect('/fisica');
  } catch (error) {
    console.error('[update]', error);
    return res.status(500).render('fisica/edit', { fisica: null, error: 'Error al actualizar datos' });
  }
};

// eliminar
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await model.destroy(id);
    return res.redirect('/fisica');
  } catch (error) {
    console.error('[destroy]', error);
    return res.status(500).render('fisica/index', { fisica: [], error: 'Error al eliminar datos' });
  }
};

module.exports = { create, store, index, show, edit, update, destroy };



