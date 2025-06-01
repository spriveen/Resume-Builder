require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin:process.env.CLIENT_URL ||"",
        methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Database Connection
 connectDB();


//  Middeleware
app.use(express.json());

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
