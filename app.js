// app.js
const express = require('express');
const cors = require('cors');
const pessoaRoutes = require('./routes/pessoaRoutes');

// Inicialização do app
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', pessoaRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: "API de Pessoas está funcionando!" });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});

module.exports = app;