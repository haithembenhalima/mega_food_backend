const express = require("express");
const CouponController = require("../controllers/coupon.controller");
const {createCouponValidator, updateCouponValidator} = require("../utils/validators/coupon.validator")
const usingRedisCaching = require("../middlewares/cache.middleware");
const Models = require("../models/index.model");
const { permessions } = require("../middlewares/permessions.middleware");


const routes = express.Router();

routes.get('/', permessions("admin") , usingRedisCaching(Models.Coupon), CouponController.getCoupons)
routes.get('/:id', permessions("admin"),  CouponController.getCouponById)
routes.post('/', permessions("admin"),  createCouponValidator, CouponController.createCoupon);
routes.put('/:id', permessions("admin"),  updateCouponValidator, CouponController.updateCoupon)
routes.delete('/:id', permessions("admin"),  CouponController.deleteCoupon )


module.exports = routes