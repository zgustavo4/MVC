const pool = require('../config/db');

const pedidos = {
    listarTodos: async () => {
        const[rows] = await pool.execute('SELECT * FROM pedidos')
        return rows
    }
}

module.exports = pedidos