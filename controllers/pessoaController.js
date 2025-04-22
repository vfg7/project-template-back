// controllers/pessoaController.js
const PessoaModel = require('../models/pessoaModel');

class PessoaController {
  // Listar todas as pessoas
  static getAllPessoas(req, res) {
    PessoaModel.getAll((err, pessoas) => {
      if (err) {
        return res.status(500).json({ 
          error: true, 
          message: 'Erro ao buscar pessoas', 
          details: err.message 
        });
      }
      res.status(200).json({ pessoas });
    });
  }

  // Obter uma pessoa específica
  static getPessoaById(req, res) {
    const id = req.params.id;
    
    PessoaModel.getById(id, (err, pessoa) => {
      if (err) {
        return res.status(500).json({ 
          error: true, 
          message: 'Erro ao buscar pessoa', 
          details: err.message 
        });
      }
      if (!pessoa) {
        return res.status(404).json({ 
          error: true, 
          message: 'Pessoa não encontrada' 
        });
      }
      res.status(200).json({ pessoa });
    });
  }

  // Criar uma nova pessoa
  static createPessoa(req, res) {
    const { nome, idade } = req.body;
    
    // Validação simples
    if (!nome || !idade) {
      return res.status(400).json({ 
        error: true, 
        message: 'Nome e idade são obrigatórios' 
      });
    }

    const pessoa = { nome, idade };
    
    PessoaModel.create(pessoa, (err, novaPessoa) => {
      if (err) {
        return res.status(500).json({ 
          error: true, 
          message: 'Erro ao criar pessoa', 
          details: err.message 
        });
      }
      res.status(201).json({ 
        message: 'Pessoa criada com sucesso', 
        pessoa: novaPessoa 
      });
    });
  }

  // Atualizar uma pessoa
  static updatePessoa(req, res) {
    const id = req.params.id;
    const { nome, idade } = req.body;
    
    // Validação simples
    if (!nome || !idade) {
      return res.status(400).json({ 
        error: true, 
        message: 'Nome e idade são obrigatórios' 
      });
    }

    const pessoa = { nome, idade };
    
    PessoaModel.update(id, pessoa, (err, pessoaAtualizada) => {
      if (err) {
        return res.status(500).json({ 
          error: true, 
          message: 'Erro ao atualizar pessoa', 
          details: err.message 
        });
      }
      res.status(200).json({ 
        message: 'Pessoa atualizada com sucesso', 
        pessoa: pessoaAtualizada 
      });
    });
  }

  // Excluir uma pessoa
  static deletePessoa(req, res) {
    const id = req.params.id;
    
    PessoaModel.delete(id, (err, resultado) => {
      if (err) {
        return res.status(500).json({ 
          error: true, 
          message: 'Erro ao excluir pessoa', 
          details: err.message 
        });
      }
      if (!resultado.deleted) {
        return res.status(404).json({ 
          error: true, 
          message: 'Pessoa não encontrada' 
        });
      }
      res.status(200).json({ 
        message: 'Pessoa excluída com sucesso', 
        id 
      });
    });
  }
}

module.exports = PessoaController;