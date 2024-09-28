import { Job } from '../models/jobModel';
import db from '../utils/db';
import { JobQueryParams } from '../models/jobQueryParams';
import { mapToJob } from '../utils/mappers';

export class JobService {

    public static getAllJobs(params: JobQueryParams, callback: (err: Error | null, jobs?: Job[]) => void): void {
        const query = 'SELECT * FROM jobs';
        if (params.recent) {
            query.concat(' ORDER BY createdAt DESC');
        }
        if (params.live_jobs) {
            query.concat(' WHERE deadline > ' + new Date().toISOString());
        }
        if (params.job_count) {
            query.concat(' LIMIT ' + params.job_count);
        }
        if (params.most_active) {
            // concat join with bids table and largest count of bids for each job
        }
        db.all(query, (err: Error | null, rows: any[]) => {
            if (err) {
                callback(new Error(`Error retrieving jobs: ${err.message}`));
            } else {
                callback(null, rows.map((row) => mapToJob(row)));
            }
        });
    }

}