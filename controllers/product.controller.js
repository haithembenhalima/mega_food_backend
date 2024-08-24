const Models = require("../models/index.model");
const factory = require("./factoryHandler/FactoryMethods")
 
// @desc Get all Products
// @route GET /api/v1/products
// @access public
exports.getProducts = factory.ReadAll(Models.Product);

// @desc Get One Product by ID
// @route GET /api/v1/products/:id
// @access public
exports.getProductById = factory.ReadOne(Models.Product)

// @desc Create a new Product
// @route POST /api/v1/product
// @access private/admin
exports.createProduct = factory.createOne(Models.Product)

// @desc Update a Product
// @route PUT /api/v1/product/:id
// @access private/admin
exports.updateProduct = factory.updateOne(Models.Product);

// @desc Delete a Product
// @route DELETE /api/v1/product/:id
// @access private/admin
exports.deleteProduct = factory.deteleOne(Models.Product)
