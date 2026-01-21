import express from "express";
import dotenv from "dotenv";
import connectDB from "../backEnd/config/db.js";

    const app = express();
    const PORT = 3000;

      dotenv.config();
      app.use(express.json());

      app.listen(PORT, () => {
        // GET -> fetch, name var name = "Abelardo"
        // POST -> logic, if username = "Abelardo", password = "123" alert login success
        connectDB();
        console.log(`Server is Running on PORT: ${PORT}`);
      });
