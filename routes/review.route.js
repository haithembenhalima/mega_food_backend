const express = require("express");
const ReviewController = require("../controllers/review.controller");
const {
  createReviewValidator,
  updateReviewValidator,
} = require("../utils/validators/review.validator");
const usingRedisCaching = require("../middlewares/cache.middleware");
const Models = require("../models/index.model");
const { permessions } = require("../middlewares/permessions.middleware");


const routes = express.Router();

routes.get(
  "/:productId",
  permessions("user"),
  usingRedisCaching(Models.Review),
  ReviewController.getReviewsByProductId
);
routes.post("/", permessions("user"), createReviewValidator, ReviewController.createReview);
routes.put("/:id", permessions("user"), updateReviewValidator, ReviewController.updateReview);
routes.delete("/:id", permessions("user"), ReviewController.deleteReview);

module.exports = routes;
