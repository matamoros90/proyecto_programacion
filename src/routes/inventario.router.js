const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventario.controller');
router.get('/create', controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.store);

module.exports = router;