const express = require("express");
const CartController = require("../controllers/cart.controller");

const routes = express.Router();

routes.get('/:UserId',CartController.getCartItems)
routes.post('/',CartController.addToCart);
routes.post('/applyCoupon',CartController.applyCoupon);
routes.put('/:id',CartController.udpateInCart)
routes.delete('/:id',CartController.deleteProductFromCart)


module.exports = routes