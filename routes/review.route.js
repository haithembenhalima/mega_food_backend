const express = require("express");
const ReviewController = require("../controllers/review.controller");
const {
  createReviewValidator,
  updateReviewValidator,
} = require("../utils/validators/review.validator");
const usingRedisCaching = require("../middlewares/cache.middleware");
const Models = require("../models/index.model");

const routes = express.Router();

routes.get(
  "/:productId",
  usingRedisCaching(Models.Review),
  ReviewController.getReviewsByProductId
);
routes.post("/", createReviewValidator, ReviewController.createReview);
routes.put("/:id", updateReviewValidator, ReviewController.updateReview);
routes.delete("/:id", ReviewController.deleteReview);

module.exports = routes;
