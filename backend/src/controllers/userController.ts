import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { UserService } from '../services/userService';

export class UserController {
    // Get all users
    public static getUsers(req: Request, res: Response): void {
          UserService.getAllUsers((err: Error | null, users?: User[]) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            if (!users) {
              res.status(404).json({ error: 'No users found' });
              return;
            }
            res.json({ data: users });
        });
    }

    // Get a user by id
    public static getUserById(req: Request, res: Response): void {
        UserService.getUserById(req.params.id, (err: Error | null, user?: User) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
          }
          res.json({ data: user });
        });
    }

    // Create a new user
    public static createUser(req: Request, res: Response): void {
      const user: User = req.body;
      if (user.id === undefined || user.name === undefined) {
        res.status(400).json({ error: 'Please provide an id and name' });
        return;
      }
      UserService.createUser(user, (err: Error | null, changes?: number) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if(changes === 0) {
          res.status(400).json({ error: 'User already exists' });
          return;
        }
        res.status(201).json({ message: 'User added'});
      });
    }

    // Delete a user
    public static deleteUser(req: Request, res: Response): void {
        const { id } = req.params;
        UserService.deleteUser(id, (err: Error | null, changes?: number) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          if (changes === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
          }
          res.status(200).json({ message: 'User deleted' });
        });
    }
}

export default UserController;