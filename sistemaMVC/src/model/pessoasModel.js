const pool = require('../config/db');

const Pessoa = {
    listarTodos: async () => {
        const[rows] = await pool.execute('SELECT * FROM pessoa')
        return rows
    },
    deletar: async (id) => {
        const [result] = await pool.execute('DELETE FROM PESSOA WHERE id = ?', [id]);
        return result.affectedRows;
    }
}


module.exports = Pessoa