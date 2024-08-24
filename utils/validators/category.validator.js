const { check, query } = require("express-validator");
const {validatorMiddleware} = require("../../middlewares/validator.middleware");

exports.createCategoryValidator = [
  check("name").notEmpty().withMessage("Category name is empty"),
  // validator middleware
  validatorMiddleware
];

exports.updateCategoryValidator = [
  check("name").notEmpty().withMessage("Category name is empty"),
  // validator middleware
  validatorMiddleware
];
