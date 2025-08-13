   //1
   import {Router} from 'express';
   import { getAllDrivers, getDriverById, createNewDriver, deleteDriver, UpdateDriver } from './driver.controller.js';

    const driverRouter = Router();
  
    // CRUD operations for drivers
    driverRouter
    .post('/',  createNewDriver) // create new driver
    .get('/', getAllDrivers)  // Read all drivers
    .put('/:id',UpdateDriver  ) // update driver by id
    .delete('/:id',  deleteDriver) // delete driver by id
    .get('/:id', getDriverById) // Read driver by id

    export default driverRouter;