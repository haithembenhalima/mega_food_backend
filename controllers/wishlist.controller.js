const asyncHandler = require("express-async-handler");
const Models = require("../models/index.model");
const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");
const factory = require("./factoryHandler/FactoryMethods")
 

// @desc add new product to the wishlist 
// @route POST /api/v1/wishlist
// @access private/user
exports.addToWishlist = factory.createOne(Models.Wishlist)


// @desc Delete an item from the wishlist
// @route DELETE /api/v1/wishlist/:id
// @access private/user
exports.deleteFromWishlist = factory.deteleOne(Models.Wishlist)


// @desc get all products into the wishlist of the user
// @route GET /api/v1/wishlist/:userId (it accepts pagination query ?page)
// @access private/user
exports.getProductsFromWishlist = asyncHandler(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 15;
    const offset = limit * (page - 1);

    const UserId = req.params.UserId;
    const products = await Models.Wishlist.findAll({
        where: { UserId },
        include: {
          model: Models.Product,
        },
        limit: limit,
        offset: offset
    });

    if(!products){
        return next(new ApiError("Products in wishlist are not found ", 404))
    }
    res.status(200).json(new ApiSuccess("Success", "Products in wishlist fetched successfully", products));
});