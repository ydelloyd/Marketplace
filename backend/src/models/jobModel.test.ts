import { Job } from './jobModel';
import { OwnerModel } from './ownerModel';

describe('Job Model', () => {
    let owner: OwnerModel;
    let job: Job;

    beforeEach(() => {
        owner = {
            name: 'John Doe',
            contactInfo: 'john.doe@example.com'
        };

        job = {
            id: 'job1',
            title: 'Test Job',
            description: 'This is a test job description',
            owner: owner,
            expiration: new Date().toISOString(),
            lowestBid: 100,
            numberOfBids: 0,
            createdAt: new Date().toISOString()

        };
    });

    it('should initialize numberOfBids to 0', () => {
        expect(job.numberOfBids).toBe(0);
    });

    it('should increment numberOfBids', () => {
        job.numberOfBids += 1;
        expect(job.numberOfBids).toBe(1);
    });
    
});