const express = require("express");
const consign = require("consign");
const roteador = require("../routes/fornecedores");
const NaoEncontrado = require("../erros/NaoEncontrado");
const CampoInvalido = require("../erros/CampoInvalido");
const DadosNaoFornecidos = require("../erros/DadosNaoFornecidos");
const ValorNaoSuportado = require("../erros/ValorNaoSuportado");
const formatosAceitos = require("../Serializador").formatosAceitos;
const SerializadorErro = require("../Serializador").SerializadorErro
module.exports = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((req, res, next) => {
    let formatoRequisitado = req.header("Accept");

    if (formatoRequisitado === "*/*") {
      formatoRequisitado = "application/json";
    }

    if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
      res.status(406);
      res.end();
    }

    res.setHeader("Content-Type", formatoRequisitado);
    next();
  });
  app.use("/api/fornecedores", roteador);

  app.use((error, req, res, next) => {
    let status = 500;
    if (error instanceof NaoEncontrado) {
      status = 404;
    }
    if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) {
      status = 400;
    }
    if (error instanceof ValorNaoSuportado) {
      status = 406;
    }
    const serializador = new SerializadorErro(res.getHeader('Content-Type'))
    return res.status(status).send(serializador.serializar({ error: error.message, id: error.idErro }));
  });

  return app;
};
