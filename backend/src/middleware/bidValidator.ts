import Joi from 'joi';
import { bidSchema } from '../models/bidModel';
import { Request, Response, NextFunction } from 'express';


export const validateBidRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = bidSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next(); // Proceed to the next middleware/controller if validation passes
};