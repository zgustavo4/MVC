const db = require('../database/db');

module.exports = {

    listar(callback) {

        const sql = `
            SELECT *
            FROM fornecedores
            ORDER BY nome ASC
        `;

        db.query(sql, callback);
    },

    buscarPorId(id, callback) {

        const sql = `
            SELECT *
            FROM fornecedores
            WHERE id_fornecedor = ?
        `;

        db.query(sql, [id], callback);
    },

    buscarDuplicado(email, telefone, callback) {

        const sql = `
            SELECT *
            FROM fornecedores
            WHERE email = ?
            OR telefone = ?
        `;

        db.query(sql, [email, telefone], callback);
    },

    criar(dados, callback) {

        const sql = `
            INSERT INTO fornecedores
            (
                nome,
                contato,
                telefone,
                email,
                endereco,
                produtos_fornecidos,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            dados.nome,
            dados.contato,
            dados.telefone,
            dados.email,
            dados.endereco,
            dados.produtos_fornecidos,
            dados.status
        ], callback);
    },

    atualizar(id, dados, callback) {

        const sql = `
            UPDATE fornecedores
            SET
                nome = ?,
                contato = ?,
                telefone = ?,
                email = ?,
                endereco = ?,
                produtos_fornecidos = ?,
                status = ?
            WHERE id_fornecedor = ?
        `;

        db.query(sql, [
            dados.nome,
            dados.contato,
            dados.telefone,
            dados.email,
            dados.endereco,
            dados.produtos_fornecidos,
            dados.status,
            id
        ], callback);
    },

    desativar(id, callback) {

        const sql = `
            UPDATE fornecedores
            SET status = 'INATIVO'
            WHERE id_fornecedor = ?
        `;

        db.query(sql, [id], callback);
    }
};