const Livro = require('../model/livrosModel')

const livroController = {
    listar: async (req, res) => {
        try {
            const livro = await Livro.listar
            res.json(livro)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    criar: async (req, res) => {
        try {
            const insertId = await Livro.criar(req.body)
            res.status(201).json({ id: insertId, ...req.body })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },

    atualizar: async (req, res) => {
        const {id} = req.params
        try {
            const affectedRows = await Livro.atualizar(id, req.body)
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
            const affectedRows = await Livro.deletar(id)
            if (affectedRows === 0){
                return res.status(404).json({message: "Registro não encontrado"})
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    
}

module.exports = livroController