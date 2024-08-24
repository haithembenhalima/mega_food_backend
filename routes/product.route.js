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

// create route form express router
const routes = express.Router();


// define routes for products
routes.get("/", getProductValidator, ProductController.getProducts);
routes.get("/:id", ProductController.getProductById);
routes.post(
  "/",
  uploadMultipleImages([{ name: "images", maxCount: 5 }]),
  processingImage("products"),
  createProductValidator,
  ProductController.createProduct
);
routes.put(
  "/:id",
  uploadMultipleImages([{ name: "images", maxCount: 5 }]),
  processingImage("products"),
  updateProductValidator,
  ProductController.updateProduct
);
routes.delete("/:id", ProductController.deleteProduct);

// export the routes
module.exports = routes;
