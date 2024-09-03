const Models = require("../models/index.model");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");
const { where } = require("sequelize");

// @desc Get User Cart
// @route GET /api/v1/cart/:UserId
// @access private/user
exports.getCartItems = asyncHandler(async (req, res, next) => {
  const UserId = req.params.UserId;

  // 1) - find the user cart
  const Cart = await Models.Cart.findOne({ where: { UserId } });
  // 2) - find the user cart items
  if (Cart) {
    const CartItem = await Models.CartItem.findAll({
      where: { CartId: Cart.id },
      include: { model: Models.Product },
    });

    if (CartItem) {
      res.status(200).json(
        new ApiSuccess("success", "Cart items retrieved successfully", {
          Cart,
          CartItem,
        })
      );
    }
  } else {
    return next(new ApiError("User id not found", 404));
  }
});

// @desc add product to Cart
// @route POST /api/v1/cart
// @access private/user
exports.addToCart = asyncHandler(async (req, res, next) => {
  // 1) - get the request of the product and the userId
  const { ProductId, UserId, quantity } = req.body;

  // 2) - Create a cart for the user
  // check if the user is already have a cart created before
  let userCart = await Models.Cart.findOne({ where: { UserId } });
  if (!userCart) {
    const cart = await Models.Cart.create({ UserId });
    userCart = await Models.Cart.findOne({ where: { UserId } });
  }

  // 3) - add the product to the cart
  // check if the product already exists in the cart
  const cartItemExist = await Models.CartItem.findOne({
    where: { ProductId, CartId: userCart.id },
  });

  if (cartItemExist) {
    // if the product already exists
    return next(new ApiError("Product already added in the cart", 400));
  } else {
    // if the product does not exist, create a new cart item
    await Models.CartItem.create({
      ProductId,
      CartId: userCart.id,
      quantity,
    });
  }

  // 4) - calculate and update the total price and the discount price in the cart
  const CartItem = await Models.CartItem.findAll({
    where: { CartId: userCart.id, ProductId },
    include: { model: Models.Product },
  });

  // The total price of the cart item
  userCart.totalCartPrice +=
    (CartItem[0].Product.price - CartItem[0].Product.solde) * quantity;

  // 5) - save it in user cart
  await userCart.save();

  return res.status(200).json(
    new ApiSuccess("Product added to the cart", {
      name: CartItem[0].Product.name,
      price: CartItem[0].Product.price,
      quantity,
    })
  );
});

// @desc apply coupon to User Cart
// @route POST /api/v1/cart/applyCoupon
// @access private/user
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const UserId = req.body.UserId;
  // check if user has a coupon
  if (req.body.coupon) {
    const coupon = await Models.Coupon.findOne({
      where: { name: req.body.coupon },
    });
    if (coupon) {
      // check if the coupon is already available
      const date = new Date();
      if (coupon.expiredAt < date) {
        return next(new ApiError("Coupon is expired", 400));
      }
      // check if the coupon not used by the user before
      const Cart = await Models.Cart.findOne({ where: { UserId } });
      if (Cart.isUsedCoupon === true) {
        return next(new ApiError("The User is used this coupon", 400));
      }
      Cart.totalCartPrice -= coupon.discount;
      Cart.isUsedCoupon = true;
      await Cart.save();
      res
        .status(200)
        .json(
          new ApiSuccess(
            200,
            "Coupon applied successfully",
            Cart.totalCartPrice
          )
        );
    } else {
      return next(new ApiError("Coupon not found", 400));
    }
  }
});

// @desc Updaring the quantity of the product in the cart
// @route PUT /api/v1/cart/update/:ProductId
// @access private/user
exports.udpateInCart = asyncHandler(async (req, res, next) => {
  const ItemId = req.params.id;
  const { UserId, quantity } = req.body;
  console.log("item id: ", ItemId, " quantity: ", quantity);

  // 1) - Update the quantity in the cart item
  const updateProductIntoCartItem = await Models.CartItem.update(
    { quantity },
    { where: { id: ItemId } }
  );

  if (updateProductIntoCartItem == 0) {
    return next(new ApiError("Item not found in cart items", 404));
  }

  res
    .status(200)
    .json(new ApiSuccess(200, "Product quantity updated successfully"));
});

// @desc deleting a product from the cart
// @route DELETE /api/v1/cart/update/:ProductId
// @access private/user
exports.deleteProductFromCart = asyncHandler(async (req, res, next) => {
  const ItemId = req.params.id;

  // 1) - remove the item price from the total price of the user cart
  // get the specific item from the cart item
  const CartItem = await Models.CartItem.findOne({
    where: { id: ItemId },
  });

  // get the Cart of the user that contains all the cart Items
  const CartIdForUser = CartItem.CartId;
  const userCart = await Models.Cart.findOne({ where: { id: CartIdForUser } });

  // get the item details using the join with the product model
  const ItemDetails = await Models.CartItem.findAll({
    where: { ProductId: CartItem.ProductId },
    include: { model: Models.Product },
  });

  // calculate the price removed from the cart when the item is removed
  userCart.totalCartPrice -=
    (ItemDetails[0].Product.price - ItemDetails[0].Product.solde) *
    CartItem.quantity;

  // save it
  await userCart.save();

  // 2) - delete the item form the cart items
  const deleteProductFromCartItem = await Models.CartItem.destroy({
    where: { id: ItemId },
  });
  if (deleteProductFromCartItem == 0) {
    return next(new ApiError("Item not found in cart items", 404));
  }

  res
    .status(200)
    .json(new ApiSuccess(200, "Product deleted from the cart successfully"));
});
