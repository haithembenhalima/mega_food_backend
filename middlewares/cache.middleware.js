// cacheMiddleware.js
const redisClient = require("../config/redis.config");
const ApiSuccess = require("../utils/ApiSuccess");
const { getAsync, setAsync } = require("../config/redis.config");

// Middleware to handle caching using redis
const cacheMiddleware = (model) => async (req, res, next) => {
  const page = req.query.page ? req.query.page : null;
  try {
    // Define a unique cache key based on request parameters or route
    const cacheKey = `resourceKey:${req.originalUrl}`;

    // Get from cache using the cache key
    const cachedData = await getAsync(cacheKey);
    if (cachedData) {
      // If cache exists, return cached data
      res
      .status(200)
      .json(
        new ApiSuccess("success", "Object getting with success", data, page)
      );
    }

    // On cache miss, query the database
    const data = await model.findAll({});

    // Set cache with an explicit expiry time
    await setAsync(
      cacheKey, // Cache key
      JSON.stringify(data), // Data to cache
      "EX", // Expiry option
      60 // TTL in seconds
    );

    // Send response with the fetched data
    res
      .status(200)
      .json(
        new ApiSuccess("success", "Object getting with success", data, page)
      );
  } catch (error) {
    console.error("Cache middleware error:", error);
    next(error); // Pass the error to the next middleware
  }
};

module.exports = cacheMiddleware;