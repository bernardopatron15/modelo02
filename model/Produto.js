const conexao = require('../config/conexao') 

let ProdutoSchema = new conexao.Schema({
    titulo: String,
    genero: String,
    diretor: String,
    ano: Number,
    tempo: { type: Date },
    foto: String
})

module.exports = conexao.model("Produto", ProdutoSchema)