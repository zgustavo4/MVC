const express = require('express')
const router = express.Router()
const produtoController = require('../controller/produtosController')

router.get('/produtos', produtoController.index)

module.exports = router