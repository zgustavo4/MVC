const pedidos = require('../models/pedidosModel')

const pedidosController = {
    index: async (req, res) => {
        try{
            const pedidos = await pedidos.listarTodos()
            res.json(pedidos);
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = pedidosController