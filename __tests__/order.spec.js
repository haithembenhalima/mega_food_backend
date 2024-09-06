const request = require("supertest");
const app = require("../app");

describe("All the /GET requests", () => {
  // @route GET /api/v1/orders
  test("Read all orders", async () => {
    const page = 1;
    const response = await request(app)
      .get("/api/v1/orders")
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

// @route GET /api/v1/orders/:id
  test("Read single order", async  ()=>{
    const orderId = 1; 
    const response = await request(app)
      .get(`/api/v1/orders/${orderId}`)

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
  // @route POST /api/v1/orders
  test("Create new order", async () => {
    const neworder = {
        totalPaid: 100,
        isPaid: true,
        paidAt: "25-09-2024",
        UserId: 3,
        CartId: 5
    };

    // Make a POST request to create the order
    const response = await request(app)
      .post('/api/v1/orders')
      .send(neworder); // Send the order data in the request body
    
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
  // @route PUT /api/v1/orders/:id
  test("Update a order", async () => {
    const orderId = 1;
    const Updateorder = {
      name: 'updated test order'
    };

    // Make a PUT request to udpate the order
    const response = await request(app)
      .put(`/api/v1/orders/${orderId}`)
      .send(Updateorder); 
    
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
  // @route POST /api/v1/orders
  test("Delete a order", async () => {
    const orderId = 1;

    // Make a PUT request to udpate the order
    const response = await request(app)
      .delete(`/api/v1/orders/${orderId}`)
  
    // Assert the response status
    expect(response.status).toBe(200); 

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Object deleted with success');
  })
});
