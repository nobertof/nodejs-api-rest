const modelos = [
  require("../../routes/fornecedores/ModeloTabelaFornecedor"),
  require("../../routes/fornecedores/produtos/ModeloTabelaProduto")
]

async function criarTabelas(){
  for(let contador = 0; contador<modelos.length;contador++){
    const modelo = modelos[contador]
    await modelo.sync()
  }
}

criarTabelas()
