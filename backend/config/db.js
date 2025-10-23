import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

if(conn){
    console.log("DB starts successfully");
}

export default conn;