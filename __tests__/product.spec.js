const request = require("supertest");
const app = require("../app");

describe("All the /GET requests", () => {
  // @route GET /api/v1/products
  test("Read all products", async () => {
    const page = 1;
    const response = await request(app)
      .get("/api/v1/products")
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

// @route GET /api/v1/products/:id
  test("Read single product", async  ()=>{
    const productId = 1; 
    const response = await request(app)
      .get(`/api/v1/products/${productId}`)

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
  // @route POST /api/v1/products
  test("Create new product", async () => {
    const newproduct = {
        name: "spagitti with cheez",
        description: "description for the spagotti",
        images: "[\"\",\"\"]",
        quantity: 30,
        price: 350,
        solde: 0,
        ratingAverage: 4.5,
        commandNumber: 90,
        createdAt: "2024-08-22T18:09:36.000Z",
        updatedAt: "2024-08-31T18:24:03.000Z",
        CategoryId: 1
    };

    // Make a POST request to create the product
    const response = await request(app)
      .post('/api/v1/products')
      .send(newproduct); // Send the product data in the request body
    
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
  // @route PUT /api/v1/products/:id
  test("Update a product", async () => {
    const productId = 1;
    const Updateproduct = {
      name: 'updated test product'
    };

    // Make a PUT request to udpate the product
    const response = await request(app)
      .put(`/api/v1/products/${productId}`)
      .send(Updateproduct); 
    
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
  // @route POST /api/v1/products
  test("Delete a product", async () => {
    const productId = 1;

    // Make a PUT request to udpate the product
    const response = await request(app)
      .delete(`/api/v1/products/${productId}`)
  
    // Assert the response status
    expect(response.status).toBe(200); 

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Object deleted with success');
  })
});
