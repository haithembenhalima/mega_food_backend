const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Models = require("../models/index.model");
const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");
const { where } = require("sequelize");
const {generateToken} = require('../utils/generateToken')

/*
    @desc Signup into the system
    @route POST /api/v1/auth/signup
    @access Public
*/
exports.signup = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  // 1) - check if the user is already signed or not
  const isAlreadySigned = await Models.User.findOne({
    where: { email: userData.email },
  });
  if (isAlreadySigned) {
    return next(new ApiError("This email is already signed", 409));
  }

  // 2) - generate JWT token
  const token = generateToken(userData.email)

  // 3) - create a new user
  const newUser = await Models.User.create(userData);
  const userWithToken = { data: userData, token: token };

   res.status(201).json(new ApiSuccess("success", "User created with success", userWithToken));
});

/*
    @desc Logging in the application
    @route POST /api/v1/auth/login
    @access Public
*/
exports.login = asyncHandler(async (req, res, next) => {

  // 1) - check if the user signed in and the password is correct
  const userData = req.body;
  const user = await Models.User.findOne({ where: { email: userData.email } });
  if(!user || !(await bcrypt.compare(userData.password,user.password))) {
    return next(new ApiError("Email or password not found", 404));
  }

  // 2) - generate token
  const token = generateToken(userData.email)
  // 3) - send the response
  const userWithToken = {name: user.name,email: user.email , token: token}
  res.status(200).json(new ApiSuccess("success", "Login with success", userWithToken))

});