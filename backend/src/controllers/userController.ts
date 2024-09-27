import { Request, Response } from 'express';
import { User } from '../models/userModel';
import db from '../utils/db';

export class UserController {
    // Get all users
    public static getUsers(req: Request, res: Response): void {
        db.all('SELECT * FROM users', (err: Error, rows: any[]) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({ data: rows });
          });
    }

    // Get a user by id
    public static getUserById(req: Request, res: Response): void {
        const { id } = req.params;
        db.get('SELECT * FROM users WHERE id = ?', [id], (err: Error, row: any) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          if (row === undefined) {
            res.status(404).json({ error: 'User not found' });
            return;
          }
          res.json({ data: row });
        });
    }

    // Create a new user
    public static createUser(req: Request, res: Response): void {
        const user: User = req.body;
        if (user.id === undefined || user.name === undefined) {
          res.status(400).json({ error: 'Please provide an id and name' });
          return;
        }
        db.run('INSERT INTO users (id, name) VALUES (?, ?)', [user.id, user.name], (err: Error | null) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.status(201).json({ message: 'User added' });
        });
    }

    // Delete a user
    public static deleteUser(req: Request, res: Response): void {
        const { id } = req.params;
        db.run('DELETE FROM users WHERE id = ?', [id], function(this: any, err: Error | null) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          if (this.changes === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
          }
          res.status(200).json({ message: 'User deleted' });
        });
    }
}

export default UserController;