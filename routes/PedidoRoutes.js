const express = require('express');
const routes = express.Router();
const pedidoController = require('../controller/pedidoController');

// Rotas para pedidos
routes.post('/pedido/add', pedidoController.add);
routes.get('/pedido/lst', pedidoController.listar);
routes.post('/pedido/lst', pedidoController.filtrar);
routes.get('/pedido/del/:id', pedidoController.del);

module.exports = routes;
