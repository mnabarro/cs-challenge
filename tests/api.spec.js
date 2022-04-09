const request = require ('supertest');
const app = require ('../app');

const newCustomer = {
    name: "Test",
    surName: "User",
    email: "testuser@domain.com",
    birthDate: "1990-01-02"
};

const modifiedCustomer = {
    name: "Test",
    surName: "User2",
    email: "testuser2@otherdomain.com",
    birthDate: "1990-01-22"
};

//Tell Sequelize wich to use in-memory db.
process.env.NODE_ENV='test';

describe('Test suite for Customers API endpoints', () => {
  
    it('Get all customers', async () => {
        
        const response = await request(app).get('/api/customers');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('count', 0);
        
    });
    
    it('Insert one customer', async () => {
        
        const response = await request(app).post('/api/customers').send(newCustomer);
        
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('data.email', newCustomer.email);
        
    });
    
    it('Get created customer', async () => {
        
        const response = await request(app).get('/api/customers/1');
    
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data.name', newCustomer.name);
        //console.log(response.body.data);
        
    });

    it('Search customer by email', async () => {
        
        const response = await request(app).get(`/api/customers/search/${newCustomer.email}`);
    
        expect(response.statusCode).toEqual(200);
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Test'
                })
            ])
        );
    });

    it('Modify customer', async () => {
        
        const response = await request(app).put('/api/customers/1').send(modifiedCustomer);
        
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data.surName', modifiedCustomer.surName);
        expect(response.body).toHaveProperty('data.email', modifiedCustomer.email);
        
    });

    it('Delete customer', async () => {
        
        const response = await request(app).delete('/api/customers/1')
        
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('id','1');
        
    });

});
