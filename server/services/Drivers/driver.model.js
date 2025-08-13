//3 
import { GetAllDrivers , GetSpecificDriver,AddDriverToDB, DeleteDriverFromDB, UpdateDriverInDatabase, GetSpecificDriverByID } from "./driver.db.js"; 

export default class Driver {
    constructor(name,email ,phone,DOB){
        
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.DOB = DOB;
    }

    static async AllDrivers(){
        try{
            let drivers = await GetAllDrivers();
            return drivers;
        }catch(error){
            throw new Error('An error occurred while fetching drivers.');
        }    
    }

    static async findDriver(email){
         return await GetSpecificDriver(email);
    }
     static async findDriverByid(id){
            return await GetSpecificDriverByID(id);
        }
   
    async AddDriver(){
        try{
             let driver = await AddDriverToDB(this);
             return driver;
        }catch(error){
            throw new Error('An error occurred while adding driver.');
        }      
    }
          
     async update(id){
       try{
          return await UpdateDriverInDatabase(this,id);          
    }catch(error){
            throw new Error('An error occurred while updating the driver.');
        }
    }
   static async delete(id){
        try{
            return await DeleteDriverFromDB(id);
        }catch(error){
            throw new Error('An error occurred while deleting the driver.');
        }
    }
}