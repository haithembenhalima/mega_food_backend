const {ChargilyClient, verifySignature } = require('@chargily/chargily-pay');
const ApiError = require('../utils/ApiError');
const ApiSuccess = require('../utils/ApiSuccess');
require("dotenv").config();


const apiSecretKey = process.env.CHARGILY_SECRET_KEY;

// create a client from chargily service
const client = new ChargilyClient({
  api_key: apiSecretKey,
  mode: 'test', // Change to 'live' when deploying your application
});


// @desc send the data for the checkout for paid
// @route POST /api/v1/payment/checkout
// @access private/user
exports.checkout = async (req, res) => {
  
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiSecretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        amount: 5000,  
        currency: 'dzd',
        success_url: 'https://your-cool-website.com/payments/success',
        metadata: {
          user_name: "haithem",
          user_email: "haithem@gmail.com",
          user_phone: "0548454545",
        },
      }),
  };

  try {
    const response = await fetch('https://pay.chargily.net/test/api/v2/checkouts', options);
    const data = await response.json();

    // Extract the checkout_url from the response
    const checkoutUrl = data.checkout_url;

    // Send the checkout_url as a JSON response
    res.status(200).json(new ApiSuccess(200, "You payment link is ready", { url: checkoutUrl }));
  } catch (err) {
    console.error(err);
    return next(new ApiError("An error occurred while creating checkout", 404))
  }

};


// @desc webhook for the response object from the chargily service 
// @route POST /api/v1/payment/webhook
// @access private/user
exports.webhook = (req, res) => { 
  const signature = req.get('signature') || '';
  const payload = req.rawBody;

  if (!signature) {
    return next(new ApiError("Signature header is missing", 400));
  }

  try {
    if (!verifySignature(payload, signature, apiSecretKey)) { 
      return next(new ApiError("Signature is invalid", 403));
    }
  } catch (error) {
    return next(new ApiError("Something happened while trying to process the request to the webhook", 403));;
  }

  const event = req.body;
  // You can use the event.type here to implement your own logic
  console.log(event);

  res.sendStatus(200);
};

