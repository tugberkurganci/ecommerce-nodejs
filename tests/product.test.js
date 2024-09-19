// tests/productRoutes.test.js
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

describe('Product Routes', () => {
 

  it('should return an array of products', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI2NzI1Mjc4LCJleHAiOjE3MjY5ODQ0Nzh9.5SGx7e-JBrpglYx966HHtw37E_jAKmmHbjMyFEZUZkA';

    const response = await request(app)
      .get('/api/products')
      .set('token', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true); 
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('price');
    }
  });
});
