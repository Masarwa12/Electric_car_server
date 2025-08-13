import { MongoClient, ObjectId } from 'mongodb';

export async function GetAllDrivers(){
     let client = null;
     try{
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        return await db.collection("Drivers").find({}).toArray();
     } catch (error) {
        console.error("Error Find all drivers in database:", error);
        throw error;
     } finally{
        if(client){
            client.close();
        }
     }
}

export async function GetSpecificDriver(email){
      let client =null;
      try{
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        return await db.collection("Drivers").findOne({email});
      } catch (error) {
        console.error("Error Find name drivers in database" , error);
        throw error;
      } finally{
        if(client){
          client.close();
          }
      }
}
export async function GetSpecificDriverByID(id){
    console.log("Searching Driver name:", id); // בדיקה
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        return await db.collection("Drivers").findOne({_id: ObjectId.createFromHexString(id)});
    } catch (error) {
        console.error("Error Find name Drivers in database" , error);
        throw error;
    } finally{
        if(client){
            client.close();
        }
    }
}

export async function AddDriverToDB(driver){
    let client = null ;
    try{
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection("Drivers").insertOne(driver);
        return result;
    } catch (error) {
        console.error("Error adding driver to database");
        throw error;
    } finally{
        if(client){
            client.close();
        }

    }
}
export async function UpdateDriverInDatabase(driver, id) {
    let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        let db = client.db(process.env.DB_NAME);
        return await db.collection('Drivers').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: driver });
    } catch (error) {
        console.error("Error updating driver in database:", error);
        throw error;
    } finally {
        if (client) {
            client.close();
        }
    }
  }
export async function DeleteDriverFromDB(id){
let client = null;
    try {
        client = await MongoClient.connect(process.env.CONNECTION_STRING);
        let db = client.db(process.env.DB_NAME);
        return await db.collection('Drivers').deleteOne({ _id: ObjectId.createFromHexString(id) });
    } catch (error) {
        console.error("Error deleting Driver in database:", error);
        throw error;
    }
    finally {
        if (client)
            client.close();
    }
}