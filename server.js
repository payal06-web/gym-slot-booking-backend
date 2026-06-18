import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "https://gym-slot-booking-frontend.vercel.app",
  credentials: true
}));


app.get("/",(req, res)=>{
    return res.send("backend is running")
})

let isConnected = false;
async function connectToMongoDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifielsTopology: true
        });
        isConnected = true;
        console.log("Connected to MongoDB");
    }catch(error){
        console.log('Error connecting to MongoDB', error)
    }
}

app.use((req, res, next)=>{
    if(!isConnected){
        connectToMongoDb();
    }
    next();
})

app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT
app.listen(() => console.log("Server running"));