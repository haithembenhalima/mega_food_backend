const express = require("express");
const UserController = require("../controllers/user.controller");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
} = require("../utils/validators/user.validator");
const {uploadSingleImage} = require("../middlewares/uploadingImages.middleware");
const processingImage = require("../middlewares/imageProcessing.middleware");

// create route form express router
const routes = express.Router();


// define routes for Users
routes.get("/",  getUserValidator, UserController.getUsers);
routes.get("/:id", UserController.getUserById);
routes.post(
  "/",
  uploadSingleImage("image"),
  processingImage("users"),
  createUserValidator,
  UserController.createUser
);
routes.put(
  "/:id",
  uploadSingleImage("image"),
  processingImage("users"),
  updateUserValidator,
  UserController.updateUser
);
routes.delete("/:id", UserController.deleteUser);

// export the routes
module.exports = routes;
