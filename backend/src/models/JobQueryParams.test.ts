import { JobQueryParams } from './jobQueryParams';

describe('JobQueryParams Interface', () => {
    it('should allow an empty object', () => {
        const params: JobQueryParams = {};
        expect(params).toEqual({});
    });

    it('should allow setting recent to true', () => {
        const params: JobQueryParams = { recent: true };
        expect(params.recent).toBe(true);
    });

    it('should allow setting most_active to true', () => {
        const params: JobQueryParams = { most_active: true };
        expect(params.most_active).toBe(true);
    });

    it('should allow setting live_jobs to true', () => {
        const params: JobQueryParams = { live_jobs: true };
        expect(params.live_jobs).toBe(true);
    });

    it('should allow setting job_count to a number', () => {
        const params: JobQueryParams = { job_count: 5 };
        expect(params.job_count).toBe(5);
    });

    it('should allow setting multiple properties', () => {
        const params: JobQueryParams = { recent: true, most_active: false, live_jobs: true, job_count: 10 };
        expect(params.recent).toBe(true);
        expect(params.most_active).toBe(false);
        expect(params.live_jobs).toBe(true);
        expect(params.job_count).toBe(10);
    });
});