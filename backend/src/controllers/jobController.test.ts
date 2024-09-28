import { Request, Response } from "express";
import { JobController } from "./jobController";
import { JobService } from "../services/jobService";
import { Job } from "../models/jobModel";
import { OwnerModel } from "../models/ownerModel";

jest.mock("../services/jobService");

describe("JobController.getJobs", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    const jobs: Job[] = [
        {
            id: "1",
            title: "SWE @ MailChimp",
            description: "This is a SWE Job at Mailchimp",
            owner: { name: "Jane Doe", contactInfo: "jane.doe@mailchimp.com" } as OwnerModel,
            expiration: "2024-10-03T19:00:00Z",
            lowestBid: 0,
            numberOfBids: 0,
            requirements: "",
            createdAt: "2024-09-28T02:55:06.404Z",
        } as Job];

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        req = {
            query: {}
        };
        res = {
            status: statusMock,
            json: jsonMock
        };
    });

    describe("getAllJobs", () => {
        it("should return 500 if there is an error", () => {
            const error = new Error("Test error");
            (JobService.getAllJobs as jest.Mock).mockImplementation((params, callback: (err: Error | null, jobs?: Job[]) => void) => {
                callback(error);
            });
    
            JobController.getJobs(req as Request, res as Response);
    
            expect(statusMock).toHaveBeenCalledWith(500);
        });
    
        it("should return jobs when no query params are provided", () => {
            (JobService.getAllJobs as jest.Mock).mockImplementation((params, callback) => {
                callback(null, jobs);
            });
    
            JobController.getJobs(req as Request, res as Response);
    
            expect(JobService.getAllJobs).toHaveBeenCalledWith(
                { recent: false, most_active: false, live_jobs: false, job_count: 5 },
                expect.any(Function)
            );
            expect(jsonMock).toHaveBeenCalledWith({ jobs });
        });
    
        it("should return 404 if no jobs are found", () => {
            (JobService.getAllJobs as jest.Mock).mockImplementation((params, callback) => {
                callback(null, null);
            });
    
            JobController.getJobs(req as Request, res as Response);
    
            expect(statusMock).toHaveBeenCalledWith(404);
        });
    });

    describe("getJobById", () => {

        it("should return 500 if there is an error", () => {
            const error = new Error("Test error");
            (JobService.getJobById as jest.Mock).mockImplementation((id, callback: (err: Error | null, job?: Job) => void) => {
                callback(error);
            });
    
            req.params = { id: "1" };
            JobController.getJobById(req as Request, res as Response);
    
            expect(statusMock).toHaveBeenCalledWith(500);
        });

        it("should return 400 if no id is present", () => {
            (JobService.getJobById as jest.Mock).mockImplementation((id, callback) => {
                callback(null, jobs[0]);
            });
    
            JobController.getJobById(req as Request, res as Response);
    
            expect(statusMock).toHaveBeenCalledWith(400);
        });

        it("should return job when id is provided", () => {
            (JobService.getJobById as jest.Mock).mockImplementation((id, callback) => {
                callback(null, jobs[0]);
            });
    
            req.params = { id: "1" };
            JobController.getJobById(req as Request, res as Response);
    
            expect(JobService.getJobById).toHaveBeenCalledWith("1", expect.any(Function));
            expect(jsonMock).toHaveBeenCalledWith(jobs[0]);
        });

        it("should return 404 if no job is found", () => {
            (JobService.getJobById as jest.Mock).mockImplementation((id, callback) => {
                callback(null, null);
            });
    
            req.params = { id: "100" };
            JobController.getJobById(req as Request, res as Response);
    
            expect(statusMock).toHaveBeenCalledWith(404);
        });
    
    });

    describe("createJob", () => {
        it("should return 500 if there is an error", () => {
            const error = new Error("Test error");
            (JobService.createJob as jest.Mock).mockImplementation((job, callback: (err: Error | null, job?: Job) => void) => {
                callback(error);
            });
    
            JobController.createJob(req as Request, res as Response);
    
            expect(statusMock).toHaveBeenCalledWith(500);
        });
    
        it("should create a job", () => {
            (JobService.createJob as jest.Mock).mockImplementation((job, callback) => {
                callback(null, jobs[0]);
            });
    
            req.body = jobs[0];
            JobController.createJob(req as Request, res as Response);
    
            expect(JobService.createJob).toHaveBeenCalledWith(jobs[0], expect.any(Function));
            expect(jsonMock).toHaveBeenCalledWith(jobs[0]);
        });
    });

});