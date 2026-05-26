const pool = require('../config/db');

const Produto = {
    listarTodos: async () => {
        const[rows] = await pool.execute('SELECT * FROM produtos')
        return rows
    }
}

module.exports = Produto