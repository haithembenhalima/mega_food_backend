const express = require("express");
const CouponController = require("../controllers/coupon.controller");
const {createCouponValidator, updateCouponValidator} = require("../utils/validators/coupon.validator")
const usingRedisCaching = require("../middlewares/cache.middleware");
const Models = require("../models/index.model");

const routes = express.Router();

routes.get('/', usingRedisCaching(Models.Coupon), CouponController.getCoupons)
routes.get('/:id', CouponController.getCouponById)
routes.post('/', createCouponValidator, CouponController.createCoupon);
routes.put('/:id', updateCouponValidator, CouponController.updateCoupon)
routes.delete('/:id', CouponController.deleteCoupon )


module.exports = routes