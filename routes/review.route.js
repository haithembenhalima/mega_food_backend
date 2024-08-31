const express = require("express");
const ReviewController = require("../controllers/review.controller");
const {createReviewValidator,updateReviewValidator} = require("../utils/validators/review.validator")

const routes = express.Router();

routes.get('/:productId', ReviewController.getReviewsByProductId)
routes.post('/',createReviewValidator, ReviewController.createReview);
routes.put('/:id',updateReviewValidator, ReviewController.updateReview)
routes.delete('/:id', ReviewController.deleteReview)


module.exports = routes