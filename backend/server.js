import express from 'express';
import cors from 'cors'
import conn from './config/db.js'
const app = express();
app.use(cors());


app.listen(3000, ()=> {
    console.log("Backend Server starts successfully...");
})