// models/pessoaModel.js
const db = require('../config/database');

class PessoaModel {
  // Obter todas as pessoas
  static getAll(callback) {
    const sql = 'SELECT * FROM pessoas';
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, rows);
    });
  }

  // Obter uma pessoa pelo ID
  static getById(id, callback) {
    const sql = 'SELECT * FROM pessoas WHERE id = ?';
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, row);
    });
  }

  // Criar uma nova pessoa
  static create(pessoa, callback) {
    const sql = 'INSERT INTO pessoas (nome, idade) VALUES (?, ?)';
    
    db.run(sql, [pessoa.nome, pessoa.idade], function(err) {
      if (err) {
        return callback(err, null);
      }
      callback(null, { id: this.lastID, ...pessoa });
    });
  }

  // Atualizar uma pessoa
  static update(id, pessoa, callback) {
    const sql = 'UPDATE pessoas SET nome = ?, idade = ? WHERE id = ?';
    
    db.run(sql, [pessoa.nome, pessoa.idade, id], function(err) {
      if (err) {
        return callback(err, null);
      }
      callback(null, { id, ...pessoa });
    });
  }

  // Excluir uma pessoa
  static delete(id, callback) {
    const sql = 'DELETE FROM pessoas WHERE id = ?';
    
    db.run(sql, [id], function(err) {
      if (err) {
        return callback(err, null);
      }
      callback(null, { id, deleted: this.changes > 0 });
    });
  }
}

module.exports = PessoaModel;