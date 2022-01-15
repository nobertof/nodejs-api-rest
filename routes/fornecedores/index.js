const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");
const SerializadorFornecedor =
  require("../../Serializador").SerializadorFornecedor;
roteador.options("/", (req, res, next) => {
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204).end();
});
roteador.get("/", async (req, res, next) => {
  const resultados = await TabelaFornecedor.listar();
  const serializador = new SerializadorFornecedor(
    res.getHeader("Content-Type"),['empresa']
  );
  return res.status(200).send(serializador.serializar(resultados));
});
roteador.post("/", async (req, res, next) => {
  try {
    const fornecedor = new Fornecedor(req.body);
    await fornecedor.criar();
    const serializador = new SerializadorFornecedor(
      res.getHeader("Content-Type"),['empresa']
    );
    return res.status(201).send(serializador.serializar(fornecedor));
  } catch (error) {
    return next(error);
  }
});
roteador.options("/:id", (req, res, next) => {
  res.set("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204).end();
});
roteador.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    const serializador = new SerializadorFornecedor(
      res.getHeader("Content-Type"),
      ["email", "dataCriacao", "dataAtualizacao", "versao",'empresa']
    );
    return res.status(200).send(serializador.serializar(fornecedor));
  } catch (error) {
    return next(error);
  }
});
roteador.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dadosReq = req.body;
    const dados = Object.assign({}, dadosReq, { id: id });
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    const serializador = new SerializadorFornecedor(
      res.getHeader("Content-Type")
    );
    return res.status(200).send(serializador.serializar(fornecedor));
  } catch (error) {
    return next(error);
  }
});
roteador.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    await fornecedor.remover();
    return res
      .status(200)
      .json({ message: `Fornecedor de id ${id} removido com sucesso!` });
  } catch (error) {
    return next(error);
  }
});

const roteadorProdutos = require("./produtos");
const verificarFornecedor = async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    req.fornecedor = fornecedor;
    next();
  } catch (error) {
    next(error);
  }
};
roteador.use("/:idFornecedor/produtos", verificarFornecedor, roteadorProdutos);

module.exports = roteador;
