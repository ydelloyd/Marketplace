import userRoutes from './userRoutes';

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/users', userRoutes);

describe('User Routes', () => {

    it('should get all users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
    });

    it('should create a new user', async () => {
        const newUser = { id: "1", name: 'John Doe'};
        const response = await request(app).post('/users').send(newUser);
        expect(response.status).toBe(201);
    });

    it('should get a user by id', async () => {
        const userId = '1';
        const response = await request(app).get(`/users/${userId}`);
        expect(response.status).toBe(200);
    });

    it('should delete a user', async () => {
        const userId = '1';
        const response = await request(app).delete(`/users/${userId}`);
        expect(response.status).toBe(200);
    });

    it('should return 404 if user is not found', async () => {
        const userId = '100';
        const response = await request(app).get(`/users/${userId}`);
        expect(response.status).toBe(404);
    });

    it('should return 400 if user id is missing', async () => {
        const newUser = { name: 'John Doe'};
        const response = await request(app).post('/users').send(newUser);
        expect(response.status).toBe(400);
    });


});