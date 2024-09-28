import { Job } from '../models/jobModel';
import { OwnerModel } from '../models/ownerModel';

export const mapToJob = (row: any): Job => {
    // All mapping cast is safe because we are sure that the data from the DB is in the correct format
    return {
        id: row.id.toString(), // Convert id to string
        title: row.name, // Map name to title
        description: row.description,
        owner: {
            name: row.owner_name,
            contactInfo: row.contact_email,
        } as OwnerModel, // Use object literal instead
        expiration: row.expiration_time, // Keep the expiration time as is
        lowestBid: 0, // Set a default value for lowestBid -- will be updated once join with bids table is implemented
        numberOfBids: 0, // Set a default value for numberOfBids -- will be updated once join with bids table is implemented
        createdAt: row.created_at, // Keep the created_at time as is
    };
    
}