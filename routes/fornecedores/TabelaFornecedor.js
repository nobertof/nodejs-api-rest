const ModeloTabela = require("./ModeloTabelaFornecedor");
const NaoEncontrado = require('../../erros/NaoEncontrado')
module.exports = {
  listar() {
    return ModeloTabela.findAll({raw:true});
  },
  inserir(fornecedor) {
    return ModeloTabela.create(fornecedor);
  },
  async buscaPorId(id) {
    const encontrado = await ModeloTabela.findOne({ where: { id:id } });
    if (!encontrado) {
      throw new NaoEncontrado('Fornecedor');
    }
    return encontrado;
  },
  async atualizar(id, dadosParaAtualizar) {
    return ModeloTabela.update(dadosParaAtualizar, { where: { id: id } });
  },
  async remover(id){
      return ModeloTabela.destroy({where:{id:id}})
  }
};
