# Mega Food API

Is the back-end side for "Mega Food Restaurant" especially for the food delivery in algeria, 
Their services are currently concentrated in `Algiers` and `Boumerdes` and `Tipaza` , 
This project is designed to provide a comprehensive solution for managing food delivery services. 
It encompasses everything from food listings to customer orders to online payement and delivery logistics.
Through my work on this project, I have focused on improving performance and effectiveness for the food delivery
services such as: Ordering synchronization and E-payement solutions in algeria.<br><br>

<div align="center">
  <img src="https://nodejs.org/static/logos/jsIconGreen.svg" height="80" alt="Node.js">
  <img src="https://vectorified.com/images/express-js-icon-20.png" height="80" alt="Express.js">
  <img src="https://upload.wikimedia.org/wikipedia/labs/8/8e/Mysql_logo.png" height="80" alt="MySQL">
  <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/redis_plain_wordmark_logo_icon_146367.png" height="80" alt="Redis">
  <img src="https://th.bing.com/th/id/R.7448044342419709f7db743f8b4b29b2?rik=4%2bbbyMMG839%2b2w&pid=ImgRaw&r=0" height="80" alt="Other">
  <img src="https://avatars.githubusercontent.com/u/92551094?s=200&v=4" height="80" alt="Other">
</div>

# Core Features
1. **User Authentication and Profile Management**
   - **Sign-Up/Log-In:** Users should be able to create an account or log in using email, phone number, or social media accounts.
   - **Profile Management:** Users can update personal information, address details, and payment methods.
   - **Password Recovery:** Option to reset forgotten passwords securely using email.
2. **Restaurant and Menu Listings**
   - **Menu Display:** Restaurants should have their menus displayed with descriptions, prices, and images.
   - **Filters and Sorting:** Users can filter by cuisine type, price range, rating, or delivery time.
3. **Order Placement and Management**
   - **Add to Cart:** Users can select items, customize them, and add them to a cart.
   - **Order Summary:** Display a summary of the order including items, quantities, and total price.
   - **Address Selection:** Users can choose from saved addresses or add a new delivery address.
   - **Delivery Instructions:** Option for users to provide specific instructions for delivery.
4. **Payment Processing**
   - **Online Payment:** Using Chargily Pay.
   - **Cash on Delivery:** Option for users to choose cash payment upon delivery.
5. **Order Tracking and Notifications**
   - **Order Updates:** Send notifications for order confirmation, preparation, out-for-delivery, and delivery completion.
   - **Estimated Delivery:** Time: Provide an estimated delivery time and updates if there are delays.
6. **Ratings and Reviews**
   - **Rate and Review:** Users can rate and leave reviews for restaurants and delivery services.
   - **View Reviews:** Users can read reviews and see ratings to help with decision-making.
7. **User Preferences and History**
   - **Order History:** Users can view their past orders for easy reordering.
   - **Favorites:** Option to save favorite restaurants or menu items for quick access.
8. **Promotions and Discounts**
   - **Coupons and Promo Codes:** Users can apply discounts or promotional codes during checkout.
9. **Security and Privacy**
   - **Data Encryption:** Ensure user data and transactions are protected with strong encryption.
   - **Caching:** Using caching system for the best performance

# Getting started

Ensure that you have:

- NodeJS
- MySQL
- Redis

Maybe you need to use: (optional)

- Vscode (proposed)
- Postman (proposed)
- Docker
  
### Installation
1. Clone the repository:

```
git clone https://github.com/haithembenhalima/dietary_ia.git
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables, Create a ` .env ` file in the root directory and add the following:
```
# server environment
SERVER_PORT = 5000
NODE_ENV = "development" # or production
DB_HOST = "localhost"  # if you working on localhost
PRODUCTION_URL = "https://restaurant.com" #website url if is deployed

# database environment
DB_USER = "root"
DB_PASSWORD = ""
DB_NAME= "restaurant_db"
DB_DIALECT = "mysql"

# JWT environment
JWT_SECRET_KEY = your JWT Token
JWT_EXPIRATION_TIME = "7d"

# nodemailer environment
EMAIL_USER = example@gmail.com
EMAIL_PASSWORD = password
EMAIL_HOST = "smtp.gmail.com" # if using gmail
EMAIL_PORT = "465" # if using gmail

# chargily pay
CHARGILY_SECRET_KEY = your chargily secret key

# Redis env
REDIS_PORT = 6379
REDIS_HOST = "localhost" # if you working on localhost
```
### Usage

1. Start the server

```

# Development mode
npm run start:dev

# Production mode
npm run start:production

# Test mode
npm run start:test

```

2. If you need to run the application using Docker apply the following steps:
   - Build the Docker image:
     ```
     docker build -t mega-food .
     ```
   - Run Docker container:
     ```
     docker-compose up
     ```
   - Access to application:
     ```
       http://localhost:${PORT}
     ```

# Project Structure

```

   ├─ .dockerignore
   ├─ .env
   ├─ app.js
   ├─ config
   │  ├─ database.config.js
   │  ├─ logger.config.js
   │  ├─ rateLimiter.config.js
   │  └─ redis.config.js
   ├─ controllers
   │  ├─ auth.controller.js
   │  ├─ cart.controller.js
   │  ├─ categories.controller.js
   │  ├─ coupon.controller.js
   │  ├─ factoryHandler
   │  │  └─ FactoryMethods.js
   │  ├─ order.controller.js
   │  ├─ payment.controller.js
   │  ├─ product.controller.js
   │  ├─ review.controller.js
   │  ├─ user.controller.js
   │  └─ wishlist.controller.js
   ├─ database
   │  └─ connect.database.js
   ├─ docker-compose.yml
   ├─ Dockerfile
   ├─ errors.log
   ├─ middlewares
   │  ├─ cache.middleware.js
   │  ├─ error.middleware.js
   │  ├─ imageProcessing.middleware.js
   │  ├─ permessions.middleware.js
   │  ├─ uploadingImages.middleware.js
   │  └─ validator.middleware.js
   ├─ models
   │  ├─ cart.model.js
   │  ├─ cartItem.model.js
   │  ├─ category.model.js
   │  ├─ coupon.model.js
   │  ├─ index.model.js
   │  ├─ order.model.js
   │  ├─ product.model.js
   │  ├─ review.model.js
   │  ├─ user.model.js
   │  └─ wishlist.model.js
   ├─ package-lock.json
   ├─ package.json
   ├─ routes
   │  ├─ auth.route.js
   │  ├─ cart.route.js
   │  ├─ categories.route.js
   │  ├─ coupon.route.js
   │  ├─ index.route.js
   │  ├─ order.route.js
   │  ├─ payment.route.js
   │  ├─ product.route.js
   │  ├─ review.route.js
   │  ├─ user.route.js
   │  └─ wishlist.route.js
   ├─ server.js
   ├─ uploads
   ├─ utils
   │  ├─ ApiError.js
   │  ├─ ApiFeatures.js
   │  ├─ ApiSuccess.js
   │  ├─ emailMessages.js
   │  ├─ generateToken.js
   │  ├─ sendEmail.js
   │  └─ validators
   │     ├─ auth.validator.js
   │     ├─ category.validator.js
   │     ├─ coupon.validator.js
   │     ├─ product.validator.js
   │     ├─ review.validator.js
   │     └─ user.validator.js
   └─ __tests__
      ├─ auth.spec.js
      ├─ category.spec.js
      ├─ coupon.spec.js
      ├─ order.spec.js
      ├─ product.spec.js
      ├─ review.spec.js
      └─ user.spec.js

```

# Endpoints
1. ***Categories***
  - ` GET /api/v1/categories  ` Get all categories <br>
    Accept queries EX: <br>
                       [ ?page=1 ] <br>
                       [?search=burger]
  - ` GET /api/v1/categories/:id ` Get one Category
  - ` POST /api/v1/categories ` Create Category
  - ` PUT /api/v1/categories/:id ` Update Category
  - ` DELETE /api/v1/categories/:id ` Delete Category
     
  2. ***products***
   - ` GET /api/v1/products  ` Get all products <br>
    Accept queries EX: <br>
                       [ ?page=1 ] <br>
                       [ ?filter=price=500 ] <br>
                       [ ?filter=CategoryID=chicken;price=100-300 ] <br>
                       [ ?filter=CategoryID=chicken;price=100- ]
                       [ ?filter=CategoryID=chicken;price=-100 ]
                       [?sort=price&order=ASC]
                       [?search=pizza]
   - ` GET /api/v1/products/:id ` Get one product
   - ` POST /api/v1/products ` Create product
   - ` PUT /api/v1/products/:id ` Update product
   - ` DELETE /api/v1/products/:id ` Delete product
     
  3. ***users***
   - ` GET /api/v1/users  ` Get all users <br>
    Accept queries EX: <br>
                       [ ?page=1 ] <br>
                       [?search=mohamed]
   - ` GET /api/v1/users/:id ` Get one user
   - ` POST /api/v1/users ` Create user
   - ` PUT /api/v1/users/:id ` Update user
   - ` DELETE /api/v1/users/:id ` Delete user

 4. ***coupons***
   - ` GET /api/v1/coupons  ` Get all coupons <br>
    Accept queries EX: <br>
                       [ ?page=1 ] <br>
                       [?search=5_JUILLET_2025]
   - ` GET /api/v1/coupons/:id ` Get one coupon
   - ` POST /api/v1/coupons ` Create coupon
   - ` PUT /api/v1/coupons/:id ` Update coupon
   - ` DELETE /api/v1/coupons/:id ` Delete coupon

 5. ***orders***
   - ` GET /api/v1/orders  ` Get all orders <br>
    Accept queries EX: <br>
                       [ ?page=1 ] <br>
                       [?search=12342]
   - ` GET /api/v1/orders/:id ` Get one order
   - ` POST /api/v1/orders ` Create order
   - ` PUT /api/v1/orders/:id ` Update order
   - ` DELETE /api/v1/orders/:id ` Delete order

  6. ***reviews***
   - ` GET /api/v1/reviews/:ProductId ` Get one review by product id
   - ` POST /api/v1/reviews ` Create review
   - ` PUT /api/v1/reviews/:id ` Update review
   - ` DELETE /api/v1/reviews/:id ` Delete reviews

   6. ***auth***
   - ` POST /api/v1/signup ` register
   - ` POST /api/v1/login ` login
   - ` POST /api/v1/forgotPassword` forgot passowrd
   - ` POST /api/v1/verifyResetCode ` verify reset code
   - - ` POST /api/v1/resetPassword ` reset the new password
