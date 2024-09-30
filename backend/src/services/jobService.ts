import { Job } from "../models/jobModel";
import db from "../utils/db";
import { JobQueryParams } from "../models/jobQueryParams";
import { mapToJob } from "../utils/mappers";
import { Bid } from "../models/bidModel";

export class JobService {
    public static getAllJobs(
        params: JobQueryParams,
        callback: (err: Error | null, jobs?: Job[]) => void
    ): void {
        let query = `SELECT jobs.id, jobs.name, jobs.description, jobs.owner_name, jobs.contact_email, 
        jobs.expiration_time, jobs.created_at, COUNT(bids.id) AS bid_count, MIN(bids.amount) AS lowest_bid From (Select * From Jobs`;
        if (params.live_jobs) {
            query = query.concat(" WHERE expiration_time > " + `'${new Date().toISOString()}'`);
        }
        query = query.concat(") as jobs LEFT JOIN bids ON jobs.id = bids.job_id GROUP BY jobs.id");
        if (params.most_active) {
            // concat join with bids table and largest count of bids for each job
            query = query.concat(
                " ORDER BY bid_count DESC"
            );
        }
        if (params.recent) {
            query = query.concat(" ORDER BY created_at DESC");
        }
        if (params.job_count) {
            query = query.concat(" LIMIT " + params.job_count);
        }

        db.all(query, (err: Error | null, rows: any[]) => {
            if (err) {
                callback(new Error(`Error retrieving jobs: ${err.message}`));
            } else {
                callback(
                    null,
                    rows.map((row) => mapToJob(row))
                );
            }
        });
    }

    public static getJobById(
        id: string,
        callback: (err: Error | null, job?: Job) => void
    ): void {
        db.get(
            "SELECT jobs.*, COUNT(bids.id) AS bid_count, MIN(bids.amount) AS lowest_bid FROM jobs LEFT JOIN bids ON jobs.id = bids.job_id WHERE jobs.id = ? GROUP BY jobs.id;",
            [id],
            (err: Error | null, row: any) => {
                if (err) {
                    callback(new Error(`Error retrieving job: ${err.message}`));
                } else {
                    callback(null, row ? mapToJob(row) : undefined);
                }
            }
        );
    }

    public static createJob(
        job: Job,
        callback: (err: Error | null, job?: Job) => void
    ): void {
        db.run(
            `INSERT INTO jobs (name, description, owner_name, contact_email, requirements, expiration_time, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                job.title,
                job.description,
                job.owner.name,
                job.owner.contactInfo,
                job.requirements ? job.requirements : "",
                job.expiration,
                new Date().toISOString(),
            ],
            function (this: { lastID: number }, err: Error) {
                if (err) {
                    callback(new Error(`Error creating job: ${err.message}`));
                } else {
                    callback(null, { ...job, id: this.lastID.toString() });
                }
            }
        );
    }

    public static createBid(
        jobId: string,
        bid: Bid,
        callback: (err: Error | null, bid?: Bid) => void
    ): void {

        this.getJobById(jobId, (err, job) => {
            if (err) {
                callback(err);
            } else if (!job) {
                callback(null, undefined);
            } else {
                db.run(
                    `INSERT INTO bids (job_id, amount, contact_email, timestamp) VALUES (?, ?, ?, ?)`,
                    [jobId, bid.amount, bid.contact_email, new Date().toISOString()],
                    function (this: { lastID: number }, err: Error) {
                        if (err) {
                            callback(new Error(`Error creating bid: ${err.message}`));
                        } else {
                            callback(null, { ...bid, id: this.lastID.toString() });
                        }
                    }
                );
            }
        });
        
    }
}
