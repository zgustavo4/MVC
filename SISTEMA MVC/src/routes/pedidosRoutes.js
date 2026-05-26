const express = require('express')
const router = express.Router()
const pedidosController = require('../controllers/pedidosController')

router.get('/pedidos', pedidosController.index)
router.delete('/pedidos/id', pedidosController.delete)
module.exports = router