// src/controllers/fisica.controller.js
const model = require('../models/fisica');

const index = async (req, res) => {
  try {
    const fisica = await model.findAll();
    // ✅ SIEMPRE manda fisica
    res.render('fisica/index', { fisica, error: null });
  } catch (error) {
    console.error('[index]', error);
    // ✅ Incluso en error, manda un arreglo vacío
    res.status(500).render('fisica/index', { fisica: [], error: 'Error al obtener datos' });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const fisica = await model.findById(id);
    res.render('fisica/show', { fisica, error: null });
  } catch (e) {
    console.error('[show]', e);
    res.status(500).render('fisica/show', { fisica: null, error: 'Error al obtener datos' });
  }
};

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

module.exports = { index, show, edit /* …los demás */ };
        res.render('fisica', { error: 'Error al eliminar datos' });
    }
};
module.exports = { create, store, index, show, update, edit, destroy };
