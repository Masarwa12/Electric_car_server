//3 
import { GetAllVehicles, GetSpecificVehicle, AddVehicleToDB, UpdateVehicleInDatabase, DeleteVehicleInDatabase, GetSpecificVehicleByName } from "./vehicle.db.js";
import { writeFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import { __dirname } from '../../globals.js';
import path from 'path';



export default class Vehicle {
    constructor(NameVehicle, modelVehicle, typeVehicle, yearVehicle) {
        
        this.NameVehicle = NameVehicle;
        this.modelVehicle = modelVehicle;
        this.typeVehicle = typeVehicle;
        this.yearVehicle = yearVehicle;    
    }
   
    static async AllVehicles() {
       try{
           let vehicles = await GetAllVehicles();
           return vehicles;
       }catch(error){
           throw new Error('An error occurred while fetching vehicles.');
       }
    }

    static async findVehicle(id) {
        return await GetSpecificVehicle(id);
    }

    static async findVehicleByName(name) {
        return await GetSpecificVehicleByName(name);
    }
    // async AddVehicle() {
    //     return await AddVehicleToDB(this);
    // }
     async AddVehicle(){
        try{
            let vehicle = await AddVehicleToDB(this);
            return vehicle;
        }catch(error){
            throw new Error('An error occurred while adding vehicle.');
        }
     }
     async update(id) {
        try {
            return await UpdateVehicleInDatabase(this, id); // updating in a database
        } catch (error) {
            throw new Error('An error occurred while updating the Vehicle.');
        }
    }
              
    static async delete(id) {
        try {
            return await DeleteVehicleInDatabase(id);
        } catch (error) {
            throw new Error('An error occurred while deleting the Vehicle.');
        }
    }
}