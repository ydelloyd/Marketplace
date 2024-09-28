import { Job } from "../models/jobModel";

const jobs: Job[] = [
  // Example job data
];

const jobService = {
  getAllJobs: async (): Promise<Job[]> => {
    return jobs.slice(0, 5);
  }
};

export default jobService;
