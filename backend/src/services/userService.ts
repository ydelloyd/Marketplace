import { User } from '../models/userModel';
import db from '../utils/db';

export class UserService {

    public static getAllUsers(callback: (err: Error | null, users?: User[]) => void): void {
        db.all('SELECT * FROM users', (err: Error | null, rows: any[]) => {
            if (err) {
                callback(new Error(`Error retrieving users: ${err.message}`));
            } else {
                callback(null, rows as User[]);
            }
        });
    }

    public static getUserById(userId: string, callback: (err: Error | null, user?: User) => void): void {
        db.get('SELECT * FROM users WHERE id = ?', [userId], (err: Error | null, row: any) => {
            if (err) {
                callback(new Error(`Error retrieving user with ID ${userId}: ${err.message}`));
            } else {
                callback(null, row as User);
            }
        });
    }

    public static createUser(user: User, callback: (err: Error | null, changes?: number) => void): void {
        db.run('INSERT INTO users (id, name) VALUES (?, ?)', [user.id, user.name], function(this: { changes: number }, err: Error | null) {
            if (err) {
                callback(new Error(`Error creating user: ${err.message}`));
            } else {
                callback(null, this.changes);
            }
        });
    }

    public static deleteUser(userId: string, callback: (err: Error | null, changes?: number) => void): void {
        db.run('DELETE FROM users WHERE id = ?', [userId], function(this: { changes: number }, err: Error | null) {
            if (err) {
                callback(new Error(`Error deleting user with ID ${userId}: ${err.message}`));
            } else {
                callback(null, this.changes);
            }
        });
    }

}