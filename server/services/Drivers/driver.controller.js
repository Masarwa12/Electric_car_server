 //2
import { ObjectId } from 'mongodb';
import Driver from './driver.model.js';

 export async function getAllDrivers(req, res) {
    let Drivers = await Driver.AllDrivers();
    if(!Drivers) {
        return res.status(404).json({ message: 'No Drivers found' });
    }
    return res.status(200).json({message: 'Drivers found', Drivers});
 }

 export async function getDriverById(req, res) {
        let {id} = req.params;

        let driver = await Driver.findDriverByid(id);

        if(!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        return res.status(200).json({message: 'Driver found', driver});
 }

export async function createNewDriver(req ,res ){
        
    let {fullName ,email,phone ,DOB} = req.body;

    if( !fullName || !email || !phone || !DOB) {
        return res.status(400).json({ message: ' name and phone and DOB are required' });
    }

    let driver = new Driver(fullName ,email,phone ,DOB);

    let driverExists = await Driver.findDriver(email);
    if(driverExists) {
        return res.status(409).json({ message: 'Driver already exists' });
    }
        
     await driver.AddDriver();

    return res.status(201).json({message: 'Driver created', driver});
 }
  
 export async function UpdateDriver(req ,res){
    let { id } = req.params;
    let { fullName , email , phone , DOB} = req.body;
  //בדיקה על הפרמטרים שהתקבלו
      if (!id) {
          return res.status(400).json({ error: 'User ID is required.' });
      }
      if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid Driver ID.' });
      }
      if (!fullName || !email || !phone|| !DOB) {
          return res.status(400).json({ error: 'All fields are required.' });
      }
      //יצירת אובייקט נהג חדש
      const updatedDriver = new Driver(fullName, email, phone, DOB );
          console.log('Updating Driver with ID:', id, 'and data:', updatedDriver);
  
      //בקשה לעדכון נהג קיים
      try {
          const result = await updatedDriver.update(id);
          return res.status(200).json(result);
      } catch (error) {
          return res.status(500).json({ error: 'An error occurred while updating the user.' });
      }
 }
 
export async function deleteDriver(req, res) {
    let { id } = req.params;
    //בדיקה על הפרמטר שהתקבל
    if (!id) {
        return res.status(400).json({ error: 'Driver ID is required.' });
    }
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Driver ID.' });
    }
    //בקשה למחיקת נהג
    try {
        const result = await Driver.delete(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while deleting the Driver.' });
    }
}
