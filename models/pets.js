const res = require("express/lib/response");
const conexao = require("../infraestrutura/database/conexao");
const uploadDeArquivo = require("../infraestrutura/arquivos/uploadDeArquivos");
class Pet {
  adiciona(pet, res) {
    const sql = "INSERT INTO Pets SET ?";
    uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
      console.log(erro)
      if (erro) {
        res.status(400).json({erro})
      } else {
        const novoPet = { ...pet, imagem: novoCaminho };
        conexao.query(sql, novoPet, (erro, resultados) => {
          if (erro) {
            res.status(400).json(erro);
          } else {
            res.status(201).json(novoPet);
          }
        });
      }
    });
  }
}
module.exports = new Pet();
