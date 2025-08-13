 //4
import { MongoClient, ObjectId } from "mongodb";

export async function GetAllStations(){
        let client = null;
        try {
            client = await MongoClient.connect(process.env.CONNECTION_STRING);
            const db = client.db(process.env.DB_NAME);
            return await db.collection("Stations").find({}).toArray();
        } catch (error) {
            console.error("Error Find all stations in database:", error);
            throw error;
        } 
        finally {
            if (client) {
                client.close();
            }
        }           
}

export async function GetSpecificStationByName(name){
     let client = null;
        try {
            client = await MongoClient.connect(process.env.CONNECTION_STRING);
            const db = client.db(process.env.DB_NAME);
            return await db.collection("Stations").findOne({name});              
        } catch (error) {
            console.error("Error Find name stations in database" , error);
            throw error;
        } finally{
            if(client){
                client.close();
            }
        }
}
export async function GetSpecificStation(id){
    console.log("Searching station name:", id); // בדיקה
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        return await db.collection("Stations").findOne({_id: ObjectId.createFromHexString(id)});
    } catch (error) {
        console.error("Error Find name stations in database" , error);
        throw error;
    } finally{
        if(client){
            client.close();
        }
    }
}



export async function AddStationToDB(station){
    let client = null;
     try{
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection("Stations").insertOne(station);
        return result;
     } catch (error) {
        console.error("Error adding station to database");
        throw error;
     } finally{
        if(client){
            client.close();
        }
     }
}
 export async function updateStationInDatabase(station,id){
             let client = null;
             try{
                 client = await MongoClient.connect(process.env.CONNECTION_STRING);
                 const db = client.db(process.env.DB_NAME);
                 return await db.collection('Stations').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: station });
             } catch (error) {
                 console.error("Error updating station in database");
                 throw error;
             }  finally{
                 if(client){
                     client.close();
                 }
             }            
 }

export async function deleteStationInDatabase(id) {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        let db = client.db(process.env.DB_NAME);
        return await db.collection('Stations').deleteOne({ _id: ObjectId.createFromHexString(id) });
    } catch (error) {
        console.error("Error deleting Station in database:", error);
        throw error;
    }
    finally {
        if (client)
            client.close();
    }
}
