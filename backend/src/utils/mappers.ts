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
        } as OwnerModel,
        expiration: row.expiration_time,
        lowestBid: row.lowest_bid ? row.lowest_bid : 0, // Set lowestBid to 0 if it is null
        numberOfBids: row.bid_count, 
        createdAt: row.created_at,
    };
    
}