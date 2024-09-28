import { Router } from "express";
import { JobController } from "../controllers/jobController";

const router = Router();

// Get all Jobs
router.get("/", JobController.getJobs);

router.get("/:id", JobController.getJobById);

router.post("/", JobController.createJob);

router.post("/:id/bids", JobController.createBid);

export default router;
