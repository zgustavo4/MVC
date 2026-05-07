require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pessoaRoutes = require('./src/routes/pessoasRoutes')

const app = express()
app.use(cors())
app.use(express.json());

app.use(pessoaRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`server rodando em http://localhost:${PORT}`))