const Models = require("../models/index.model");
const factory = require("./factoryHandler/FactoryMethods")
 

// @desc Get One Review by ID
// @route GET /api/v1/Reviews/:id
// @access public
exports.getReviewById = factory.ReadOne(Models.Review)

// @desc Create a new Review
// @route POST /api/v1/Review
// @access private/user
exports.createReview = factory.createOne(Models.Review)

// @desc Update a Review
// @route PUT /api/v1/Review/:id
// @access private/user
exports.updateReview = factory.updateOne(Models.Review);

// @desc Delete a Review
// @route DELETE /api/v1/Review/:id
// @access private/user
exports.deleteReview = factory.deteleOne(Models.Review)
