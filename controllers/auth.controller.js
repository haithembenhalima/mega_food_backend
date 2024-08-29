const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Models = require("../models/index.model");
const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");
const { where } = require("sequelize");
const { generateToken } = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const { forgotPasswordMessage } = require("../utils/emailMessages");
const { log } = require("console");

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
  const token = generateToken(userData.email);

  // 3) - create a new user
  const newUser = await Models.User.create(userData);
  const userWithToken = { data: userData, token: token };

  res
    .status(201)
    .json(
      new ApiSuccess("success", "User created with success", userWithToken)
    );
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
  if (!user || !(await bcrypt.compare(userData.password, user.password))) {
    return next(new ApiError("Email or password not found", 404));
  }

  // 2) - generate token
  const token = generateToken(userData.email);
  // 3) - send the response
  const userWithToken = { name: user.name, email: user.email, token: token };
  res
    .status(200)
    .json(new ApiSuccess("success", "Login with success", userWithToken));
});

/*
    @desc Forgot password
    @route POST /api/v1/auth/forgotPassword
    @access private/user
*/
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  // 1) - verify if the email is already existing
  const user = await Models.User.findOne({ where: { email: userData.email } });
  if (!user) {
    return next(new ApiError("Email not found", 404));
  }

  // 2) - Generate a forgot reset code (6 digits) and save it in the user's record
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  // 3) - Send the forgit reset code to gmail account
  const message = forgotPasswordMessage(resetCode, user.name);
  console.log(resetCode);
  
  /* try {
    sendEmail({
      email: userData.email,
      subject: "إعادة تعيين كلمة سر جديدة",
      message: message,
    });
  } catch (error) {
    return next(new ApiError("Email message sending failed", 400))
  }  */

  // 4) - Save the reset code + expiration time in the user's record
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const thirtyMinutesInSeconds = 30 * 60;
  const expirationDate = nowInSeconds + thirtyMinutesInSeconds;  


  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');  

  const SaveResetCode = await Models.User.update(
    {
      passwordResetCode: hashedResetCode,
      passwordResetExpiresAt: expirationDate,
    },
    {
      where: { email: userData.email },
    }
  );

  res.status(200).json(new ApiSuccess(200, "Reset password code sended successfully"))
});

exports.verifyResetCode = asyncHandler(async (req, res, next) =>{

  // 1) - get the reset code
  const resetCode = req.body.resetCode;
  
  // 2) - check if there is a user with the reset code

  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');  
  const user = await Models.User.findOne({
    where: { passwordResetCode: hashedResetCode },
  });

  if (!user) {
    return next(new ApiError("Invalid reset code", 404));
  }  

  // 3) - check if the reset code is expired
  const nowInSeconds = Math.floor(Date.now() / 1000);
  if (nowInSeconds > user.passwordResetExpiresAt) {
    return next(new ApiError("Reset code expired, please try again", 401));
  }

  res.status(200).json(new ApiSuccess(200, "Reset code verified successfully"));
});