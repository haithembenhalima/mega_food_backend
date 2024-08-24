const { check, query} = require("express-validator");
const {validatorMiddleware} = require("../../middlewares/validator.middleware");

exports.getUserValidator = [
    query("page").notEmpty().isNumeric().withMessage("pagination value must be a number"),
    query("sort").optional().notEmpty().withMessage("sort value must be a ASC or DESC"),
    query("search").optional().notEmpty().withMessage("search query is empty"),
    // validator middleware
    validatorMiddleware
  ];

exports.createUserValidator = [
    check("name").notEmpty().isString().withMessage("name must be not empty"),
    check("email").notEmpty().isEmail().withMessage("email must be not empty and valid "),
    check("phone").notEmpty().isMobilePhone(["ar-DZ"]).withMessage("Enter correct phone number"),
    check("password").notEmpty().isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    check("adress").notEmpty().withMessage("Adress is empty"),
     // validator middleware
    validatorMiddleware
];

exports.updateUserValidator = [
    check("name").optional().notEmpty().isString().withMessage("name must be not empty"),
    check("email").optional().notEmpty().isEmail().withMessage("email must be not empty and valid "),
    check("phone").optional().notEmpty().isMobilePhone(["ar-DZ"]).withMessage("Enter correct phone number"),
    check("password").optional().notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    check("adress").optional().notEmpty().withMessage("Adress is empty"),
    // validator middleware
    validatorMiddleware
];