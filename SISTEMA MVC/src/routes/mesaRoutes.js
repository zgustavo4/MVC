const express = require("express");
const router = express.Router();
const mesaController = require("../controller/mesaController");

router.get("/", mesaController.listar);

router.post("/", mesaController.criar);

router.put("/:id", mesaController.atualizar);

router.delete("/:id", mesaController.deletar);

module.exports = router;