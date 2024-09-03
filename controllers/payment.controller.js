const { response } = require("express");

require("dotenv").config();

exports.checkout = (req, res) => {
  const options = {
    
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CHARGILY_SECRET_KEY}`,
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

  fetch("https://pay.chargily.net/test/api/v2/checkouts", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

};
