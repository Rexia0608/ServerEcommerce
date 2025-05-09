import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const db = new pg.Client({
    user: process.env.DbUser,
    host: process.env.DbHost,
    database: process.env.DbName,
    password: process.env.DbPass,
    port: process.env.DbPort
});

db.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));


export default db;


