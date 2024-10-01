import jobService from "../services/jobService";
import { Job } from "../models/jobModel";
import { Bid } from "../models/bidModel";
import apiClient from "../utils/apiClient";


// Mock the apiClient methods
jest.mock("../utils/apiClient", () => ({
    post: jest.fn(),
    get: jest.fn(),
  }));
  
  const mockPost = apiClient.post as jest.Mock;
  const mockGet = apiClient.get as jest.Mock;

describe("jobService", () => {
  const mockJob: Job = {
    id: "1",
    title: "Job 1",
    description: "Description 1",
    expiration: new Date().toISOString(),
    owner: { name: "test", contactInfo: "test@test.com" },
    lowestBid: 100,
    numberOfBids: 5,
    requirements: "Test requirements",
    createdAt: new Date().toISOString(),
  };

  const mockBid: Bid = {
    contact_email: "tester@tester.com",
    amount: 100,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createJob", () => {
    it("should create a job successfully", async () => {
      const response = { data: mockJob };
      mockPost.mockResolvedValueOnce(response);

      const result = await jobService.createJob(mockJob);

      expect(mockPost).toHaveBeenCalledWith("/api/jobs", {
        ...mockJob,
        expiration: new Date(mockJob.expiration).toISOString(),
      });
      expect(result).toEqual(response);
    });
  });

  describe("getAllJobs", () => {
    it("should fetch all jobs with default params", async () => {
      const response = { data: { jobs: [mockJob] } };
      mockGet.mockResolvedValueOnce(response);

      const result = await jobService.getAllJobs();

      expect(mockGet).toHaveBeenCalledWith("/api/jobs", {
        params: {
          recent: undefined,
          most_active: undefined,
          live_jobs: undefined,
          job_count: 5,
        },
      });
      expect(result.data).toEqual([mockJob]);
    });

    it("should fetch all jobs with custom params", async () => {
      const response = { data: { jobs: [mockJob] } };
      mockGet.mockResolvedValueOnce(response);

      const result = await jobService.getAllJobs(true, true, true, 10);

      expect(mockGet).toHaveBeenCalledWith("/api/jobs", {
        params: {
          recent: true,
          most_active: true,
          live_jobs: true,
          job_count: 10,
        },
      });
      expect(result.data).toEqual([mockJob]);
    });
  });

  describe("getJobDetails", () => {
    it("should fetch job details successfully", async () => {
      const response = { data: mockJob };
      mockGet.mockResolvedValueOnce(response);

      if (mockJob.id) {
        const result = await jobService.getJobDetails(mockJob.id);
        expect(mockGet).toHaveBeenCalledWith(`/api/jobs/${mockJob.id}`);
        expect(result).toEqual(response);
      } else {
        throw new Error("mockJob.id is null or undefined");
      }
    });
  });

  describe("placeBid", () => {
    it("should place a bid successfully", async () => {
      const response = { data: mockBid };
      mockPost.mockResolvedValueOnce(response);

      // Added check for mockJob.id
      if (mockJob.id) {
        const result = await jobService.placeBid(mockJob.id, mockBid);
        expect(mockPost).toHaveBeenCalledWith(
          `/api/jobs/${mockJob.id}/bids`,
          mockBid
        );
        expect(result).toEqual(response);
      } else {
        throw new Error("mockJob.id is null or undefined");
      }
    });
  });
});
