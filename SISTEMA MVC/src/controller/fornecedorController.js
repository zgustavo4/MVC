const fornecedorModel = require('../model/fornecedorModel');

module.exports = {

    async listar(req, res) {

        try {

            const fornecedores =
                await fornecedorModel.listar();

            res.json(fornecedores);

        } catch (erro) {

            console.log(erro);

            res.status(500).json({
                erro: erro.message
            });
        }
    },

    async criar(req, res) {

        try {

            const resultado =
                await fornecedorModel.criar(req.body);

            res.status(201).json({
                mensagem: 'Fornecedor cadastrado',
                id: resultado.insertId
            });

        } catch (erro) {

            console.log(erro);

            res.status(500).json({
                erro: erro.message
            });
        }
    },

    async atualizar(req, res) {

        try {

            await fornecedorModel.atualizar(
                req.params.id,
                req.body
            );

            res.json({
                mensagem: 'Fornecedor atualizado'
            });

        } catch (erro) {

            console.log(erro);

            res.status(500).json({
                erro: erro.message
            });
        }
    },

    async deletar(req, res) {

        try {

            await fornecedorModel.deletar(
                req.params.id
            );

            res.json({
                mensagem: 'Fornecedor deletado'
            });

        } catch (erro) {

            console.log(erro);

            res.status(500).json({
                erro: erro.message
            });
        }
    }
};