import { AxiosResponse } from "axios";
import { Job } from "../models/jobModel";
import { Bid } from "../models/bidModel";
import apiClient from "../utils/apiClient";

const jobService = {
  // Create a new job posting
  createJob: async (jobData: Job): Promise<AxiosResponse<Job>> => {
    const response = await apiClient.post<Job>("/api/jobs", {
      ...jobData,
      expiration: new Date(jobData.expiration).toISOString()
    });
    return response;
  },

  // Get all job postings with optional filters
  getAllJobs: async (
    recent?: boolean,
    mostActive?: boolean,
    liveJobs?: boolean,
    jobCount = 5
  ): Promise<AxiosResponse<Job[]>> => {
    const params = {
      recent,
      most_active: mostActive,
      live_jobs: liveJobs,
      job_count: jobCount
    };
    const response = await apiClient.get<{ jobs: Job[] }>("/api/jobs", {
      params
    });
    return { ...response, data: response.data.jobs };
  },

  // Get details of a specific job posting
  getJobDetails: async (jobId: string): Promise<AxiosResponse<Job>> => {
    const response = await apiClient.get<Job>(`/api/jobs/${jobId}`);
    return response;
  },

  // Place a new bid on a specific job
  placeBid: async (
    jobId: string,
    bidData: Bid
  ): Promise<AxiosResponse<Bid>> => {
    const response = await apiClient.post<Bid>(
      `/api/jobs/${jobId}/bids`,
      bidData
    );
    return response;
  }
};

export default jobService;
