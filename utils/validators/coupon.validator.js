const { check, query } = require("express-validator");
const {
  validatorMiddleware,
} = require("../../middlewares/validator.middleware");
const Models = require("../../models/index.model");

exports.createCouponValidator = [
  check("name").custom(async (name) => {
    // Check if the name already exists in the database
    const couponyExists = await Models.Coupon.findOne({ where: { name } });
    if (couponyExists) {
      throw new Error("Coupon name already exists");
    }
    return true; // Proceed if no errors
  }),
  check("expiredAt")
    .notEmpty()
    .withMessage("Coupon expiration cannot be empty")
    .isDate()
    .withMessage("Coupon expiration must be a date value"),
  check("discount")
    .notEmpty()
    .withMessage("Coupon discount cannot be empty")
    .isInt()
    .withMessage("Coupon discount must be an integer"),

  validatorMiddleware,
];

exports.updateCouponValidator = [
  check("name")
    .optional()
    .custom(async (name) => {
      if (name) {
        // Check if the name already exists in the database
        const couponyExists = await Models.Coupon.findOne({ where: { name } });
        if (couponyExists) {
          throw new Error("Coupon name already exists");
        }
      }

      return true; // Proceed if no errors
    }),
  check("expiredAt")
    .optional()
    .notEmpty()
    .withMessage("Coupon expiration cannot be empty")
    .isDate()
    .withMessage("Coupon expiration must be a date value"),
  check("discount")
    .optional()
    .notEmpty()
    .withMessage("Coupon discount cannot be empty")
    .isInt()
    .withMessage("Coupon discount must be an integer"),

  validatorMiddleware,
];

exports.updateCouponValidator = [validatorMiddleware];
