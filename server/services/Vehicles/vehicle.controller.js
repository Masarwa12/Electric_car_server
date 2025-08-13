 //2
import { ObjectId } from "mongodb";
import Vehicle from "./vehicle.model.js";

 export async function getAllVehicles(req, res) {
    let vehicles = await Vehicle.AllVehicles();
    if(!vehicles) {
        return res.status(404).json({ message: 'No Vehicle found' });
    }
    return res.status(200).json({message: 'Vehicles found', vehicles});
 }

 export async function getVehicleByid(req, res) {
        let {id} = req.params;

        let vehicle = await Vehicle.findVehicle(id);
        if(!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        return res.status(200).json({message: 'Vehicle found', vehicle});        
 }

export async function createNewVehicle(req ,res ){
    let { NameVehicle , modelVehicle , typeVehicle , yearVehicle} = req.body;

    if( !NameVehicle || !modelVehicle || !typeVehicle || !yearVehicle) {
        return res.status(400).json({ message: ' numberVehicle and NameVehicle and modelVehicle and typeVehicle and yearVehicle are required' });
    }
    let vehicle = new Vehicle( NameVehicle , modelVehicle , typeVehicle , yearVehicle);
    let vehicleExists = await Vehicle.findVehicleByName(NameVehicle);
    if(vehicleExists) {
        return res.status(409).json({ message: 'Vehicle already exists' });
    }
        
     await vehicle.AddVehicle();
     return res.status(201).json({message: 'Vehicle created', vehicle});
   
 }
  export async function updateVehicle(req, res) {
      let { id } = req.params;
      let { NameVehicle, modelVehicle, typeVehicle, yearVehicle } = req.body;
      //בדיקה על הפרמטרים שהתקבלו
      if (!id) {
          return res.status(400).json({ error: 'Vehicle ID is required.' });
      }
      if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid Vehicle ID.' });
      }
      if (!NameVehicle || !modelVehicle || !typeVehicle || !yearVehicle) {
          return res.status(400).json({ error: 'All fields are required.' });
      }
      //יצירת אובייקט רכב חדש
const updatedVehicle = new Vehicle( NameVehicle, modelVehicle, typeVehicle, yearVehicle);
          console.log('Updating Vehicle with ID:', id, 'and data:', updatedVehicle);
  
      //בקשה לעדכון רכב קיים
      try {
          const result = await updatedVehicle.update(id);
          return res.status(200).json(result);
      } catch (error) {
          return res.status(500).json({ error: 'An error occurred while updating the Vehicle.' });
      }
  }
  export async function deleteVehicle(req, res) {
      let { id } = req.params;
      //בדיקה על הפרמטר שהתקבל
      if (!id) {
          return res.status(400).json({ error: 'Vehicle ID is required.' });
      }
      if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid Vehicle ID.' });
      }
      //בקשה למחיקת רכב
      try {
          const result = await Vehicle.delete(id);
          return res.status(200).json(result);
      } catch (error) {
          return res.status(500).json({ error: 'An error occurred while deleting the Vehicle.' });
      }
  }


