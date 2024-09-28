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
        expect(response.body.jobs.length).toEqual(1);
        expect(response.body.jobs[0].title).toEqual('SWE @ MailChimp');
    });
});
