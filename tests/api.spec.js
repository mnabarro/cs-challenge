const request = require ('supertest');
const app = require ('../app');

describe('Test suite for Customers API endpoints', () => {
  
    it('Get all customers', async () => {
        
        const response = await request(app).get('/api/customers');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
  
    });
});