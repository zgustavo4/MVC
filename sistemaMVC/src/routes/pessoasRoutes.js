const express = require('express')
const router = express.Router()
const pessoaController = require('../controller/pessoasController')

router.get('/pessoas', pessoaController.index)
router.delete('/pessoas/:id', pessoaController.delete)

module.exports = router