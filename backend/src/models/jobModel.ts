import { OwnerModel } from './ownerModel';


export interface Job {
    id: string;
    title: string;
    description: string;
    owner: OwnerModel;
    expiration: string; // ISO 8601 date-time string
    lowestBid: number;
    numberOfBids: number;
    createdAt: string; // ISO 8601 date-time string
}