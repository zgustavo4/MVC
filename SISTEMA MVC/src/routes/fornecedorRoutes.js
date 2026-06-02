const express = require('express');

const router = express.Router();

const fornecedorController =
    require('../controller/fornecedorController');

router.get(
    '/fornecedores',
    fornecedorController.listar
);

router.post(
    '/fornecedores',
    fornecedorController.criar
);

router.put(
    '/fornecedores/:id',
    fornecedorController.atualizar
);

router.delete(
    '/fornecedores/:id',
    fornecedorController.deletar
);

module.exports = router;