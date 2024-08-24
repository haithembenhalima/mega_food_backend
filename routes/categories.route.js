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
const {permessions} = require('../middlewares/permessions.middleware')



// create router from express router
const routes = express.Router();

// define routes for categories
routes.get("/",permessions("user"), CategotiesController.getCategories);
routes.get("/:id", CategotiesController.getCategoriesById);
routes.post(
  "/",
  uploadSingleImage("image"),
  processingImage("categories"),
  createCategoryValidator,
  CategotiesController.createCategory
);
routes.put(
  "/:id",
  updateCategoryValidator,
  CategotiesController.updateCategory
);
routes.delete("/:id", CategotiesController.deleteCategory);

// export the routes
module.exports = routes;
