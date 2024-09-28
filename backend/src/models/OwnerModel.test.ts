import { Owner } from './OwnerModel';

describe('OwnerModel', () => {
    it('should create an Owner object with name and contactInfo', () => {
        const owner: Owner = {
            name: 'John Doe',
            contactInfo: 'john.doe@example.com'
        };

        expect(owner).toHaveProperty('name', 'John Doe');
        expect(owner).toHaveProperty('contactInfo', 'john.doe@example.com');
    });
    
});