import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'
import voterRoutes from './routes/voter.route.js'
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

}));
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/voters', voterRoutes)

app.listen(3000, ()=> {
    console.log("Backend Server starts successfully...");
})