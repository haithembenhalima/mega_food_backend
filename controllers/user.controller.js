const Models = require("../models/index.model");
const factory = require("./factoryHandler/FactoryMethods")
 
// @desc Get all users
// @route GET /api/v1/users
// @access private/admin
exports.getUsers = factory.ReadAll(Models.User);

// @desc Get One User by ID
// @route GET /api/v1/users/:id
// @access private/admin
exports.getUserById = factory.ReadOne(Models.User)

// @desc Create a new User
// @route POST /api/v1/User
// @access private/admin
exports.createUser = factory.createOne(Models.User)

// @desc Update a User
// @route PUT /api/v1/User/:id
// @access private/admin
exports.updateUser = factory.updateOne(Models.User);

// @desc Delete a User
// @route DELETE /api/v1/User/:id
// @access private/admin
exports.deleteUser = factory.deteleOne(Models.User)
