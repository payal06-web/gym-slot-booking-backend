import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config()

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use(cors({
  origin: "https://gym-slot-booking-frontend.onrender.com",
  credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/",(req, res)=>{
   return res.send("backend is running")
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});