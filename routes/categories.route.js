const express = require("express");
const CategotiesController = require("../controllers/categories.controller");
const {
  uploadSingleImage,
} = require("../middlewares/uploadingImages.middleware");
const processingImage = require("../middlewares/imageProcessing.middleware");
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validators/category.validator");
const { permessions } = require("../middlewares/permessions.middleware");
const Models = require("../models/index.model");
const usingRedisCaching = require("../middlewares/cache.middleware");

// create router from express routers
const routes = express.Router();

// define routes for categories
routes.get(
  "/",
  usingRedisCaching(Models.Categories),
  CategotiesController.getCategories
);
routes.get("/:id", CategotiesController.getCategoriesById);
routes.post(
  "/",
  permessions("admin"),
  uploadSingleImage("image"),
  processingImage("categories"),
  createCategoryValidator,
  CategotiesController.createCategory
);
routes.put(
  "/:id",
  permessions("admin"),
  updateCategoryValidator,
  CategotiesController.updateCategory
);
routes.delete(
  "/:id",
  permessions("admin"),
  CategotiesController.deleteCategory
);

// export the routes
module.exports = routes;
