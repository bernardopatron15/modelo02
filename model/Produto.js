const conexao = require('../config/conexao') 

let ProdutoSchema = new conexao.Schema({
    titulo: String,
    descricao: String,
    preco: Number,
    categoria: String,
    foto: String
})

module.exports = conexao.model("Produto", ProdutoSchema)