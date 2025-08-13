import { Router } from 'express';
import { isAdmin } from '../../middleware/auth.js';
import { getAllUsers, addUser, login, updateUser, deleteUser } from './users.controller.js';

const usersRouter = Router();

// CRUD operations for users
usersRouter
.post('/', addUser) //create user
.get('/', getAllUsers) //Read all users
.put('/:id', updateUser) // update user
.delete('/:id', deleteUser) // delete user 
.post('/login', login) // login user

// Export the router
export default usersRouter;