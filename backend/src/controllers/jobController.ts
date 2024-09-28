import { Request, Response } from 'express';
import { Job } from '../models/jobModel';
import { JobService } from '../services/jobService';
import { JobQueryParams } from '../models/jobQueryParams';
import { GenericError } from '../models/errorModel';

export class JobController {
    // Get all jobs
    public static getJobs(req: Request, res: Response): void {
        console.log('getJobs');
        const { recent, most_active, live_jobs, job_count } = req.query;

        // basic sanititation of query params
        const params: JobQueryParams = {
            recent: recent === 'true',
            most_active: most_active === 'true',
            live_jobs: live_jobs === 'true',
            job_count: job_count ? parseInt(job_count as string, 10) : 5,
        };

        JobService.getAllJobs(params, (err: Error | null, jobs?: Job[]) => {
            const genericError: GenericError = { reason: '' };
            if (err) {
                genericError.reason = err.message;
                res.status(500).json(genericError);
            }
            if (!jobs) {
                genericError.reason = 'No jobs found';
                res.status(404).json(genericError);
            }
            res.json({ jobs: jobs });
        });
    }

}