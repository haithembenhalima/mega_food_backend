const { check, query} = require("express-validator");
const {validatorMiddleware} = require("../../middlewares/validator.middleware");


exports.signupValidator = [
    check("name").notEmpty().isString().withMessage("name must be not empty"),
    check("email").notEmpty().isEmail().withMessage("email must be not empty and valid "),
    check("phone").notEmpty().isMobilePhone(["ar-DZ"]).withMessage("Enter correct phone number"),
    check("password").notEmpty().isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    check("adress").notEmpty().withMessage("Adress is empty"),
     // validator middleware
    validatorMiddleware
];

