import { Router } from 'express';
import { upload } from '../../globals.js';
// Upload router

const uploadRouter = Router();

uploadRouter
    .post('/single', upload.single('file') , async (req ,res) =>{
        console.log('file -->',req.file);
        res.end('file uploaded successfully');
        // try {
        //     if (!req.file) {
        //         return res.status(400).json({ message: 'No file uploaded' });
        //     }
        //     return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
        // } catch (error) {
        //     return res.status(500).json({ message: 'Error uploading file', error });
        // }
    })
    .post('/files' , upload.array('files',5) , async (req ,res) =>{
        
        console.log('files -->',req.files);
        res.end('files uploaded successfully');
    })


export default uploadRouter;