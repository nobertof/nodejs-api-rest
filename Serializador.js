const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const jsontoxml = require("jsontoxml");
class Serializador {
  json(dados) {
    return JSON.stringify(dados);
  }
  xml(dados) {
    let tag = this.tagSingular

    if(Array.isArray(dados)){
        tag = this.tagPlural
        dados = dados.map((item)=>({[this.tagSingular]:item}))
    }
    return jsontoxml({ [tag]: dados });
  }
  serializar(dados) {
    dados = this.filtrar(dados);
    if (this.contentType === "application/json") {
      return this.json(dados);
    }
    if (this.contentType === "application/xml") {
      return this.xml(dados);
    }
    throw new ValorNaoSuportado(this.contentType);
  }
  filtrarObjeto(dados) {
    const novoObjeto = {};
    this.camposPublicos.forEach((campo) => {
      if (dados.hasOwnProperty(campo)) {
        novoObjeto[campo] = dados[campo];
      }
    });
    return novoObjeto;
  }
  filtrar(dados) {
    if (Array.isArray(dados)) {
      dados = dados.map((item) => this.filtrarObjeto(item));
    } else {
      dados = this.filtrarObjeto(dados);
    }
    return dados;
  }
}
class SerializadorFornecedor extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.tagSingular = "fornecedor";
    this.tagPlural = "fornecedores";
    this.contentType = contentType;
    this.camposPublicos = ["id", "categoria"].concat(
      camposExtras || []
    );
  }
}
class SerializadorErro extends Serializador {
  constructor(contentType, camposExtras) {
    super();
    this.tagSingular = "erro";
    this.tagPlural = "erros";
    this.contentType = contentType;
    this.camposPublicos = ["id", "error"].concat(camposExtras || []);
  }
}
class SerializadorProduto extends Serializador{
  constructor(contentType, camposExtras) {
    super();
    this.tagSingular = "produto";
    this.tagPlural = "produtos";
    this.contentType = contentType;
    this.camposPublicos = ["id", "titulo"].concat(camposExtras || []);
  }
}
module.exports = {
  Serializador,
  SerializadorFornecedor,
  SerializadorErro,
  SerializadorProduto,
  formatosAceitos: ["application/json", "application/xml"],
};
