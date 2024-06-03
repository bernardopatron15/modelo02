const conexao = require('../config/conexao')

let PedidoSchema = new conexao.Schema({
    nome: String,
    cpf: String,
    email: String,
    endereço: String,
    cidade: String,
    cep: String,
    celular: String,
})

module.exports = conexao.model("Pedido", PedidoSchema)