import { Router } from "express";
import stationRouter from '../services/Stations/station.router.js';
import driverRouter from '../services/Drivers/driver.router.js';
 import vehicleRouter from '../services/Vehicles/vehicle.router.js';
 import uploadRouter from '../services/upload/upload.router.js';
import usersRouter from "../services/users/users.routes.js";

 const v1Router = Router();

 v1Router.use("/driver" , driverRouter);
 v1Router.use("/station", stationRouter);
 v1Router.use("/vehicle", vehicleRouter);
 v1Router.use("/upload" , uploadRouter);
 v1Router.use("/users", usersRouter);

 export default v1Router;