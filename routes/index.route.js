const CategoriesRoute = require("./categories.route");
const ProductRoute = require("./product.route");
const UserRoute = require("./user.route");
const AuthRoute = require("./auth.route");
const ReviewRoute = require("./review.route");
const WishlistRoute = require("./wishlist.route");
const CouponsRoute = require("./coupon.route");
const CartRoute = require("./cart.route");
const OrderRoute = require("./order.route");



const mountRoutes = (app) => {
  // API Routes
  app.use("/api/v1/categories", CategoriesRoute);
  app.use("/api/v1/products", ProductRoute);
  app.use("/api/v1/users", UserRoute);
  app.use("/api/v1/auth", AuthRoute);
  app.use("/api/v1/reviews", ReviewRoute);
  app.use("/api/v1/wishlist", WishlistRoute);
  app.use("/api/v1/coupons", CouponsRoute);
  app.use("/api/v1/cart", CartRoute);
  app.use("/api/v1/orders", OrderRoute);
};


module.exports = mountRoutes;