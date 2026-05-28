require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

const pessoaRoutes = require('./src/routes/pessoasRoutes');
app.use(pessoaRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`server em http://localhost:${PORT}`))