   //1

   import {Router} from 'express';
    import { getAllStations, getStationByid, createNewStation, deleteStation, updateStation } from './station.controller.js';

    const stationRouter = Router();

    stationRouter
    .get('/', getAllStations)
    .get('/:id', getStationByid)
    .post('/', createNewStation)        
    .put('/:id', updateStation)
    .delete('/:id', deleteStation)

    export default stationRouter;