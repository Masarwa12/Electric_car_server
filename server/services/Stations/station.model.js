//3 

import{GetAllStations , GetSpecificStation,AddStationToDB, deleteStationInDatabase, updateStationInDatabase, GetSpecificStationByName} from './station.db.js';

export default class Station {
    constructor(name,location ,chargingStations){
        
        this.name = name;
        this.location = location;
        this.chargingStations = chargingStations;
    }

    static async AllStations(){
        try{
            let stations = await GetAllStations();
            return stations;
        }catch(error){
            throw new Error('An error occurred while fetching stations.');
        }
    }
   static async findStationByName(name){
        return await GetSpecificStationByName(name);
    }
    static async findStationByid(id){
        return await GetSpecificStation(id);
    }
 
    async AddStation(){
      try{
        let station = await AddStationToDB(this);
        return station;
      }catch(error){
        throw new Error('An error occurred while adding station.');
        }
    }
      
     async update(id) {
            try {
                return await updateStationInDatabase(this, id); // updating in a database
            } catch (error) {
                throw new Error('An error occurred while updating the Station.');
            }
        }
    
    static async deleteStation(id){
        return await deleteStationInDatabase(id);
    }
}