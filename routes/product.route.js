const express = require("express");
const ProductController = require("../controllers/product.controller");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
} = require("../utils/validators/product.validator");
const {
  uploadMultipleImages,
} = require("../middlewares/uploadingImages.middleware");
const processingImage = require("../middlewares/imageProcessing.middleware");
const usingRedisCaching = require("../middlewares/cache.middleware");
const Models = require("../models/index.model");
const { Model } = require("sequelize");
const { permessions } = require("../middlewares/permessions.middleware");

// create route form express router
const routes = express.Router();

// define routes for products
routes.get(
  "/",
  usingRedisCaching(Models.Product),
  getProductValidator,
  ProductController.getProducts
);

routes.get("/:id", ProductController.getProductById);

routes.post(
  "/",
  permessions("admin"),
  uploadMultipleImages([{ name: "images", maxCount: 5 }]),
  processingImage("products"),
  createProductValidator,
  ProductController.createProduct
);

routes.put(
  "/:id",
  permessions("admin"),
  uploadMultipleImages([{ name: "images", maxCount: 5 }]),
  processingImage("products"),
  updateProductValidator,
  ProductController.updateProduct
);

routes.delete("/:id", permessions("admin"), ProductController.deleteProduct);

// export the routes
module.exports = routes;
