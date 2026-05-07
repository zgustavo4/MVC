const Pessoa = require('../models/pessoasModel')

const pessoaController = {
    index: async (req, res) => {
        try{
            const pessoa = await Pessoa.listarTodos()
            res.json(pessoa);
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = pessoaController