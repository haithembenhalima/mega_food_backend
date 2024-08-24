const { Op } = require("sequelize");
const ApiError = require("./ApiError");

// The all API features using in the system
exports.ApiFeatures = (query, limit, next) => {
  // Extract the query parameters coming
  const {
    page,
    sort,
    order = "ASC",
    filter,
    search,
    offset = limit * (page - 1),
  } = query;

  // Build query options
  let queryOptions = {
    where: {},
    order: [],
    limit,
    offset,
  };

  // @desc    Searching Feature
  // @format  ex:[?search=pizaza]
  if (search) {
    queryOptions.where.name = {
      // Sanitize search input to prevent injection attacks
      [Op.like]: `%${sanitize(search)}%`,
    };
  }

  // @desc    Filtering Feature
  // @format  ex:[?filter=price=500]
  // @format  ex:[?filter=CategoryID=chicken;price=100-300]
  if (filter) {
    // Assuming filter is a key-value pair like 'category=chicken'
    const filters = filter.split(";");
    filters.forEach((f) => {
      const [key, value] = f.split("=");

      if (key && value) {
        // Assuming value format is "min-max" such as:
        // eg:(=100-300) that means filter products with a price range of 100 to 300
        // eg:(=100) that means equal to 100
        // eg:(=-100) that means maximum value is 100
        // eg:(=100-) that means minimum value is 100
        if (key === "price") {
          const [minPrice, maxPrice] = value
            .split("-")
            .map((v) => parseFloat(v));
          if (minPrice && !isNaN(minPrice)) {
            queryOptions.where.price = {
              ...queryOptions.where.price,
              [Op.gte]: minPrice, // price >= minPrice
            };
          }
          if (maxPrice && !isNaN(maxPrice)) {
            queryOptions.where.price = {
              ...queryOptions.where.price,
              [Op.lte]: maxPrice, // price <= maxPrice
            };
          }
        }else if(key === "rate"){
          if(value >= 0 && value <=5){
            queryOptions.where.ratingAverage = {
              [Op.lte]: parseFloat(value),
            };
          }else{
            return next(new ApiError("The average rating must be between 1 and 5", 400));
          }
        } else {
          // Handle other filters
          queryOptions.where[key] = value;
        }
      } else {
        return next(new ApiError("Invalid filter format", 400));
      }
    });
  }

  // @desc Sorting Feature
  // @format ex:[?sort=price&order=ASC]
  if (sort) {
    // Validate sort and order parameters
    const validSortFields = ["name", "price", "createdAt", "quantity","solde", "ratingAverage"]; // valid fields possible
    if (!validSortFields.includes(sort)) {
      return next(new ApiError("Invalid sort field", 400));
    }
    if (order !== "ASC" && order !== "DESC") {
      return next(new ApiError("Invalid sort order", 400));
    }
    queryOptions.order.push([sort, order]);
  }

  // return the features
  return queryOptions;
};

// Sanitization function to prevent injection attacks
function sanitize(value) {
  return value.replace(/[^a-zA-Z0-9-_]/g, ""); // Example: Allow only alphanumeric, dash, and underscore
}
