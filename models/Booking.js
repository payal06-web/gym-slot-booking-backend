import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userName: String,
  slotId: mongoose.Schema.Types.ObjectId,
  date: String
});

export default mongoose.model("Booking", bookingSchema);