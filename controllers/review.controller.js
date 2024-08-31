const Models = require("../models/index.model");
const factory = require("./factoryHandler/FactoryMethods")
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");


// @desc Create a new Review
// @route POST /api/v1/review
// @access private/user
exports.createReview = factory.createOne(Models.Review)

// @desc Update a Review
// @route PUT /api/v1/review/:id
// @access private/user
exports.updateReview = factory.updateOne(Models.Review);

// @desc Delete a Review
// @route DELETE /api/v1/review/:id
// @access private/user
exports.deleteReview = factory.deteleOne(Models.Review)

// @desc get all reviews by the productId with the name of the user 
// @route GET /api/v1/review/:productId (it accepts pagination query ?page)
// @access public
exports.getReviewsByProductId = asyncHandler(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 15;
    const offset = limit * (page - 1);

    const ProductId = req.params.productId;
    const reviews = await Models.Review.findAll({
        where: { ProductId },
        include: {
          model: Models.User,
          attributes: ['name']  
        },
        limit: limit,
        offset: offset
    });

    if(!reviews){
        return next(new ApiError("Reviews not found", 404));
    }

    res.status(200).json(new ApiSuccess("Success", "Reviews fetched successfully", reviews));
});
