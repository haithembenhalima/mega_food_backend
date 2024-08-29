const express = require("express");
const ReviewController = require("../controllers/review.controller");


const routes = express.Router();

routes.post('/',ReviewController.createReview);
routes.put('/:id', ReviewController.updateReview)
routes.delete('/:id', ReviewController.deleteReview)

module.exports = routes