import { Router } from 'express';
import { JobController } from '../controllers/jobController';

const router = Router();

// Get all Jobs
router.get('/', JobController.getJobs);

export default router;