const pool = require('../config/db');

const Pessoa = {
    listarTodos: async () => {
        const[rows] = await pool.execute('SELECT * FROM pessoas')
        return rows
    }
}

module.exports = Pessoa