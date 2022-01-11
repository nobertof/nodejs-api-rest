const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/database/conexao");
const Tabelas = require("./infraestrutura/database/tabelas");
const config = require("config");

const roteador = require('./routes/fornecedores')
console.log("conectado com sucesso!");
//Tabelas.init(conexao);
const app = customExpress();

app.use('/api/fornecedores', roteador)
app.listen(config.get("api.porta"), () =>
  console.log(`servidor rodando na porta ${config.get("api.porta")}`)
);
