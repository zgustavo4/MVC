const pedidos = require('../model/pedidosModel')

const pedidosController = {
    listar: async (req, res) => {
        try {
            const resultado = await pedidos.listarPedidos()
            res.json(resultado)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    criar: async (req, res) => {
        try {
            const insertId = await pedidos.criar(req.body)
            res.status(201).json({ id: insertId, ...req.body })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    atualizar: async (req, res) => {
        const {id} = req.params
        try {
            const affectedRows = await pedidos.atualizar(id, req.body)
            if (affectedRows === 0){
                return res.status(404).json({message: "Registro não encontrado"})
            }
            res.json({ id, ...req.body })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    deletar: async (req, res) => {
        const {id} = req.params
        try {
            const affectedRows = await pedidos.deletar(id)
            if (affectedRows === 0){
                return res.status(404).json({message: "Registro não encontrado"})
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    
}

module.exports = pedidosController