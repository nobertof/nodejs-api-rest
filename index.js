const customExpress = require("./config/customExpress");
const config = require("config");
console.log("conectado com sucesso!");
//Tabelas.init(conexao);
const app = customExpress();


app.listen(config.get("api.porta"), () =>
  console.log(`servidor rodando na porta ${config.get("api.porta")}`)
);
