const fornecedorModel = require('../models/fornecedorModel');

const { validationResult } = require('express-validator');

module.exports = {

    listar(req, res) {

        fornecedorModel.listar((error, resultados) => {

            if (error) {

                console.log(error);

                return res.send('Erro ao buscar fornecedores');
            }

            res.render('fornecedores/index', {
                fornecedores: resultados,
                sucesso: req.flash('sucesso'),
                erro: req.flash('erro')
            });
        });
    },

    createView(req, res) {

        res.render('fornecedores/create', {
            erros: [],
            dados: {}
        });
    },

    criar(req, res) {

        const erros = validationResult(req);

        if (!erros.isEmpty()) {

            return res.render('fornecedores/create', {
                erros: erros.array(),
                dados: req.body
            });
        }

        fornecedorModel.buscarDuplicado(
            req.body.email,
            req.body.telefone,

            (error, resultado) => {

                if (error) {

                    console.log(error);

                    return res.send('Erro interno');
                }

                if (resultado.length > 0) {

                    return res.render('fornecedores/create', {
                        erros: [
                            {
                                msg: 'Fornecedor já cadastrado'
                            }
                        ],
                        dados: req.body
                    });
                }

                fornecedorModel.criar(req.body, (error) => {

                    if (error) {

                        console.log(error);

                        return res.send('Erro ao cadastrar');
                    }

                    req.flash(
                        'sucesso',
                        'Fornecedor cadastrado com sucesso'
                    );

                    res.redirect('/fornecedores');
                });
            }
        );
    },

    editView(req, res) {

        fornecedorModel.buscarPorId(
            req.params.id,

            (error, resultado) => {

                if (error) {

                    console.log(error);

                    return res.send('Erro');
                }

                res.render('fornecedores/edit', {
                    fornecedor: resultado[0],
                    erros: []
                });
            }
        );
    },

    atualizar(req, res) {

        fornecedorModel.atualizar(
            req.params.id,
            req.body,

            (error) => {

                if (error) {

                    console.log(error);

                    return res.send('Erro ao atualizar');
                }

                req.flash(
                    'sucesso',
                    'Fornecedor atualizado'
                );

                res.redirect('/fornecedores');
            }
        );
    },

    deletar(req, res) {

        fornecedorModel.desativar(
            req.params.id,

            (error) => {

                if (error) {

                    console.log(error);

                    return res.send('Erro ao desativar');
                }

                req.flash(
                    'sucesso',
                    'Fornecedor desativado'
                );

                res.redirect('/fornecedores');
            }
        );
    }
};