const pool = require('../config/db')
const { atualizar } = require('./pessoasModel')

const pedidos = {
    listarLivros: async () => {
        const [rows] = await pool.execute('SELECT * FROM pedidos')
        return rows
    },

    criar: async (dados) => {
        const query = `INSERT INTO pedidos data_pedido = ?, nome_cliente = ?, telefone_cliente = ?, itens = ?, observacoes = ?, valor_total = ?, status = ?, tipo_pedido = ?, forma_pagamento = ?, numero_mesa = ?, data_entrega WHERE id = ?`
        const values = [
            dados.data_pedido, 
            dados.nome_cliente,
            dados.telefone_cliente,
            dados.itens,
            dados.observacoes,
            dados.valor_total,
            dados.status,
            dados.tipo_pedido,
            dados.forma_pagamento,
            dados.numero_mesa,
            dados.data_entrega,
            id
        ]
        const [result] = await pool.execute(query, values)
        return result.insertId
    },
    
    atualizar: async (id, dados) => {
        const query = `UPDATE pedidos SET data_pedido = ?, nome_cliente = ?, telefone_cliente = ?, itens = ?, observacoes = ?, valor_total = ?, status = ?, tipo_pedido = ?, forma_pagamento = ?, numero_mesa = ?, data_entrega WHERE id = ?`
        const values = [
            dados.data_pedido, 
            dados.nome_cliente,
            dados.telefone_cliente,
            dados.itens,
            dados.observacoes,
            dados.valor_total,
            dados.status,
            dados.tipo_pedido,
            dados.forma_pagamento,
            dados.numero_mesa,
            dados.data_entrega,
            id
        ]
        const [result] = await pool.execute(query, values)
        return result.affectedRows
    },

    deletar: async (id) => {
        const [result] = await pool.execute(`DELETE FROM pedidos WHERE id = ?`, [id])
        return result.affectedRows
    }
}

module.exports = pedidos