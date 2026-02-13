import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; 
import authRoutes from "./routes/authRoutes.js";

console.log("Backend check = running");

const app = express();
const PORT = 3000;
dotenv.config();

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("HEADERS:", req.headers["content-type"]);
//   console.log("BODY:", req.body);
//   next();
// });

app.use(cors({ // demo purposes, * means any endpoint can access the backend and methods
    origin: "*",
    methods: ["GET", "POST"]
}));
app.use("/api/auth", authRoutes);

// http://localhost:3000/api/auth/register

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on PORT: ${PORT}`);
});