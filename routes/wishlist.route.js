const express = require("express");
const WishlistController = require("../controllers/wishlist.controller");

const routes = express.Router();

routes.get('/:UserId', WishlistController.getProductsFromWishlist )
routes.post('/', WishlistController.addToWishlist);
routes.delete('/:id', WishlistController.deleteFromWishlist )


module.exports = routes