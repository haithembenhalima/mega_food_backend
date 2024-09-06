const request = require("supertest");
const app = require("../app");

describe("All the /GET requests", () => {
  // @route GET /api/v1/reviews
  test("Read all reviews", async () => {
    const page = 1;
    const response = await request(app)
      .get("/api/v1/reviews")
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

// @route GET /api/v1/reviews/:id
  test("Read single review", async  ()=>{
    const reviewId = 1; 
    const response = await request(app)
      .get(`/api/v1/reviews/${reviewId}`)

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
  // @route POST /api/v1/reviews
  test("Create new review", async () => {
    const newreview = {
        title: "nice product",
        ratings: 4,
        createdAt: "2024-08-31T16:58:55.000Z",
        updatedAt: "2024-08-31T16:58:55.000Z",
        UserId: 3,
        ProductId: 5,
    };

    // Make a POST request to create the review
    const response = await request(app)
      .post('/api/v1/reviews')
      .send(newreview); // Send the review data in the request body
    
    // Log response body for debugging
    console.log('Response Body:', response.body);

    // Assert the response status
    expect(response.status).toBe(400); // Typically, POST requests return 201 Created

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Object created with success');
    expect(response.body).toHaveProperty('data');
  })
});

describe("/PUT requests",()=>{
  // @route PUT /api/v1/reviews/:id
  test("Update a review", async () => {
    const reviewId = 1;
    const Updatereview = {
      name: 'updated test review'
    };

    // Make a PUT request to udpate the review
    const response = await request(app)
      .put(`/api/v1/reviews/${reviewId}`)
      .send(Updatereview); 
    
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
  // @route POST /api/v1/reviews
  test("Delete a review", async () => {
    const reviewId = 1;

    // Make a PUT request to udpate the review
    const response = await request(app)
      .delete(`/api/v1/reviews/${reviewId}`)
  
    // Assert the response status
    expect(response.status).toBe(200); 

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Object deleted with success');
  })
});
