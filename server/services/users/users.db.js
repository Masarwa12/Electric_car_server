import { MongoClient, ObjectId } from "mongodb";

export async function getAll() {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        return await db.collection("Users").find({}).toArray();
    } catch (error) {
        console.error("Error updating User in database:", error);
        throw error;
    }
    finally {
        if (client) {
            client.close();
        }
    }
}

export async function getUserByEmail(email) {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        return await db.collection("Users").findOne({ email });
    } catch (error) {
        console.error("Error fetching user by email from database:", error);
        throw error;
    } finally {
        if (client) {
            client.close();
        }
    }
}


export async function createUser(user) {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection("Users").insertOne(user);
        return result;
    } catch (error) {
        console.error("Error creating user in database:", error);
        throw error;
    } finally {
        if (client) {
            client.close();
        }
    }
}
export async function updateUserInDatabase(user, id) {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        let db = client.db(process.env.DB_NAME);
        return await db.collection('Users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: user });
    } catch (error) {
        console.error("Error updating user in database:", error);
        throw error;
    }
    finally {
        if (client)
            client.close();
    }
}

export async function deleteUserInDatabase(id) {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        let db = client.db(process.env.DB_NAME);
        return await db.collection('Users').deleteOne({ _id: ObjectId.createFromHexString(id) });
    } catch (error) {
        console.error("Error deleting user in database:", error);
        throw error;
    }
    finally {
        if (client)
            client.close();
    }
}

