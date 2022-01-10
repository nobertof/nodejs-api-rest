const atendimentos = require("../models/atendimentos");
const Atendimento = require("../models/atendimentos");
module.exports = (app) => {
  app.get("/atendimentos", (req, res, next) => {
    Atendimento.lista()
      .then((resultados) => res.status(200).json(resultados))
      .catch((erro) => res.status(400).json(erro));
  });
  app.get("/atendimentos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    Atendimento.buscaPorId(id, res);
  });
  app.post("/atendimentos", (req, res, next) => {
    const atendimento = req.body;
    Atendimento.adiciona(atendimento)
      .then((resultados) => {
        res.status(201).json(resultados);
      })
      .catch((erros) => {
        res.status(400).json(erros);
      });
  });
  app.patch("/atendimentos/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const atendimento = req.body;

    Atendimento.altera(id, atendimento, res);
  });
  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Atendimento.deleta(id, res);
  });
};
