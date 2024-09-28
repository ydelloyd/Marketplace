import { mapToJob } from './mappers';
import { Job } from '../models/jobModel';

describe('mapToJob', () => {
    it('should map database row to Job object correctly', () => {
        const row = {
            id: 1,
            name: 'Test Job',
            description: 'This is a test job',
            owner_name: 'John Doe',
            contact_email: 'john.doe@example.com',
            expiration_time: '2023-12-31T23:59:59Z',
            created_at: '2023-01-01T00:00:00Z'
        };

        const expectedJob: Job = {
            id: '1',
            title: 'Test Job',
            description: 'This is a test job',
            owner: {
                name: 'John Doe',
                contactInfo: 'john.doe@example.com'
            },
            expiration: '2023-12-31T23:59:59Z',
            lowestBid: 0,
            numberOfBids: 0,
            createdAt: '2023-01-01T00:00:00Z'
        };

        const job = mapToJob(row);

        expect(job).toEqual(expectedJob);
    });
    
});