const request = require('supertest');
const app = require('../index.js'); 
const sequelize = require('../config/database');

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});


describe('User Registration', () => {
  it('should create a new user and return a success response', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe1234@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('isAdmin',false);
    expect(response.body).toHaveProperty('email', 'john.doe1234@example.com');
  });

  it('should return an error if email is missing', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Registration failed');
  });
});
describe('User Login', () => {
    it('should login the user and return a token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe1234@example.com',
          password: 'password123'
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
    });
  
    it('should return an error if password is incorrect', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe1234@example.com',
          password: 'wrongpassword'
        });
  
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('message', 'Wrong Password');
    });
  });
  