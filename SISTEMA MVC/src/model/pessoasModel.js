// 1º PASSO
// CÓDIGO MYSQL

const pool = require('../config/db')

const Pessoa = {
    listarTodos: async () => {
        const [rows] = await pool.execute('SELECT * FROM pessoas')
        return rows
    },

    deletar: async (id) => {
        const [result] = await pool.execute('DELETE FROM pessoas WHERE id = ?', [id])
        return result.affectedRows
    },

    criar: async (dados) => {
        const query =
            `INSERT INTO pessoas
            (nome_razao_social, nome_social_fantasia, cep, endereco, numero, bairro, cidade, estado, pais, documento, tipo, email)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const values = [
            dados.nome_razao_social,
            dados.nome_social_fantasia || null,
            dados.cep || null,
            dados.endereco || null,
            dados.numero || null,
            dados.bairro || null,
            dados.cidade || null,
            dados.estado || null,
            dados.pais || 'Brasil',
            dados.documento,
            dados.tipo,
            dados.email || null
        ]
        const [result] = await pool.execute(query, values)
        return result.insertId
    },

    atualizar: async (id, dados) => {
        const query = 
            `UPDATE pessoas
            SET nome_razao_social = ?, nome_social_fantasia = ?, cep = ?, endereco = ?,
            numero = ?, bairro = ?, cidade = ?, estado = ?, pais = ?, documento = ?,
            tipo = ?, email = ?
            WHERE id = ?`
        const values = [
            dados.nome_razao_social,
            dados.nome_social_fantasia || null,
            dados.cep || null,
            dados.endereco || null,
            dados.numero || null,
            dados.bairro || null,
            dados.cidade || null,
            dados.estado || null,
            dados.pais || 'Brasil',
            dados.documento,
            dados.tipo,
            dados.email || null,
            id
        ]
        const [result] = await pool.execute(query, values)
        return result.affectedRows
    }

}

module.exports = Pessoa