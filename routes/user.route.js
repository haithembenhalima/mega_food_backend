const express = require("express");
const UserController = require("../controllers/user.controller");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
} = require("../utils/validators/user.validator");
const {
  uploadSingleImage,
} = require("../middlewares/uploadingImages.middleware");
const processingImage = require("../middlewares/imageProcessing.middleware");
const usingRedisCaching = require("../middlewares/cache.middleware");
const Models = require("../models/index.model");
const { permessions } = require("../middlewares/permessions.middleware");



// create route form express router
const routes = express.Router();

// define routes for Users
routes.get(
  "/",
  permessions("admin"),
  usingRedisCaching(Models.User),
  getUserValidator,
  UserController.getUsers
);

routes.get("/:id", permessions("admin"), UserController.getUserById);

routes.post(
  "/",
  permessions("admin"),
  uploadSingleImage("image"),
  processingImage("users"),
  createUserValidator,
  UserController.createUser
);

routes.put(
  "/:id",
  permessions("admin"),
  uploadSingleImage("image"),
  processingImage("users"),
  updateUserValidator,
  UserController.updateUser
);

routes.delete("/:id", permessions("admin"), UserController.deleteUser);

// export the routes
module.exports = routes;
