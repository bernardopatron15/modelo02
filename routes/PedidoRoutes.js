const express = require('express');
const routes = express.Router();
const controller = require('../controller/pedidoController')
const multer = require('multer')
const upload = multer({ dest: 'public/fotos' })
//criar rotas aqui

routes.get('/pedido/lst', controller.listar)
routes.post('/pedido/lst', controller.filtrar)

routes.get('/pedido/del/:id', controller.del)

module.exports = routes