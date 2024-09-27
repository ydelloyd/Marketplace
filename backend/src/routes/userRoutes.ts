import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

// Get all users
router.get('/', UserController.getUsers);

// Create a new user
router.post('/', UserController.createUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

// Get a user by id
router.get('/:id', UserController.getUserById);

export default router;