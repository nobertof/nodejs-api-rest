const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
class Serializador {
  json(dados) {
    return JSON.stringify(dados);
  }
  serializar(dados) {
    if (this.contentType === "application/json") {
      return this.json(this.filtrar(dados));
    }
    throw new ValorNaoSuportado(this.contentType);
  }
  filtrarObjeto(dados) {
    const novoObjeto = {};
    console.log(this.camposPublicos);
    this.camposPublicos.forEach((campo) => {
      if (dados.hasOwnProperty(campo)) {
        console.log(campo);
        novoObjeto[campo] = dados[campo];
      }
    });
    console.log(novoObjeto);
    return novoObjeto;
  }
  filtrar(dados) {
    if (Array.isArray(dados)) {
      dados = dados.map(item=>this.filtrarObjeto(item));
    } else {
      dados = this.filtrarObjeto(dados);
    }
    return dados;
  }
}
class SerializadorFornecedor extends Serializador {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.camposPublicos = ["id", "empresa", "categoria"];
  }
}
module.exports = {
  Serializador,
  SerializadorFornecedor,
  formatosAceitos: ["application/json"],
};
