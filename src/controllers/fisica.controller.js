// src/controllers/fisica.controller.js
const model = require('../models/fisica');

// formulario de creación
const create = (req, res) => {
  res.render('fisica/create', { mensaje: '', error: null });
};

// guardar
const store = async (req, res) => {
  try {
    const { voltaje, temperatura, distancia, fecha } = req.body;
    const v = parseFloat(voltaje);
    const t = parseFloat(temperatura);
    const d = parseFloat(distancia);
    const fechaDatos = fecha ? new Date(fecha) : new Date();

    await model.store(v, t, d, fechaDatos);

    // vuelve al listado
    return res.redirect('/fisica');
    // si prefieres, podrías renderizar de nuevo el form:
    // return res.render('fisica/create', { mensaje: 'Datos agregados correctamente', error: null });
  } catch (e) {
    console.error('[store]', e);
    return res.status(500).render('fisica/create', { mensaje: '', error: 'Error al agregar datos' });
  }
};

// listado
const index = async (req, res) => {
  try {
    const fisica = await model.findAll();
    res.render('fisica/index', { fisica: Array.isArray(fisica) ? fisica : [], error: null });
  } catch (e) {
    console.error('[index]', e);
    res.status(500).render('fisica/index', { fisica: [], error: 'Error al obtener datos' });
  }
};

// en src/controllers/fisica.controller.js
const show = async (req, res) => {
  const { id } = req.params;
  try {
    const fisica = await model.findById(id);
    if (!fisica) {
      return res.status(404).render('fisica/show', { fisica: null, error: 'No se encontró el registro solicitado' });
    }
    res.render('fisica/show', { fisica, error: null });
  } catch (e) {
    console.error('[show]', e);
    res.status(500).render('fisica/show', { fisica: null, error: 'Error al obtener datos' });
  }
};

// formulario de edición
const edit = async (req, res) => {
  const { id } = req.params;
  try {
    const fisica = await model.findById(id);
    res.render('fisica/edit', { fisica, error: null });
  } catch (e) {
    console.error('[edit]', e);
    res.status(500).render('fisica/edit', { fisica: null, error: 'Error al obtener datos' });
  }
};

// actualizar
const update = async (req, res) => {
  const { id } = req.params;
  const { voltaje, temperatura, distancia } = req.body;
  try {
    await model.update(id, parseFloat(voltaje), parseFloat(temperatura), parseFloat(distancia));
    res.redirect('/fisica');
  } catch (e) {
    console.error('[update]', e);
    res.status(500).render('fisica/edit', {
      fisica: { ID_FISICA: id, voltaje, temperatura, distancia },
      error: 'Error al actualizar datos'
    });
  }
};

// eliminar
const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await model.destroy(id);
    res.redirect('/fisica');
  } catch (e) {
    console.error('[destroy]', e);
    res.status(500).render('fisica/index', { fisica: [], error: 'Error al eliminar datos' });
  }
};

module.exports = { create, store, index, show, edit, update, destroy };

