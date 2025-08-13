   //1

   import {Router} from 'express';
import { getAllVehicles, createNewVehicle, updateVehicle, deleteVehicle, getVehicleByid } from './vehicle.controller.js';
   
      function logger(req ,res,next){
         console.log('Request URL:', req.originalUrl);
         console.log('Request Method:', req.method);
         next();
      }

const VehicleRouter = Router();

    VehicleRouter
   //  .get('/',logger, getAllVehicles) 
   .get('/',logger, getAllVehicles) 
    .get('/:id', getVehicleByid)
    .post('/',  createNewVehicle)
    .put('/:id', updateVehicle )
    .delete('/:id', deleteVehicle )

    export default VehicleRouter;