import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router.js"


dotenv.config();
const app = express();
const port = process.env.ServerPort; 

// Middleware
app.use(cors());
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });