import { Bid } from './bidModel';

describe('Bid Model', () => {
    let bid: Bid;

    beforeEach(() => {
        bid = {
            id: '123',
            amount: 100,
            contact_email: 'test@test.com',
            timestamp: new Date().toISOString()
        };
    });
    
    it('should have a timestamp property of type string', () => {
        expect(typeof bid.timestamp).toBe('string');
    });

    it('should initialize amount to 100', () => {
        expect(bid.amount).toBe(100);
    });

    it('should increment amount by 50', () => {
        bid.amount += 50;
        expect(bid.amount).toBe(150);
    }); 


});