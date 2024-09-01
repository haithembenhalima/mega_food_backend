const Models = require("../models/index.model");
const factory = require("./factoryHandler/FactoryMethods")
 
// @desc Get all Coupons
// @route GET /api/v1/coupons
// @access private/admin
exports.getCoupons = factory.ReadAll(Models.Coupon);

// @desc Get One Coupon by ID
// @route GET /api/v1/coupons/:id
// @access private/admin
exports.getCouponById = factory.ReadOne(Models.Coupon)

// @desc Create a new Coupon
// @route POST /api/v1/coupon
// @access private/admin
exports.createCoupon = factory.createOne(Models.Coupon)

// @desc Update a Coupon
// @route PUT /api/v1/Coupon/:id
// @access private/admin
exports.updateCoupon = factory.updateOne(Models.Coupon);

// @desc Delete a Coupon
// @route DELETE /api/v1/Coupon/:id
// @access private/admin
exports.deleteCoupon = factory.deteleOne(Models.Coupon)
