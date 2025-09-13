const inventario = [
  { id: 1, nombre: 'inventario 1' },
  { id: 2, nombre: 'inventario 2' },
  { id: 3, nombre: 'inventario 3' },
];

const index = (req, res) => {
  res.render('inventario/index', { inventario });
};

const show = (req, res) => {
  const { id } = req.params;
  const item = inventario.find(p => p.id === parseInt(id, 10));
  if (!item) return res.status(404).send('Inventario no encontrado');

  res.render('inventario/show', {item });
};

const create = (req, res) => {
  res.render('inventario/create');
};

const store = (req, res) => {
  const { nombre } = req.body;
  const nuevo = { id: inventario.length + 1, nombre };
  inventario.push(nuevo);
  res.redirect('/inventario');
};

module.exports = {
  index,
  show,
  create,
  store,
};