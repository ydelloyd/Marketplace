import request from 'supertest';
import express from 'express';
import jobRoutes from '../routes/jobRoutes'; // Adjust the import path based on your file structure

const app = express();

app.use(express.json()); // If your routes expect JSON payloads
app.use('/api/jobs', jobRoutes);

describe('Job Routes', () => {
    it('should get all jobs', async () => {

        const response = await request(app).get('/api/jobs');

        expect(response.status).toBe(200);
        expect(response.body.jobs.length).toEqual(4);
        expect(response.body.jobs[0].title).toEqual('SWE @ MailChimp');
    });

    it('should get a job by id', async () => {
        const response = await request(app).get('/api/jobs/1');

        expect(response.status).toBe(200);
        expect(response.body.title).toEqual('SWE @ MailChimp');
    });

    it('should return 404 if job is not found', async () => {
        const response = await request(app).get('/api/jobs/100');

        expect(response.status).toBe(404);
        expect(response.body.reason).toEqual('No job found');
    });

    it('should create a job', async () => {
        const job = {
            title: 'New Job',
            description: 'This is a new job',
            owner: { name: 'Jane Doe', contactInfo: 'jane.doe@test.com' },
            expiration: '2024-10-04T19:00:00Z',
        };
        const response = await request(app).post('/api/jobs').send(job);

        expect(response.status).toBe(201);
        expect(response.body.title).toEqual('New Job');
    });

    it('should create a bid', async () => {
        const bid = {
            amount: 200,
            contact_email: 'tester@tester.com',
        };
        const response = await request(app).post('/api/jobs/1/bids').send(bid);
        console.log(response.body);
        expect(response.status).toBe(201);
    });

    it('should return 400 if job is not found when creating a bid', async () => {
        const bid = {
            amount: 200,
            contactInfo: 'tester@tester.com'
        };
        const response = await request(app).post('/api/jobs/100/bids').send(bid);
        expect(response.status).toBe(400);
    });

});
