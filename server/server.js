   // 0
   import 'dotenv/config'; //הגדרת השרת לקבלת משתני סביבה מהקובץ .env
   import express from 'express'; 
   import cors from 'cors';
   import morgan from 'morgan';
   import v1Router from './routes/v1.js';  
    import {errorHandler} from './middleware/errorHandler.js';
// set server port
const PORT = process.env.PORT || 5500;

// create server instance
 const server = express();
 
 //middleware
 server.use(cors());
 server.use(morgan('tiny'));


 // add json and form support to server
    server.use(express.json({limit: '50mb'}));
    server.use(express.urlencoded({extended:true}));

    // create v1 router 
    //route-->controller-->model --> db
 server.use('/api/v1', v1Router);

 // error handler
 server.use(errorHandler);
 
// add a test route to check if the server is running

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 