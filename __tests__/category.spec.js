const request = require("supertest");
const app = require("../app");

describe("All the /GET requests", () => {
  // @route GET /api/v1/categories
  test("Read all categories", async () => {
    const page = 1;
    const response = await request(app)
      .get("/api/v1/categories")
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
  test("Read single category", async  ()=>{
    const categoryId = 1; 
    const response = await request(app)
      .get(`/api/v1/categories/${categoryId}`)

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
  test("Create new category", async () => {
    const newCategory = {
      name: 'test category',
      description: 'Description for the test category',
      image: 'http://localhost:5000/uploads/test-category-image.jpeg'
    };

    // Make a POST request to create the category
    const response = await request(app)
      .post('/api/v1/categories')
      .send(newCategory); // Send the category data in the request body
    
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
  // @route PUT /api/v1/categories/:id
  test("Update a category", async () => {
    const categoryId = 6;
    const UpdateCategory = {
      name: 'updated test category'
    };

    // Make a PUT request to udpate the category
    const response = await request(app)
      .put(`/api/v1/categories/${categoryId}`)
      .send(UpdateCategory); 
    
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
  test("Delete a category", async () => {
    const categoryId = 1;

    // Make a PUT request to udpate the category
    const response = await request(app)
      .delete(`/api/v1/categories/${categoryId}`)
  
    // Assert the response status
    expect(response.status).toBe(200); 

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Object deleted with success');
  })
});
