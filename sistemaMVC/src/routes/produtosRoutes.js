const express = require('express')
const router = express.Router()
const produtosController = rquire('../controller/produtosController')

router.get('/produtos', produtosController.index)

module.exports = router