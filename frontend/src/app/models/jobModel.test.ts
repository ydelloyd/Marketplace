import { jobSchema, Job } from './jobModel';

describe('Job Model Validation', () => {
    it('should validate a correct job object', () => {
        const job: Job = {
            title: 'Software Developer',
            description: 'Develop and maintain software applications.',
            owner: {
                name: 'John Doe',
                contactInfo: 'john.doe@example.com'
            },
            expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day in the future
            requirements: 'Experience with TypeScript and Node.js'
        };

        const { error } = jobSchema.validate(job);
        expect(error).toBeUndefined();
    });

    it('should invalidate a job object with a short title', () => {
        const job: Job = {
            title: 'Dev',
            description: 'Develop and maintain software applications.',
            owner: {
                name: 'John Doe',
                contactInfo: 'john.doe@example.com'
            },
            expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day in the future
            requirements: 'Experience with TypeScript and Node.js'
        };

        const { error } = jobSchema.validate(job);
        expect(error).toBeDefined();
    });

    it('should invalidate a job object with an invalid owner name', () => {
        const job: Job = {
            title: 'Software Developer',
            description: 'Develop and maintain software applications.',
            owner: {
                name: 'J1',
                contactInfo: 'john.doe@example.com'
            },
            expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day in the future
            requirements: 'Experience with TypeScript and Node.js'
        };

        const { error } = jobSchema.validate(job);
        expect(error).toBeDefined();
    });

    it('should invalidate a job object with a past expiration date', () => {
        const job: Job = {
            title: 'Software Developer',
            description: 'Develop and maintain software applications.',
            owner: {
                name: 'John Doe',
                contactInfo: 'john.doe@example.com'
            },
            expiration: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day in the past
            requirements: 'Experience with TypeScript and Node.js'
        };

        const { error } = jobSchema.validate(job);
        expect(error).toBeDefined();
    });
});