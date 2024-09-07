const express = require("express");
const OrderController = require("../controllers/order.controller");
const usingRedisCaching = require("../middlewares/cache.middleware");
const Models = require("../models/index.model");


const routes = express.Router();

routes.get('/', usingRedisCaching(Models.Order), OrderController.getOrders )
routes.get('/:id', OrderController.getOrderById )
routes.post('/', OrderController.createOrder);
routes.put('/:id', OrderController.updateOrder )
routes.delete('/:id', OrderController.deleteOrder)


module.exports = routes