import jwt from 'jsonwebtoken';
import User from './users.model.js';
import { ObjectId } from 'mongodb';

export async function getAllUsers(req, res) {
    try {
        const users = await User.getAllUsers();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
}

export async function addUser(req, res) {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({ message: 'User created successfully', user: result });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        
        if (user) {
            res.status(200).json({ message: 'Login successful', token: jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' }) });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login.' });
    }
}
export async function updateUser(req, res) {
    let { id } = req.params;
    let { name, email, password, role } = req.body;
    //בדיקה על הפרמטרים שהתקבלו
    if (!id) {
        return res.status(400).json({ error: 'User ID is required.' });
    }
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid User ID.' });
    }
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    //יצירת אובייקט משתמש חדש
    const updatedUser = new User({name, email, password, role} );
        console.log('Updating user with ID:', id, 'and data:', updatedUser);

    //בקשה לעדכון משתמש קיים
    try {
        const result = await updatedUser.update(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
}
export async function deleteUser(req, res) {
    let { id } = req.params;
    //בדיקה על הפרמטר שהתקבל
    if (!id) {
        return res.status(400).json({ error: 'User ID is required.' });
    }
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid User ID.' });
    }
    //בקשה למחיקת משתמש
    try {
        const result = await User.delete(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the User.' });
    }
}