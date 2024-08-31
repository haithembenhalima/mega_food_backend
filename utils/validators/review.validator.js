const { check, query } = require("express-validator");
const {
  validatorMiddleware,
} = require("../../middlewares/validator.middleware");

exports.createReviewValidator = [
  check("title").notEmpty().withMessage("Review title is empty"),
  check("ratings")
    .notEmpty()
    .withMessage("Review ratings are empty")
    .isNumeric()
    .withMessage("Review ratings must be a numeric value")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  check("UserId")
    .notEmpty()
    .withMessage("User Id is empty")
    .isNumeric()
    .withMessage("User Id must be a numeric value"),
  check("ProductId")
    .notEmpty()
    .withMessage("Product Id is empty")
    .isNumeric()
    .withMessage("Product Id must be a numeric value"),

  validatorMiddleware,
];


exports.updateReviewValidator = [
    check("title").notEmpty().withMessage("Review title is empty"),
    check("ratings")
      .notEmpty()
      .withMessage("Review ratings are empty")
      .isNumeric()
      .withMessage("Review ratings must be a numeric value")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    check("UserId")
      .notEmpty()
      .withMessage("User Id is empty")
      .isNumeric()
      .withMessage("User Id must be a numeric value"),
    check("ProductId")
      .notEmpty()
      .withMessage("Product Id is empty")
      .isNumeric()
      .withMessage("Product Id must be a numeric value"),
  
    validatorMiddleware,
  ];