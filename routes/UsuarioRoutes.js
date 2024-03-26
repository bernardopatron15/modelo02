const express = require("express");
const routes = express.Router();
const controller = require("../controller/usuarioController");
const multer = require("multer");
const upload = multer({ dest: "public/fotos" });
const Usuario = require("../model/Usuario");

routes.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, senha });

    if (usuario) {
      res.redirect("/produto/add"); 
    } else {
      res.status(401).send("Email ou senha incorretos");
    }
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    res.status(500).send("Ocorreu um erro ao tentar fazer login");
  }
});


routes.get("/usuario/add", controller.abreadd);
routes.post("/usuario/add", upload.single("foto"), controller.add);

routes.get("/usuario/lst", controller.listar);
routes.post("/usuario/lst", controller.filtrar);

routes.get("/usuario/edt/:id", controller.abreedt);
routes.post("/usuario/edt/:id", upload.single("foto"), controller.edt);

routes.get("/usuario/del/:id", controller.del);

routes.get("/", controller.abrelogin);

routes.get("/home", controller.abrehome);

routes.get("/categoria", controller.abrecategoria);

routes.get("/checkout", controller.abrecheckout);

routes.get("/produto", controller.abreproduto);

module.exports = routes;
