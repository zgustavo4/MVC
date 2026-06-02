const db = require('../config/db');

module.exports = {

    async listar() {

        const [resultado] = await db.query(
            'SELECT * FROM fornecedores'
        );

        return resultado;
    },

    async criar(dados) {

        const [resultado] = await db.query(
            `INSERT INTO fornecedores
            (
                nome,
                contato,
                telefone,
                email,
                endereco,
                produtos_fornecidos,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                dados.nome,
                dados.contato,
                dados.telefone,
                dados.email,
                dados.endereco,
                dados.produtos_fornecidos,
                dados.status
            ]
        );

        return resultado;
    },

    async atualizar(id, dados) {

        const [resultado] = await db.query(
            `UPDATE fornecedores SET
                nome = ?,
                contato = ?,
                telefone = ?,
                email = ?,
                endereco = ?,
                produtos_fornecidos = ?,
                status = ?
            WHERE id_fornecedor = ?`,
            [
                dados.nome,
                dados.contato,
                dados.telefone,
                dados.email,
                dados.endereco,
                dados.produtos_fornecidos,
                dados.status,
                id
            ]
        );

        return resultado;
    },

    async deletar(id) {

        const [resultado] = await db.query(
            'DELETE FROM fornecedores WHERE id_fornecedor = ?',
            [id]
        );

        return resultado;
    }
};