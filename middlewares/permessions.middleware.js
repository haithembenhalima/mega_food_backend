const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const Models = require("../models/index.model");
const { where } = require("sequelize");

exports.permessions =(...roles) =>
     asyncHandler(async (req, res, next) => {
  // 1) - check if there is a token coming
  console.log(req.headers);

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not login, Please login to get access this route",
        401
      )
    );
  }
  // 2) - decode the token and verify that it's not expired

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    return next(new ApiError("Session expired, please login again", 401));
  }

  // 3) - get the user from the token
  const currentUser = await Models.User.findOne({where: {email: decoded.pyload}})
  if (!currentUser) {
    return next(
      new ApiError(
        'The user that belong to this token does no longer exist',
        401
      )
    );
  }

  // 4) - check if the user has the required permissions
  if (!roles.includes(currentUser.role)) {
    return next(
      new ApiError('You are not allowed to access this route', 403)
    );
  }

  // 5) - if all checks, pass
  next();
  
});
