const express = require("express");
const OrderController = require("../controllers/order.controller");

const routes = express.Router();

routes.get('/', OrderController.getOrders )
routes.get('/:id', OrderController.getOrderById )
routes.post('/', OrderController.createOrder);
routes.put('/:id', OrderController.updateOrder )
routes.delete('/:id', OrderController.deleteOrder)


module.exports = routes