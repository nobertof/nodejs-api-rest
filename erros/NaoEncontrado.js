class NaoEncontrado extends Error{
    constructor(objeto){
        super(`${objeto} não foi encontrado!`)
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado