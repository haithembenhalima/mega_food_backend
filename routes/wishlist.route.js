const express = require("express");
const WishlistController = require("../controllers/wishlist.controller");
const { permessions } = require("../middlewares/permessions.middleware");



const routes = express.Router();

routes.get('/:UserId', permessions("user"), WishlistController.getProductsFromWishlist )
routes.post('/', permessions("user"), WishlistController.addToWishlist);
routes.delete('/:id', permessions("user"), WishlistController.deleteFromWishlist )


module.exports = routes