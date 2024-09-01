const express = require("express");
const path = require("path");
require('dotenv').config();
const CategoriesRoute = require("./routes/categories.route");
const ProductRoute = require("./routes/product.route");
const UserRoute = require("./routes/user.route");
const AuthRoute = require("./routes/auth.route");
const ReviewRoute = require("./routes/review.route");
const WishlistRoute = require("./routes/wishlist.route");
const CouponsRoute = require("./routes/coupon.route");
const ApiError = require("./utils/ApiError");
const {globalErrorHandler} = require("./middlewares/error.middleware");
const { cp } = require("fs");
// create app form express
const app = express();

// express middlewares
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());


// API Routes
app.use("/api/v1/categories", CategoriesRoute);
app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/reviews", ReviewRoute);
app.use("/api/v1/wishlist", WishlistRoute);
app.use("/api/v1/coupons", CouponsRoute);


app.all('*',(req,res,next)=>{
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global Error handling middleware
app.use(globalErrorHandler)

// server listening
app.listen(process.env.SERVER_PORT,()=>{
  console.log("server is running on port: ", process.env.SERVER_PORT);
});
