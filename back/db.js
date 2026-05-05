const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Alterar para o usuário correspondente
    password: '', // Alterar para a senha correspondente
    database: 'exemplos'
})

module.exports = pool