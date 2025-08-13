import bcrypt from "bcryptjs";
import { ROLES } from '../../globals.js';
import { getAll, createUser, getUserByEmail, updateUserInDatabase, deleteUserInDatabase } from "./users.db.js";

export default class User {
    constructor({ name, email, password, role = ROLES.USER }) {
        this.name = name;
        this.email = email;
        this.password = bcrypt.hashSync(password, 15); // Hash the password before saving
        this.role = role; // Default role is 'user'
    }

    static async getAllUsers() {
        try {
           let users = await getAll();
           users.forEach(user => delete user.password); // Remove password from each user object
           return users; // Return the array of user objects without passwords
        } catch (error) {
            throw new Error('An error occurred while fetching users.');
        }
    }

    static async login(email, password) {
        try {
            let user = await getUserByEmail(email);
            if (!user || bcrypt.compareSync(password, user.password) === false) {
                return null;
            }
            delete user.password; // Remove password from user object before returning
            return user; // Return the user object without the password
        } catch (error) {
            throw new Error('An error occurred while fetching the user.');
        }
    }

    async save() {
        try {
            return await createUser(this);
        }
        catch (error) {
            throw new Error('An error occurred while saving the user.');
        }
    }

    async update(id) {
        try {
            return await updateUserInDatabase(this, id); // updating in a database
        } catch (error) {
            throw new Error('An error occurred while updating the User.');
        }
    }
    static async delete(id) {
        try {
            return await deleteUserInDatabase(id); // deleting from a database
        } catch (error) {
            throw new Error('An error occurred while deleting the User.');
        }
    }
}