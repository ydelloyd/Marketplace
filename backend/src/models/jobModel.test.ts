import { Job } from './jobModel';
import { Owner } from './OwnerModel';

describe('Job Model', () => {
    let owner: Owner;
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
            requirements: 'Test requirements'
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