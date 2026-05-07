const express = require('express')
const router = express.Router()
const pessoaController = require('../controllers/pessoasController')

router.get('/pessoas', pessoaController.index)

module.exports = router