const express = require("express");
const CartController = require("../controllers/cart.controller");
const { permessions } = require("../middlewares/permessions.middleware");


const routes = express.Router();

routes.get('/:UserId', permessions("user") ,CartController.getCartItems)
routes.post('/', permessions("user"), CartController.addToCart);
routes.post('/applyCoupon', permessions("user") , CartController.applyCoupon);
routes.put('/:id',permessions("user") , CartController.udpateInCart)
routes.delete('/:id', permessions("user"), CartController.deleteProductFromCart)


module.exports = routes