const Categories = require('./category.model')
const Product = require('./product.model')
const User = require('./user.model')

// relashion between tables

Categories.hasMany(Product);
Product.belongsTo(Categories);


// syncing tables
Categories.sync({alter: true})
Product.sync({alter: true});
User.sync({alter: true});

// export modules
module.exports = {
    Categories,
    Product,
    User
}