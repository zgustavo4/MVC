const Produto = require('../model/produtosModel');

const produtosController = {
    index: async (req,res) =>{
        try{
            const produto = await Produto.listarTodos()
            res.json(produto);
        }catch(error){
            res.status(500).json({error:error.message})
        }
    }
}

module.exports = produtosController