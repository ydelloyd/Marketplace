import { Request, Response } from 'express';
import { UserController } from './userController';
import { UserService } from '../services/userService';
import { User } from '../models/userModel';

jest.mock('../services/userService');

describe('UserController.getUsers', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        req = {};
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = {
            status: statusMock,
            json: jsonMock
        };
    });

    it('should return 500 if there is an error', () => {
        const error = new Error('Test error');
        (UserService.getAllUsers as jest.Mock).mockImplementation((callback: (err: Error | null, users?: User[]) => void) => {
            callback(error);
        });

        UserController.getUsers(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ error: error.message });
    });

    it('should return 404 if no users are found', () => {
        (UserService.getAllUsers as jest.Mock).mockImplementation((callback: (err: Error | null, users?: User[]) => void) => {
            callback(null, undefined);
        });

        UserController.getUsers(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ error: 'No users found' });
    });

    it('should return users if found', () => {
        const users: User[] = [{ id: "1", name: 'John Doe' }];
        (UserService.getAllUsers as jest.Mock).mockImplementation((callback: (err: Error | null, users?: User[]) => void) => {
            callback(null, users);
        });

        UserController.getUsers(req as Request, res as Response);

        expect(jsonMock).toHaveBeenCalledWith({ data: users });
    });
});