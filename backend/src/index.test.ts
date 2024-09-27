import request from 'supertest';
import express from 'express';
import userRoutes from './routes/userRoutes';
import { Server } from 'http';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

describe('Express Server', () => {
    let server: Server;

    beforeAll((done) => {
        server = app.listen(3001, () => {
            console.log('Test server running on port 3001');
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should respond to GET /users with status 200', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
    });

    // Add more tests as needed
});