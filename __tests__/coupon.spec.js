const request = require("supertest");
const app = require("../app");

describe("All the /GET requests", () => {
  // @route GET /api/v1/categories
  test("Read all coupons", async () => {
    const page = 1;
    const response = await request(app)
      .get("/api/v1/coupons")
      .query({ page });

    // asset the response status
    expect(response.status).toBe(200);

    // Assert the response body structure and content
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("page", page.toString()); // Response has page as string
    expect(response.body).toHaveProperty(
      "message",
      "Object getting with success"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0); // Ensure there are items in the array
  });

// @route GET /api/v1/categories/:id
  test("Read single coupon", async  ()=>{
    const couponId = 1; 
    const response = await request(app)
      .get(`/api/v1/coupons/${couponId}`)

    // asset the response status
    expect(response.status).toBe(200);

    // Assert the response body structure and content
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty(
      "message",
      "Object finded with success"
    );
    expect(response.body).toHaveProperty("data");  
  });
});

describe("/POST reuests",()=>{
  // @route POST /api/v1/categories
  test("Create new coupon", async () => {
    const newcoupon = {
      name: 'TEST_COUPON',
      expiredAt: '27-09-2024',
      discount: 150
    };

    // Make a POST request to create the coupon
    const response = await request(app)
      .post('/api/v1/coupons')
      .send(newcoupon); // Send the coupon data in the request body
    
    // Log response body for debugging
    console.log('Response Body:', response.body);

    // Assert the response status
    expect(response.status).toBe(201); // Typically, POST requests return 201 Created

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Object created with success');
    expect(response.body).toHaveProperty('data');
  })
});

describe("/PUT requests",()=>{
  // @route PUT /api/v1/categories/:id
  test("Update a coupon", async () => {
    const couponId = 1;
    const Updatecoupon = {
      name: 'TEST_COUPON125',
    };

    // Make a PUT request to udpate the coupon
    const response = await request(app)
      .put(`/api/v1/coupons/${couponId}`)
      .send(Updatecoupon); 
    
    // Log response body for debugging
    console.log('Response Body:', response.body);

    // Assert the response status
    expect(response.status).toBe(200); 

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Object updated with success');
    expect(response.body).toHaveProperty('data');
  })
});

describe("/DELETE requests",()=>{
  // @route POST /api/v1/categories
  test("Delete a coupon", async () => {
    const couponId = 1;

    // Make a PUT request to udpate the coupon
    const response = await request(app)
      .delete(`/api/v1/coupons/${couponId}`)
  
    // Assert the response status
    expect(response.status).toBe(200); 

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Object deleted with success');
  })
});
