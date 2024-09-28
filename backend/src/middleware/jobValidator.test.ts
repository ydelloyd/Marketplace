import request from 'supertest';
import express from 'express';
import { validateJob } from './jobValidator';

const app = express();
app.use(express.json());
app.post('/job', validateJob, (req, res) => {
    res.status(200).send('Job is valid');
});

describe('Job Validator Middleware', () => {
    it('should pass validation for a valid job', async () => {
        const validJob = {
            title: 'Software Engineer',
            description: 'Develop and maintain software applications.',
            owner: {
                name: 'John Doe',
                contactInfo: 'john.doe@example.com'
            },
            expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString() // 1 day in the future
        };

        const response = await request(app)
            .post('/job')
            .send(validJob);

        expect(response.status).toBe(200);
        expect(response.text).toBe('Job is valid');
    });

    it('should fail validation if title is too short', async () => {
        const invalidJob = {
            title: 'Dev',
            description: 'Develop and maintain software applications.',
            owner: {
                name: 'John Doe',
                contactInfo: 'john.doe@example.com'
            },
            expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString() // 1 day in the future
        };

        const response = await request(app)
            .post('/job')
            .send(invalidJob);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('"title" length must be at least 5 characters long');
    });

    it('should fail validation if owner name contains invalid characters', async () => {
        const invalidJob = {
            title: 'Software Engineer',
            description: 'Develop and maintain software applications.',
            owner: {
                name: 'John123',
                contactInfo: 'john.doe@example.com'
            },
            expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString() // 1 day in the future
        };

        const response = await request(app)
            .post('/job')
            .send(invalidJob);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain(`owner.name`);
    });

    it('should fail validation if expiration date is in the past', async () => {
        const invalidJob = {
            title: 'Software Engineer',
            description: 'Develop and maintain software applications.',
            owner: {
                name: 'John Doe',
                contactInfo: 'john.doe@example.com'
            },
            expiration: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day in the past
        };

        const response = await request(app)
            .post('/job')
            .send(invalidJob);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('"expiration" must be greater than "now"');
    });
});