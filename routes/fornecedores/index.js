const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
roteador.use('/',async (req,res,next)=>{
    const resultados = await TabelaFornecedor.listar()
    res.send(JSON.stringify(resultados))
})

module.exports = roteador