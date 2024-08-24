const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

exports.permessions = asyncHandler(async (req, res, next) => {
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
        'You are not login, Please login to get access this route',
        401
      )
    );
  }
  // 2) - decode the token and verify that it's not expired
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return next(
      new ApiError(
        "Session expired, please login again",
        401
      )
    );
  }

  // 3) - get the user from the token
  // 4) - check if the user has the required permissions
});
