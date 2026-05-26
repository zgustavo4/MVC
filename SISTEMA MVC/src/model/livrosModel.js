const pool = require('../config/db')
const { atualizar } = require('./pessoasModel')

const Livro = {
    listarLivros: async () => {
        const [rows] = await pool.execute('SELECT * FROM livros')
        return rows
    },

    criar: async (dados) => {
        const query = `INSERT INTO livros (titulo, autor, genero, status) VALUES (?, ?, ?, ?) `
        const values = [
            dados.titulo,
            dados.autor,
            dados.genero,
            dados.status
        ]
        const [result] = await pool.execute(query, values)
        return result.insertId
    },
    
    atualizar: async (id, dados) => {
        const query = `UPDATE livros SET titulo = ?, autor = ?, genero = ?, status = ? WHERE id = ?`
        const values = [
            dados.titulo, 
            dados.autor,
            dados.genero,
            dados.status,
            id
        ]
        const [result] = await pool.execute(query, values)
        return result.affectedRows
    },

    deletar: async (id) => {
        const [result] = await pool.execute(`DELETE FROM livros WHERE id = ?`, [id])
        return result.affectedRows
    }
}

module.exports = Livro