require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// DB
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
};

const pool = mysql.createPool(dbConfig);
=======
const pool = require('./db')
>>>>>>> 2c501fdc4768a253d7b050c009f6cb16a34f4fee

// TESTE CONEXÃO
pool.getConnection()
    .then(conn => {
        console.log('✅ Conectado ao MySQL!');
        conn.release();
    })
    .catch(err => {
        console.error('❌ Erro ao conectar:', err.message);
    });

/* =========================
   PRODUTOS
========================= */

// GET
app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        console.error("ERRO GET:", error);
        res.status(500).json({ error: error.message });
    }
});

// POST
app.post('/produtos', async (req, res) => {
    console.log("BODY RECEBIDO:", req.body); // 👈 DEBUG

    const { nome, descricao, preco, estoque, categoria } = req.body;

    // 🔥 VALIDAÇÃO
    if (!nome || preco === undefined) {
        return res.status(400).json({ message: "Nome e preço são obrigatórios" });
    }

    const query = `
        INSERT INTO produtos
        (nome, descricao, preco, estoque, categoria)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        nome,
        descricao || null,
        parseFloat(preco),
        parseInt(estoque) || 0,
        categoria || null
    ];

    try {
        const [result] = await pool.execute(query, values);

        res.status(201).json({
            id: result.insertId,
            nome,
            descricao,
            preco,
            estoque,
            categoria
        });

    } catch (error) {
        console.error("❌ ERRO SQL PRODUTO:", error); // 👈 AGORA VOCÊ VÊ O ERRO
        res.status(500).json({ error: error.message });
    }
});

//teste comit

// PUT
app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoria } = req.body;

    const query = `
        UPDATE produtos
        SET nome = ?, descricao = ?, preco = ?, estoque = ?, categoria = ?
        WHERE id = ?
    `;

    const values = [
        nome,
        descricao || null,
        parseFloat(preco),
        parseInt(estoque) || 0,
        categoria || null,
        id
    ];

    try {
        const [result] = await pool.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.json({ id, ...req.body });

    } catch (error) {
        console.error("❌ ERRO UPDATE:", error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM produtos WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.status(204).send();

    } catch (error) {
        console.error("❌ ERRO DELETE:", error);
        res.status(500).json({ error: error.message });
    }
});

/* =========================
   START
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});