const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root', // Alterar para o usuário correspondente
    password: '', // Alterar para a senha correspondente
    database: 'exemplos'
};

const pool = mysql.createPool(dbConfig);

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
        const [rows] = await pool.execute('SELECT * FROM pessoa');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST - Criar
app.post('/pessoas', async (req, res) => {
    const { 
        nome_razao_social, nome_social_fantasia, cep, endereco, 
        numero, bairro, cidade, estado, pais, documento, tipo, email 
    } = req.body;

    const query = `
        INSERT INTO pessoa
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
        UPDATE pessoa
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
        const [result] = await pool.execute('DELETE FROM pessoa WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Produtos

// Rota GET - Listar todos
app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST - Criar
app.post('/criarprodutos', async (req, res) => {
    const { nome, descricao, preco, estoque, categoria} = req.body;

    const query = `
        INSERT INTO produtos 
        (nome, descricao, preco, estoque, categoria) 
        VALUES (?, ?, ?, ?, ?)
    `;
    
    const values = [
        nome || null, 
        descricao || null, 
        preco || null, 
        estoque || null, 
        categoria || null,
    ];

    try {
        const [result] = await pool.execute(query, values);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota PUT - Atualizar
app.put('/atualizarprodutos/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        nome, descricao, preco, estoque, categoria 
    } = req.body;

    const query = `
        UPDATE produtos 
        SET nome = ?, descricao = ?, preco = ?, estoque = ?, categoria = ?
        WHERE id = ?
    `;
    
    const values = [
        nome || null,
        descricao || null,
        preco || null,
        estoque || null,
        categoria || null,
        id
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
app.delete('/deletarprodutos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute('DELETE FROM produtos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota GET - Listar fornecedores
app.get('/fornecedores', async (req, res) => {

    try {

        const [rows] = await pool.execute(
            'SELECT * FROM fornecedores ORDER BY nome ASC'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// Rota POST - Criar fornecedor
app.post('/criarfornecedor', async (req, res) => {

    const {
        nome,
        contato,
        telefone,
        email,
        endereco,
        produtos_fornecidos,
        status
    } = req.body;

    // VALIDAÇÕES

    if (!nome || !telefone || !email) {

        return res.status(400).json({
            message: 'Nome, telefone e email são obrigatórios'
        });
    }

    try {

        // VERIFICA DUPLICIDADE

        const [existente] = await pool.execute(
            `
            SELECT *
            FROM fornecedores
            WHERE email = ?
            OR telefone = ?
            `,
            [email, telefone]
        );

        if (existente.length > 0) {

            return res.status(400).json({
                message: 'Fornecedor já cadastrado'
            });
        }

        // INSERT

        const query = `
            INSERT INTO fornecedores
            (
                nome,
                contato,
                telefone,
                email,
                endereco,
                produtos_fornecidos,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            nome,
            contato || null,
            telefone,
            email,
            endereco || null,
            produtos_fornecidos || null,
            status || 'ATIVO'
        ];

        const [result] = await pool.execute(
            query,
            values
        );

        res.status(201).json({
            message: 'Fornecedor cadastrado com sucesso',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// Rota PUT - Atualizar fornecedor
app.put('/atualizarfornecedor/:id', async (req, res) => {

    const { id } = req.params;

    const {
        nome,
        contato,
        telefone,
        email,
        endereco,
        produtos_fornecidos,
        status
    } = req.body;

    try {

        const query = `
            UPDATE fornecedores
            SET
                nome = ?,
                contato = ?,
                telefone = ?,
                email = ?,
                endereco = ?,
                produtos_fornecidos = ?,
                status = ?
            WHERE id = ?
        `;

        const values = [
            nome,
            contato || null,
            telefone || null,
            email || null,
            endereco || null,
            produtos_fornecidos || null,
            status || 'ATIVO',
            id
        ];

        const [result] = await pool.execute(
            query,
            values
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: 'Fornecedor não encontrado'
            });
        }

        res.json({
            message: 'Fornecedor atualizado com sucesso'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// Rota DELETE - Desativar fornecedor
app.delete('/deletarfornecedor/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const [result] = await pool.execute(
            `
            UPDATE fornecedores
            SET status = 'INATIVO'
            WHERE id = ?
            `,
            [id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: 'Fornecedor não encontrado'
            });
        }

        res.json({
            message: 'Fornecedor desativado com sucesso'
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

// Inicialização
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});