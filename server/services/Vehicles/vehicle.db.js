
/*
findAllDrivers
findSpecificDriver
AddDriverToDB
DeleteDriverFromDB
*/
import { MongoClient, ObjectId } from "mongodb";
import {__dirname} from '../../globals.js';
import path from 'path';

export async function GetAllVehicles(){
   let client =null;
   try{
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection("Vehicles").find({}).toArray();
   } catch (error) {
    console.error("Error Find all vehicles in database:", error);
    throw error;
   } finally{
    if(client){
        client.close();
    }
   }
}

export async function GetSpecificVehicle(id){
    console.log("Searching vehicle id:", id); // בדיקה
    let client =null;
    try{
     client = await MongoClient.connect(process.env.CONNECTION_STRING);
     const db = client.db(process.env.DB_NAME);
     return await db.collection("Vehicles").findOne({_id: ObjectId.createFromHexString(id)});
    } catch (error) {
     console.error("Error Find name vehicles in database" , error);
     throw error;
    } finally{
     if(client){
         client.close();
     }
    }    
}
export async function GetSpecificVehicleByName(name){
    console.log("Searching vehicle name:", name); // בדיקה
    let client =null;
    try{
     client = await MongoClient.connect(process.env.CONNECTION_STRING);
     const db = client.db(process.env.DB_NAME);
     return await db.collection("Vehicles").findOne({name});
    } catch (error) {
     console.error("Error Find name vehicles in database" , error);
     throw error;
    } finally{
     if(client){
         client.close();
     }
    }    
}

export async function AddVehicleToDB(vehicle){
     let client = null;
     try{
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection("Vehicles").insertOne(vehicle);
        return result;
     } catch (error) {
        console.error("Error adding vehicle to database");
        throw error;
     } finally{
        if(client){
            client.close();
        }
     }
}
export async function UpdateVehicleInDatabase(vehicle, id) {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        let db = client.db(process.env.DB_NAME);
        return await db.collection('Vehicles').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: vehicle });
    } catch (error) {
        console.error("Error updating Vehicle in database:", error);
        throw error;
    }
    finally {
        if (client)
            client.close();
    }
}

export async function DeleteVehicleInDatabase(id) {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        let db = client.db(process.env.DB_NAME);
        return await db.collection('Vehicles').deleteOne({ _id: ObjectId.createFromHexString(id) });
    } catch (error) {
        console.error("Error deleting Vehicle in database:", error);
        throw error;
    }
    finally {
        if (client)
            client.close();
    }
}