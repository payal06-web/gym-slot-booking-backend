import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  time: String,
  maxCapacity: Number
});

export default mongoose.model("Slot", slotSchema);