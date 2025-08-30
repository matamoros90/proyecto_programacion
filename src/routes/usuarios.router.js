const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios.controller');
router.get('/', controller.index);
module.exports = router;