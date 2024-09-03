const Categories = require('./category.model')
const Product = require('./product.model')
const User = require('./user.model')
const Review = require('./review.model')
const Wishlist = require('./wishlist.model')
const Coupon = require('./coupon.model')
const Cart = require('./cart.model')
const CartItem = require('./cartItem.model')
const Order = require('./order.model')
// relashion between tables

Categories.hasMany(Product);
Product.belongsTo(Categories);

User.hasMany(Review);
Product.hasMany(Review);
Review.belongsTo(Product);
Review.belongsTo(User);

User.hasMany(Wishlist);
Product.hasMany(Wishlist);
Wishlist.belongsTo(User);
Wishlist.belongsTo(Product);

Cart.belongsTo(User);
CartItem.belongsTo(Cart, {onDelete: "CASCADE"});
CartItem.belongsTo(Product);

Order.belongsTo(User);
Order.belongsTo(Cart);
User.hasMany(Order);
Cart.hasMany(Order);



// syncing tables
Categories.sync({alter: true})
Product.sync({alter: true});
User.sync({alter: true});
Review.sync({alter: true});
Wishlist.sync({alter: true});
Coupon.sync({alter: true});
Cart.sync({alter: true});
CartItem.sync({alter: true});
Order.sync({alter: true});

// export modules
module.exports = {
    Categories,
    Product,
    User,
    Review,
    Wishlist,
    Coupon,
    Cart,
    CartItem,
    Order
    
}