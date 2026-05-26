const express = require('express')
const router = express.Router()
const pedidosController = require('../controllers/pedidosController')

router.get('/pedidos', pedidosController.listar)
router.post('/pedidos', pedidosController.criar)
router.put('/pedidos/:id', pedidosController.atualizar)
router.delete('/pedidos/:id', pedidosController.deletar)
module.exports = router