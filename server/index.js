import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import appRouter from "./routes/app_route.js";

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: (origin, callback) => {
        // Allow all origins
        callback(null, true);
    },
    credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.use("/api/v1", appRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})