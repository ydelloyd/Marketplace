import Joi from 'joi';
import { OwnerModel } from "./ownerModel";

export interface Job {
    id?: string;
    title: string;
    description: string;
    owner: OwnerModel;
    expiration: string; // ISO 8601 date-time string
    lowestBid: number;
    numberOfBids: number;
    requirements?: string;
    createdAt: string; // ISO 8601 date-time string
}

export const jobSchema = Joi.object({
    title: Joi.string().min(5).max(100).required().regex(/^[A-Za-z0-9 ]+$/),
    description: Joi.string(),
    owner: Joi.object({
        name: Joi.string().min(2).max(50).required().regex(/^[A-Za-z ]+$/),
        contactInfo: Joi.string().required(),
    }),
    requirements: Joi.string(),
    expiration: Joi.date().greater('now').required(),
});