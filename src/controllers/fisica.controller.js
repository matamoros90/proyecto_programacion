const model = require('../models/fisica');

const create = (req, res) => {
  res.render('fisica/create', { mensaje: '' });
};

const store = async (req, res) => {
  const { voltaje, temperatura, distancia, fecha } = req.body;
  const fechaDatos = fecha ? new Date(fecha) : new Date();

  try {
    await model.store(voltaje, temperatura, distancia, fechaDatos);
    res.render('fisica/create', { mensaje: 'Datos agregados correctamente' });
  } catch (error) {
    console.error(error);
    res.render('fisica/create', { mensaje: 'Error al agregar datos' });
  }
};

const index = async (req, res) => {
    try {
        const fisica = await model.findAll();
        res.render('fisica/index', { fisica });
    } catch (error) {
        res.render('fisica/index', { error: 'Error al obtener datos' });
    }
};

const show = async (req, res) => {
    const { id } = req.params;
    try {
        const fisica = await model.findById(id);
        res.render('fisica/show', { fisica });
    } catch (error) {
        res.render('fisica/show', { error: 'Error al obtener datos' });
    }
};

const edit = async (req, res) => {
    const { id } = req.params;
    try {
        const fisica = await model.findById(id);
        res.render('fisica/edit', { fisica });
    } catch (error) {
        res.render('fisica/edit', { error: 'Error al obtener datos' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { voltaje, temperatura, distancia } = req.body;
    try {
        await model.update(id, voltaje, temperatura, distancia);
        res.redirect('/fisica');
    } catch (error) {
        res.render('fisica', { error: 'Error al actualizar datos' });
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await model.destroy(id);
        res.redirect('/fisica');
    } catch (error) {
        res.render('fisica', { error: 'Error al eliminar datos' });
    }
};

module.exports = { create, store, index, show, update, edit, destroy };