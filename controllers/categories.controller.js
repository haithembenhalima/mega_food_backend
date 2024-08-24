const Models = require("../models/index.model");
const factory = require("./factoryHandler/FactoryMethods")
 
// @desc Get all categories
// @route GET /api/v1/categories
// @access public
exports.getCategories = factory.ReadAll(Models.Categories);

// @desc Get One category by ID
// @route GET /api/v1/categories/:id
// @access public
exports.getCategoriesById = factory.ReadOne(Models.Categories)

// @desc Create a new category
// @route POST /api/v1/categories
// @access private/admin
exports.createCategory = factory.createOne(Models.Categories)

// @desc Update a category
// @route PUT /api/v1/categories/:id
// @access private/admin
exports.updateCategory = factory.updateOne(Models.Categories);

// @desc Delete a category
// @route DELETE /api/v1/categories/:id
// @access private/admin
exports.deleteCategory = factory.deteleOne(Models.Categories)
