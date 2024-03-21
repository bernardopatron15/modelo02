const conexao = require('../config/conexao') 

let ProdutoSchema = new conexao.Schema({
    titulo: String,
    descricao: String,
    preco: Number,
    categoria: String,
    foto: String,
    usuario: { type: conexao.Schema.Types.ObjectId, ref: 'Usuario' },
})

module.exports = conexao.model("Produto", ProdutoSchema)