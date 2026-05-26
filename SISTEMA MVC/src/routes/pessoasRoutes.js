// 3º PASSO
// NOME DA ROTA

const express = require('express')
const router = express.Router()
const pessoaController = require('../controller/pessoasController')

router.get('/pessoas', pessoaController.index)
router.post('/pessoas', pessoaController.store)
router.put('/pessoas/:id', pessoaController.update)
router.delete('/pessoas/:id', pessoaController.delete)

module.exports = router