const { check, query} = require("express-validator");
const {validatorMiddleware} = require("../../middlewares/validator.middleware");

exports.getProductValidator = [
    query("page").notEmpty().isNumeric().withMessage("pagination value must be a number"),
    query("sort").optional().notEmpty().withMessage("sort value must be a ASC or DESC"),
    query("search").optional().notEmpty().withMessage("search query is empty"),
    // validator middleware
    validatorMiddleware
  ];

exports.createProductValidator = [
    check("name").notEmpty().withMessage("Product name is empty"),
    check("images").notEmpty().isObject().withMessage("Product images is required"),
    check("price").notEmpty().isNumeric().withMessage("Product price must be a number and not empty"),
    check("description").notEmpty().withMessage("Product description is empty"),
    check("CategoryId").notEmpty().isNumeric().withMessage("Category ID is empty"),
    check("quantity").notEmpty().isNumeric().withMessage("Product quantity must be a number"),
    check("solde").notEmpty().isNumeric().optional().withMessage("Product solde must be a number"),
    check("ratingAverage").notEmpty().isFloat().optional().withMessage("Product ratingAverage must be a number"),
    check("commandNumber").optional().notEmpty().isNumeric().optional().withMessage("Product commandNumber must be a number"),
    // validator middleware
    validatorMiddleware
];

exports.updateProductValidator = [
    check("name").optional().notEmpty().withMessage("Product name is empty"),
    check("price").optional().notEmpty().isNumeric().withMessage("Product price must be a number and not empty"),
    check("description").optional().notEmpty().withMessage("Product description is empty"),
    check("CategoryId").optional().notEmpty().isNumeric().withMessage("Category ID is empty"),
    check("quantity").optional().notEmpty().isNumeric().withMessage("Product quantity must be a number"),
    check("solde").optional().notEmpty().isNumeric().withMessage("Product solde must be a number"),
    check("ratingAverage").optional().notEmpty().isFloat().withMessage("Product ratingAverage must be a number"),
    check("commandNumber").optional().notEmpty().isNumeric().optional().withMessage("Product commandNumber must be a number"),
    // validator middleware
    validatorMiddleware
];