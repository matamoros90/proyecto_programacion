const express = require('express');
const router = express.Router();
const Controller = require('../controllers/categorias.controller');
router.get('/', Controller.index);
router.get('/:id', Controller.show);
module.exports = router;