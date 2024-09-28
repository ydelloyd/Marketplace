import request from 'supertest';
import express from 'express';
import { validateBidRequest } from './bidValidator';

const app = express();
app.use(express.json());
app.post('/bid', validateBidRequest, (req, res) => {
    res.status(200).send('Bid is valid');
});

describe('validateBidRequest Middleware', () => {
    it('should return 200 if the bid is valid', async () => {
        const response = await request(app)
            .post('/bid')
            .send({ amount: 100, contact_email: 'test@example.com' });
        expect(response.status).toBe(200);
        expect(response.text).toBe('Bid is valid');
    });

    it('should return 400 if the amount is missing', async () => {
        const response = await request(app)
            .post('/bid')
            .send({ contact_email: 'test@example.com' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"amount" is required');
    });

    it('should return 400 if the amount is not positive', async () => {
        const response = await request(app)
            .post('/bid')
            .send({ amount: -100, contact_email: 'test@example.com' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"amount" must be a positive number');
    });

    it('should return 400 if the contact_email is missing', async () => {
        const response = await request(app)
            .post('/bid')
            .send({ amount: 100 });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"contact_email" is required');
    });

    it('should return 400 if the contact_email is not valid', async () => {
        const response = await request(app)
            .post('/bid')
            .send({ amount: 100, contact_email: 'invalid-email' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"contact_email" must be a valid email');
    });
});