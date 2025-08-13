 //2
import { ObjectId } from 'mongodb';
import Station from './station.model.js';

 export async function getAllStations(req, res) {
    let stations = await Station.AllStations();
    if(!stations) {
        return res.status(404).json({ message: 'No stations found' });
    }
    return res.status(200).json({message: 'Stations found', stations});
 }

 export async function getStationByid(req, res) {
        let {id} = req.params;

        let station = await Station.findStationByid(id);

        if(!station) {
            return res.status(404).json({ message: 'Station not found' });
        }
        return res.status(200).json({message: 'Station found', station});
 }

export async function createNewStation(req ,res ){    
    let {name,location,chargingStations} = req.body;
    
    if(!name || !location || !chargingStations) {
        return res.status(400).json({ message: ' name and location and chargingStations are required' });
    }

    let station = new Station( name, location , chargingStations);

    let stationExists = await Station.findStationByName(name);
    if(stationExists) {
        return res.status(409).json({ message: 'Station already exists' });
    }        
     await station.AddStation();

    return res.status(201).json({message: 'Station created', station});
 }

 export async function updateStation(req, res) {
     let { id } = req.params;
     let { name, location, chargingStations } = req.body;
     //בדיקה על הפרמטרים שהתקבלו
     if (!id) {
         return res.status(400).json({ error: 'Station ID is required.' });
     }
     if (!ObjectId.isValid(id)) {
         return res.status(400).json({ error: 'Invalid Station ID.' });
     }
     if (!name || !location || !chargingStations) {
         return res.status(400).json({ error: 'All fields are required.' });
     }
     //יצירת אובייקט תחנה חדש
     const updatedStation = new Station(name, location, chargingStations );
         console.log('Updating Station with ID:', id, 'and data:', updatedStation);
 
     //בקשה לעדכון תחנה קיים
     try {
         const result = await updatedStation.update(id);
         return res.status(200).json(result);
     } catch (error) {
         return res.status(500).json({ error: 'An error occurred while updating the Station.' });
     }
 }
 export async function deleteStation(req, res) {
     let { id } = req.params;
     //בדיקה על הפרמטר שהתקבל
     if (!id) {
         return res.status(400).json({ error: 'Station ID is required.' });
     }
     if (!ObjectId.isValid(id)) {
         return res.status(400).json({ error: 'Invalid Station ID.' });
     }
     //בקשה למחיקת תחנה
     try {
         const result = await Station.deleteStation(id);
         return res.status(200).json(result);
     } catch (error) {
         return res.status(500).json({ error: 'An error occurred while deleting the Station.' });
     }
 }

   
 

