const Categories = require('./category.model')
const Product = require('./product.model')
const User = require('./user.model')
const Review = require('./review.model')
// relashion between tables

Categories.hasMany(Product);
Product.belongsTo(Categories);
User.hasMany(Review);
Product.hasMany(Review);
Review.belongsTo(Product);
Review.belongsTo(User);


// syncing tables
Categories.sync({alter: true})
Product.sync({alter: true});
User.sync({alter: true});
Review.sync({alter: true});

// export modules
module.exports = {
    Categories,
    Product,
    User,
    Review
}