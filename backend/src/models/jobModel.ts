import { Owner } from './OwnerModel';


export interface Job {
    id: string;
    title: string;
    description: string;
    owner: Owner;
    expiration: string; // ISO 8601 date-time string
    lowestBid: number;
    numberOfBids: number;
    requirements: string
}