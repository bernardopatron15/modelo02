const express = require("express");
const routes = express.Router();
const controller = require("../controller/usuarioController");
const multer = require("multer");
const upload = multer({ dest: "public/fotos" });

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
