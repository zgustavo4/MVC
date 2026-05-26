require('dotenv').config()
const express = require('express')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

const PORT = process.env.PORT

const pessoaRoutes = require('./src/routes/pessoasRoutes')
server.use(pessoaRoutes)

const produtoRoutes = require('./src/routes/produtosRoutes')
server.use(produtoRoutes)

server.listen(PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})