import { UserService } from './userService';
import db from '../utils/db';
import { User } from '../models/userModel';

jest.mock('../utils/db');

describe('UserService', () => {
    describe('getAllUsers', () => {
        it('should return all users when there is no error', (done) => {
            const mockUsers: User[] = [
                { id: '1', name: 'John Doe' },
                { id: '2', name: 'Jane Doe' }
            ];

            (db.all as jest.Mock).mockImplementation((query: string, callback: (err: Error | null, rows: any[]) => void) => {
                callback(null, mockUsers);
            });

            UserService.getAllUsers((err, users) => {
                expect(err).toBeNull();
                expect(users).toEqual(mockUsers);
                done();
            });
        });

        it('should return an error when there is a database error', (done) => {
            const mockError = new Error('Database error');

            (db.all as jest.Mock).mockImplementation((query: string, callback: (err: Error | null, rows: any[]) => void) => {
                callback(mockError, []);
            });

            UserService.getAllUsers((err, users) => {
                expect(err).toEqual(new Error(`Error retrieving users: ${mockError.message}`));
                expect(users).toBeUndefined();
                done();
            });
        });
    });
});