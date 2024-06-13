const conexao = require('../config/conexao');
const Schema = conexao.Schema;

let ProdutoSchema = new Schema({
    titulo: String,
    descricao: String,
    preco: Number,
    precoantigo: Number,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' }, // Referência à Categoria
    foto: String
});

module.exports = conexao.model("Produto", ProdutoSchema);
