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

describe('Order Routes', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI2NzI1Mjc4LCJleHAiOjE3MjY5ODQ0Nzh9.5SGx7e-JBrpglYx966HHtw37E_jAKmmHbjMyFEZUZkA';

  it('should create a new order successfully', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('token', `Bearer ${token}`) 
      .send({
        userId: 1,
        products: [{ productId: 1, quantity: 2 }],
        address: '123 Main St'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('userId', 1);
  });

  it('should return error if user balance is insufficient', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('token', `Bearer ${token}`)
      .send({
        userId: 1,
        products: [{ productId: 1, quantity: 200 }],
        address: '123 Main St'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Insufficient balance');
  });

  it('should get user orders successfully', async () => {
    const response = await request(app)
      .get('/api/orders/finduserorders/1') 
      .set('token', `Bearer ${token}`); 

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return error if user does not exist', async () => {
    const response = await request(app)
      .get('/api/orders/finduserorders/9999') 
      .set('token', `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
