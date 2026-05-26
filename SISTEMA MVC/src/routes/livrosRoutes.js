const express = require('express')
const router = express.Router()

const livroController = require('../controller/livrosController')

router.get('/livros', livroController.listar)
router.post('/livros', livroController.criar)
router.put('/livros/:id', livroController.atualizar)
router.delete('/livros/:id', livroController.deletar)

module.exports = router