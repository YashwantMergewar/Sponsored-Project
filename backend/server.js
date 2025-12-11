import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'
const app = express();
app.use(cors());
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes)

app.listen(3000, ()=> {
    console.log("Backend Server starts successfully...");
})