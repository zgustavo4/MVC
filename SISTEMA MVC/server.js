const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

const pool = require('./src/config/db')

pool.getConnection()
    .then(connection => {
        console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso!');
        connection.release(); // Libera a conexão de volta para o pool
    })
    .catch(error => {
        console.error('❌ Falha ao conectar ao banco de dados MySQL:');
        console.error(error.message);
    });

// Rota GET - Listar todos
app.get('/pessoas', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM pessoas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

<<<<<<< HEAD
// Rota POST - Criar
app.post('/pessoas', async (req, res) => {
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

    const query = `
        INSERT INTO pessoas 
        (nome_razao_social, nome_social_fantasia, cep, endereco, numero, bairro, cidade, estado, pais, documento, tipo, email) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        nome_razao_social, 
        nome_social_fantasia || null, 
        cep || null, 
        endereco || null, 
        numero || null, 
        bairro || null, 
        cidade || null, 
        estado || null, 
        pais || 'Brasil', 
        documento, 
        tipo, 
        email || null
    ];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT - Atualizar
app.put('/pessoas/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

    const query = `
        UPDATE pessoas 
        SET nome_razao_social = ?, nome_social_fantasia = ?, cep = ?, endereco = ?, 
            numero = ?, bairro = ?, cidade = ?, estado = ?, pais = ?, documento = ?, 
            tipo = ?, email = ? 
        WHERE id = ?
    `;
    
    const values = [
        nome_razao_social, nome_social_fantasia || null, cep || null, endereco || null, 
        numero || null, bairro || null, cidade || null, estado || null, pais || 'Brasil', 
        documento, tipo, email || null, id
    ];

    try {
        const [result] = await pool.execute(query, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE - Remover
app.delete('/pessoas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM pessoas WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/produtos', async (req, res) => {
    try {
        const [resultado] = await pool.query("select * from produtos")
        res.status(201).json({"resposta": resultado})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post('/inserir_produtos', async (req, res) => {
    try {
        const {id, nome, descricao, preco, estoque, categoria} = req.body
    
        const sql = `insert into produtos (nome, descricao, preco, estoque, categoria) values (?,?,?,?,?)`
        const [resultado] = await pool.query(sql, [nome, descricao, preco, estoque, categoria])
        res.status(201).json({"resposta": resultado})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.put('/atualizar_produtos', async (req, res) => {
    try {
        const {id, nome, descricao, preco, estoque, categoria} = req.body
        const sql = `update produtos  set nome = ?, descricao = ?, preco =? , estoque = ?, categoria = ? where id = ?`
        const [resultado] = await pool.query(sql, [nome, descricao, preco, estoque, categoria, id])

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        res.status(201).json({"resposta": resultado})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


app.delete('/apagar_produtos', async (req, res) => {
    try {
        const {id} = req.body
        const sql = 'delete from produtos where id = ?'
        const [resultado] = await pool.query(sql, [id])

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        res.status(201).json({"resposta": resultado})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Inicialização
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

/* ======================================================
   ROTA GET - LISTAR TODOS OS PEDIDOS
====================================================== */

app.get('/pedidos', async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT * FROM pedidos
            ORDER BY id_pedido DESC
        `);

        res.status(200).json(rows);

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

});

/* ======================================================
   ROTA GET - LISTAR PEDIDO POR ID
====================================================== */

app.get('/pedidos/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await pool.query(`
            SELECT * FROM pedidos
            WHERE id_pedido = ?
        `, [id]);

        if (rows.length === 0) {

            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });

        }

        res.status(200).json(rows[0]);

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

});

/* ======================================================
   ROTA POST - CRIAR PEDIDO
====================================================== */

app.post('/pedidos', async (req, res) => {

    try {

        const {

            nome_cliente,
            telefone_cliente,
            itens,
            observacoes,
            valor_total,
            status,
            tipo_pedido,
            forma_pagamento,
            numero_mesa,
            data_entrega

        } = req.body;

        const sql = `
            INSERT INTO pedidos (

                nome_cliente,
                telefone_cliente,
                itens,
                observacoes,
                valor_total,
                status,
                tipo_pedido,
                forma_pagamento,
                numero_mesa,
                data_entrega

            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [

            nome_cliente,
            telefone_cliente || null,
            itens,
            observacoes || null,
            valor_total,
            status || 'pendente',
            tipo_pedido,
            forma_pagamento,
            numero_mesa || null,
            data_entrega || null

        ];

        const [resultado] = await pool.query(sql, valores);

        res.status(201).json({

            mensagem: 'Pedido criado com sucesso!',
            id_pedido: resultado.insertId

        });

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

});

/* ======================================================
   ROTA PUT - ATUALIZAR PEDIDO
====================================================== */

app.put('/pedidos/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {

            nome_cliente,
            telefone_cliente,
            itens,
            observacoes,
            valor_total,
            status,
            tipo_pedido,
            forma_pagamento,
            numero_mesa,
            data_entrega

        } = req.body;

        const sql = `
            UPDATE pedidos
            SET

                nome_cliente = ?,
                telefone_cliente = ?,
                itens = ?,
                observacoes = ?,
                valor_total = ?,
                status = ?,
                tipo_pedido = ?,
                forma_pagamento = ?,
                numero_mesa = ?,
                data_entrega = ?

            WHERE id_pedido = ?
        `;

        const valores = [

            nome_cliente,
            telefone_cliente || null,
            itens,
            observacoes || null,
            valor_total,
            status,
            tipo_pedido,
            forma_pagamento,
            numero_mesa || null,
            data_entrega || null,
            id

        ];

        const [resultado] = await pool.query(sql, valores);

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });

        }

        res.status(200).json({
            mensagem: 'Pedido atualizado com sucesso!'
        });

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

});

/* ======================================================
   ROTA PATCH - ALTERAR STATUS
====================================================== */

app.patch('/pedidos/:id/status', async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const sql = `
            UPDATE pedidos
            SET status = ?
            WHERE id_pedido = ?
        `;

        const [resultado] = await pool.query(sql, [status, id]);

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });

        }

        res.status(200).json({
            mensagem: 'Status atualizado com sucesso!'
        });

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

});

/* ======================================================
   ROTA DELETE - EXCLUIR PEDIDO
====================================================== */

app.delete('/pedidos/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const sql = `
            DELETE FROM pedidos
            WHERE id_pedido = ?
        `;

        const [resultado] = await pool.query(sql, [id]);

        if (resultado.affectedRows === 0) {

            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });

        }

        res.status(200).json({
            mensagem: 'Pedido removido com sucesso!'
        });

    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

});
=======
const livroRoutes = require('./src/routes/livrosRoutes')
server.use(livroRoutes)

server.listen(PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})
>>>>>>> 6a47f66950a00d71b3ae79ef8462681d93eaefc8
