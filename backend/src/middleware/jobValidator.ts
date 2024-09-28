import { Request, Response, NextFunction } from 'express';
import { jobSchema } from '../models/jobModel';

export const validateJob = (req: Request, res: Response, next: NextFunction) => {
    const { error } = jobSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};