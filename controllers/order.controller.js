const Models = require("../models/index.model");
const factory = require("./factoryHandler/FactoryMethods")
 
// @desc Get all Orders
// @route GET /api/v1/orders
// @access public
exports.getOrders = factory.ReadAll(Models.Order);

// @desc Get One Order by ID
// @route GET /api/v1/orders/:id
// @access public
exports.getOrderById = factory.ReadOne(Models.Order)

// @desc Create a new Order
// @route POST /api/v1/order
// @access private/admin
exports.createOrder = factory.createOne(Models.Order)

// @desc Update a Order
// @route PUT /api/v1/Order/:id
// @access private/admin
exports.updateOrder = factory.updateOne(Models.Order);

// @desc Delete a Order
// @route DELETE /api/v1/order/:id
// @access private/admin
exports.deleteOrder = factory.deteleOne(Models.Order)
