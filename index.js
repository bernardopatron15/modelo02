const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');

// Configuração da sessão
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
}));

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para analisar o corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Configuração do mecanismo de visualização
app.set("view engine", "ejs");

// Definição do diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Importação das rotas
const usuarioroutes = require("./routes/UsuarioRoutes");
const produtoroutes = require("./routes/ProdutoRoutes");
const pedidoRoutes = require("./routes/PedidoRoutes");
const categoriaRoutes = require("./routes/CategoriaRoutes");

// Uso das rotas
app.use(usuarioroutes);
app.use(produtoroutes);
app.use(pedidoRoutes);
app.use(categoriaRoutes);

// Inicialização do servidor
app.listen(port, function () {
  console.log(`Servidor funcionando na porta ${port}!`);
});
