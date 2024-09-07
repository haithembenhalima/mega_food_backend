const express = require("express");
const OrderController = require("../controllers/order.controller");
const usingRedisCaching = require("../middlewares/cache.middleware");
const Models = require("../models/index.model");
const { permessions } = require("../middlewares/permessions.middleware");


const routes = express.Router();

routes.get('/', permessions("admin"), usingRedisCaching(Models.Order), OrderController.getOrders )
routes.get('/:id', permessions("admin"),  OrderController.getOrderById )
routes.post('/', permessions("admin"), OrderController.createOrder);
routes.put('/:id', permessions("admin"),   OrderController.updateOrder )
routes.delete('/:id', permessions("admin"), OrderController.deleteOrder)


module.exports = routes