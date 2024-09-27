import { User } from './userModel';

describe('User Model', () => {
    it('should have an id of type string', () => {
        const user: User = { id: "1", name: "John Doe" };
        expect(typeof user.id).toBe("string");
    });

    it('should have a name of type string', () => {
        const user: User = { id: "1", name: 'John Doe' };
        expect(typeof user.name).toBe('string');
    });

    it('should create a user with the correct properties', () => {
        const user: User = { id: "1", name: 'John Doe' };
        expect(user).toHaveProperty("id", "1");
        expect(user).toHaveProperty("name", "John Doe");
    });
});