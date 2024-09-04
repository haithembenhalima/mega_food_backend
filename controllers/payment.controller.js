const { ChargilyClient, verifySignature } = require("@chargily/chargily-pay");
const Models = require("../models/index.model");
const ApiError = require("../utils/ApiError");
const ApiSuccess = require("../utils/ApiSuccess");
const { where } = require("sequelize");
require("dotenv").config();

const apiSecretKey = process.env.CHARGILY_SECRET_KEY;

// create a client from chargily service
const client = new ChargilyClient({
  api_key: apiSecretKey,
  mode: "test", // Change to 'live' when deploying your application
});

// @desc send the data for the checkout for paid
// @route POST /api/v1/payment/checkout
// @access private/user
exports.checkout = async (req, res, next) => {
  const cart = req.body.cartId;
  // 1) - Get the Cart for the payment operation
  const Cart = await Models.Cart.findOne({ where: { id: cart } });

  if (!Cart) {
    return next(new ApiError("Cart not found", 404));
  }
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiSecretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Cart.totalCartPrice,
      currency: "dzd",
      success_url: "https://your-cool-website.com/payments/success",
      metadata:{
        CartId: Cart.id,
        UserId: Cart.UserId,
      }
    }),
  };

  try {
    const response = await fetch(
      "https://pay.chargily.net/test/api/v2/checkouts",
      options
    );
    const data = await response.json();

    // Extract the checkout_url from the response
    const checkoutUrl = data.checkout_url;

    // Send the checkout_url as a JSON response
    res
      .status(200)
      .json(
        new ApiSuccess(200, "You payment link is ready", { url: checkoutUrl })
      );
  } catch (err) {
    console.error(err);
    return next(new ApiError("An error occurred while creating checkout", 404));
  }
};

// @desc webhook for the response object from the chargily service
// @route POST /api/v1/payment/webhook
// @access private/user
exports.webhook = async (req, res, next) => {
  const signature = req.get("signature") || "";
  const payload = req.rawBody;

  if (!signature) {
    return next(new ApiError("Signature header is missing", 400));
  }

  try {
    if (!verifySignature(payload, signature, apiSecretKey)) {
      return next(new ApiError("Signature is invalid", 403));
    }
  } catch (error) {
    return next(
      new ApiError(
        "Something happened while trying to process the request to the webhook",
        403
      )
    );
  }

  const event = req.body;
  console.log(event);
  
  // You can use the event.type here to implement your own logic
  if (event.type === "checkout.paid") {
    const paidAt = Date.now();
    // create an order with paid status for delivery
    const { metadata } = event.data;
const userId = metadata ? metadata.UserId : null;
const cartId = metadata ? metadata.CartId : null;
    const newOrder = await Models.Order.create({
      totalPaid: event.data.amount,
      isPaid: true,
      paidAt: paidAt,
      UserId: userId,
      CartId: cartId,
    });
    res.status(200).json(new ApiSuccess(200, "Order created successfully please wait the delivery", newOrder, 1))
  }else{
    return next(new ApiError("Payment operation not finished", 400));
  }

};
