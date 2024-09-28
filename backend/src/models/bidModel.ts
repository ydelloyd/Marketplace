import Joi from 'joi';

export interface Bid {
    id: string;
    amount: number;
    contact_email: string;
    timestamp: string; // ISO 8601 date-time string
}

// Define the schema for the bid
export const bidSchema = Joi.object({
    amount: Joi.number().required().positive(), // Amount should be a positive number
    contact_email: Joi.string().email().required(), // Email must be valid and required
});