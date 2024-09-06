const request = require("supertest");
const app = require("../app");

describe("Authentication /POST requests", () => {
  // @route POST /api/v1/auth/register
  test("Register a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123" // Ensure this password meets your requirements
    };

    // Make a POST request to register the user
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(newUser); 
    
    // Log response body for debugging
    console.log('Response Body:', response.body);

    // Assert the response status
    expect(response.status).toBe(201); // Registration should typically return 201 Created

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'User registered successfully');
    expect(response.body).toHaveProperty('data');
  });

  // @route POST /api/v1/auth/login
  test("Login with valid credentials", async () => {
    const credentials = {
      email: "john.doe@example.com",
      password: "password123"
    };

    // Make a POST request to login
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send(credentials);
    
    // Log response body for debugging
    console.log('Response Body:', response.body);

    // Assert the response status
    expect(response.status).toBe(200); // Login should typically return 200 OK

    // Assert the response body structure and content
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Login successful');
    expect(response.body).toHaveProperty('token'); // Ensure a token is returned
  });



});

