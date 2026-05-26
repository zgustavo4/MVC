const express = require('express');

const router = express.Router();

const fornecedorController = require('../controllers/fornecedorController');

const {
    validacoesFornecedor
} = require('../middlewares/fornecedorValidation');

router.get(
    '/fornecedores',
    fornecedorController.listar
);

router.get(
    '/fornecedores/create',
    fornecedorController.createView
);

router.post(
    '/fornecedores/create',
    validacoesFornecedor,
    fornecedorController.criar
);

router.get(
    '/fornecedores/edit/:id',
    fornecedorController.editView
);

router.post(
    '/fornecedores/edit/:id',
    fornecedorController.atualizar
);

router.get(
    '/fornecedores/delete/:id',
    fornecedorController.deletar
);

module.exports = router;