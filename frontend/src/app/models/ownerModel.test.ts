import { OwnerModel } from './ownerModel';

describe('OwnerModel', () => {
    it('should have a name property of type string', () => {
        const owner: OwnerModel = { name: 'John Doe', contactInfo: 'john.doe@example.com' };
        expect(typeof owner.name).toBe('string');
    });

    it('should have a contactInfo property of type string', () => {
        const owner: OwnerModel = { name: 'John Doe', contactInfo: 'john.doe@example.com' };
        expect(typeof owner.contactInfo).toBe('string');
    });

    it('should create an OwnerModel object correctly', () => {
        const owner: OwnerModel = { name: 'Jane Doe', contactInfo: 'jane.doe@example.com' };
        expect(owner).toEqual({ name: 'Jane Doe', contactInfo: 'jane.doe@example.com' });
    });
});