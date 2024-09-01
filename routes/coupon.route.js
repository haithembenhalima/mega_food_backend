const express = require("express");
const CouponController = require("../controllers/coupon.controller");
const {createCouponValidator, updateCouponValidator} = require("../utils/validators/coupon.validator")

const routes = express.Router();

routes.get('/', CouponController.getCoupons)
routes.get('/:id', CouponController.getCouponById)
routes.post('/', createCouponValidator, CouponController.createCoupon);
routes.put('/:id', updateCouponValidator, CouponController.updateCoupon)
routes.delete('/:id', CouponController.deleteCoupon )


module.exports = routes