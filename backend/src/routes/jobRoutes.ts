import { Router } from "express";
import { JobController } from "../controllers/jobController";
import { validateJob } from "../middleware/jobValidator";
import { validateBidRequest } from "../middleware/bidValidator";

const router = Router();

router.get("/", JobController.getJobs);

router.get("/:id", JobController.getJobById);

router.post("/", validateJob, JobController.createJob);

router.post("/:id/bids", validateBidRequest, JobController.createBid);

export default router;
