import { Bid } from './bidModel';

describe('Bid Model', () => {
    it('should have a valid amount', () => {
        const bid: Bid = { amount: 100, contact_email: 'test@example.com' };
        expect(bid.amount).toBeGreaterThan(0);
    });

    it('should have a valid contact email', () => {
        const bid: Bid = { amount: 100, contact_email: 'test@example.com' };
        expect(bid.contact_email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('should create a bid with correct properties', () => {
        const bid: Bid = { amount: 100, contact_email: 'test@example.com' };
        expect(bid).toHaveProperty('amount', 100);
        expect(bid).toHaveProperty('contact_email', 'test@example.com');
    });
});