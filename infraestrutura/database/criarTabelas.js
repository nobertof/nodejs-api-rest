const modeloTabela = require("../../routes/fornecedores/ModeloTabelaFornecedor");

modeloTabela
  .sync()
  .then(() => console.log("Tabela criada com sucesso"))
  .catch(console.log);
