const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const usuarioroutes = require("./routes/UsuarioRoutes");
const produtoroutes = require("./routes/ProdutoRoutes");
const postRoutes = require("./routes/PostRoutes");
const categoriaRoutes = require("./routes/CategoriaRoutes");

app.use(produtoroutes);
app.use(usuarioroutes);
app.use(postRoutes);
app.use(categoriaRoutes);

app.listen(port, function () {
  console.log("Servidor funcionando!");
});
