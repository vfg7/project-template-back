// routes/pessoaRoutes.js
const express = require('express');
const router = express.Router();
const PessoaController = require('../controllers/pessoaController');

// Rotas CRUD para pessoas
router.get('/pessoas', PessoaController.getAllPessoas);
router.get('/pessoas/:id', PessoaController.getPessoaById);
router.post('/pessoas', PessoaController.createPessoa);
router.put('/pessoas/:id', PessoaController.updatePessoa);
router.delete('/pessoas/:id', PessoaController.deletePessoa);

module.exports = router;