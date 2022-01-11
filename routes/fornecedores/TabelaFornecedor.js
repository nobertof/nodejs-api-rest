const ModeloTabela = require('./ModeloTabelaFornecedor')
module.exports = {
    listar(){
        return ModeloTabela.findAll()
    }
}