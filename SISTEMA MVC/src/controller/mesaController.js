const Mesa = require("../model/mesaModel");

exports.listar = async (req, res) => {

    const mesas = await Mesa.getAll();

    res.render("mesa/index", {
        mesas
    });
};

exports.formNovo = (req, res) => {

    res.render("mesa/novo");
};

exports.criar = async (req, res) => {

    await Mesa.create(req.body);

    res.redirect("/mesa");
};

exports.formEditar = async (req, res) => {

    const mesa = await Mesa.getById(req.params.id);

    res.render("mesa/editar", {
        mesa
    });
};

exports.atualizar = async (req, res) => {

    await Mesa.update(
        req.params.id,
        req.body
    );

    res.redirect("/mesa");
};

exports.deletar = async (req, res) => {

    await Mesa.delete(req.params.id);

    res.redirect("/mesa");
};