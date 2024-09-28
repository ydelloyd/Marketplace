import { JobService } from './jobService';
import db from '../utils/db';
import { JobQueryParams } from '../models/jobQueryParams';
import { mapToJob } from '../utils/mappers';

jest.mock('../utils/db');
jest.mock('../utils/mappers');

describe('JobService', () => {
    describe('getAllJobs', () => {
        it('should retrieve all jobs without filters', (done) => {
            const params: JobQueryParams = {};
            const mockRows = [
                { id: 1, name: 'Job 1', description: 'Description 1', owner_name: 'Owner 1', contact_email: 'owner1@example.com', expiration_time: '2023-12-31T23:59:59Z', created_at: '2023-01-01T00:00:00Z', bid_count: 2, lowest_bid: 100 },
                { id: 2, name: 'Job 2', description: 'Description 2', owner_name: 'Owner 2', contact_email: 'owner2@example.com', expiration_time: '2023-12-31T23:59:59Z', created_at: '2023-01-02T00:00:00Z', bid_count: 3, lowest_bid: 200 }
            ];

            (db.all as jest.Mock).mockImplementation((query, callback) => {
                callback(null, mockRows);
            });

            (mapToJob as jest.Mock).mockImplementation(row => row);

            JobService.getAllJobs(params, (err, jobs) => {
                expect(err).toBeNull();
                expect(jobs).toEqual(mockRows);
                done();
            });
        });

        it('should retrieve live jobs', (done) => {
            const params: JobQueryParams = { live_jobs: true };
            const mockRows = [
                { id: 1, name: 'Job 1', description: 'Description 1', owner_name: 'Owner 1', contact_email: 'owner1@example.com', expiration_time: '2023-12-31T23:59:59Z', created_at: '2023-01-01T00:00:00Z', bid_count: 2, lowest_bid: 100 }
            ];

            (db.all as jest.Mock).mockImplementation((query, callback) => {
                callback(null, mockRows);
            });

            (mapToJob as jest.Mock).mockImplementation(row => row);

            JobService.getAllJobs(params, (err, jobs) => {
                expect(err).toBeNull();
                expect(jobs).toEqual(mockRows);
                done();
            });
        });

        it('should retrieve recent jobs', (done) => {
            const params: JobQueryParams = { recent: true };
            const mockRows = [
                { id: 2, name: 'Job 2', description: 'Description 2', owner_name: 'Owner 2', contact_email: 'owner2@example.com', expiration_time: '2023-12-31T23:59:59Z', created_at: '2023-01-02T00:00:00Z', bid_count: 3, lowest_bid: 200 }
            ];

            (db.all as jest.Mock).mockImplementation((query, callback) => {
                callback(null, mockRows);
            });

            (mapToJob as jest.Mock).mockImplementation(row => row);

            JobService.getAllJobs(params, (err, jobs) => {
                expect(err).toBeNull();
                expect(jobs).toEqual(mockRows);
                done();
            });
        });

        it('should retrieve most active jobs', (done) => {
            const params: JobQueryParams = { most_active: true };
            const mockRows = [
                { id: 2, name: 'Job 2', description: 'Description 2', owner_name: 'Owner 2', contact_email: 'owner2@example.com', expiration_time: '2023-12-31T23:59:59Z', created_at: '2023-01-02T00:00:00Z', bid_count: 3, lowest_bid: 200 }
            ];

            (db.all as jest.Mock).mockImplementation((query, callback) => {
                callback(null, mockRows);
            });

            (mapToJob as jest.Mock).mockImplementation(row => row);

            JobService.getAllJobs(params, (err, jobs) => {
                expect(err).toBeNull();
                expect(jobs).toEqual(mockRows);
                done();
            });
        });

        it('should limit the number of jobs retrieved', (done) => {
            const params: JobQueryParams = { job_count: 1 };
            const mockRows = [
                { id: 1, name: 'Job 1', description: 'Description 1', owner_name: 'Owner 1', contact_email: 'owner1@example.com', expiration_time: '2023-12-31T23:59:59Z', created_at: '2023-01-01T00:00:00Z', bid_count: 2, lowest_bid: 100 }
            ];

            (db.all as jest.Mock).mockImplementation((query, callback) => {
                callback(null, mockRows);
            });

            (mapToJob as jest.Mock).mockImplementation(row => row);

            JobService.getAllJobs(params, (err, jobs) => {
                expect(err).toBeNull();
                expect(jobs).toEqual(mockRows);
                done();
            });
        });

        it('should handle database errors', (done) => {
            const params: JobQueryParams = {};
            const mockError = new Error('Database error');

            (db.all as jest.Mock).mockImplementation((query, callback) => {
                callback(mockError, null);
            });

            JobService.getAllJobs(params, (err, jobs) => {
                expect(err).toEqual(new Error(`Error retrieving jobs: ${mockError.message}`));
                expect(jobs).toBeUndefined();
                done();
            });
        });
    });

});