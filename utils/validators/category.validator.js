const { check, query } = require("express-validator");
const {validatorMiddleware} = require("../../middlewares/validator.middleware");
const Models = require('../../models/index.model');

exports.createCategoryValidator = [
  check('name')
    .custom(async (name) => {
      // Check if the name already exists in the database
      const categoryExists = await Models.Categories.findOne({ where: { name } });
      if (categoryExists) {
        throw new Error('Category name already exists');
      }
      return true; // Proceed if no errors
    }),
  // validator middleware
  validatorMiddleware
];

exports.updateCategoryValidator = [
  check('name')
  .notEmpty().withMessage('Category name is empty')
  .custom(async (name) => {
    if(name){
      // Check if the name already exists in the database
      const productExists = await Models.Product.findOne({ where: { name } });
      if (productExists) {
        throw new Error('Product name already exists');
      }
      }
    return true; // Proceed if no errors
  }),
  // validator middleware
  validatorMiddleware
];
