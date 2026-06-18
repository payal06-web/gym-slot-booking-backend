import Booking from "../models/Booking.js";
import Slot from "../models/Slot.js";

export const createBooking = async (req, res) => {
  const { slotId, date } = req.body;

  const count = await Booking.countDocuments({ slotId, date });
  const slot = await Slot.findById(slotId);

  if (count >= slot.maxCapacity) {
    return res.status(400).json({ msg: "Slot Full" });
  }

  const booking = await Booking.create(req.body);
  res.json(booking);
};

export const getCrowd = async (req, res) => {
  try {
    const { slotId } = req.params;

    const bookings = await Booking.find({ slotId });
    const total = bookings.length;

    const slot = await Slot.findById(slotId);

    // ✅ IMPORTANT FIX
    if (!slot) {
      return res.status(404).json({
        msg: "Slot not found",
        total: 0,
        level: "Low"
      });
    }

    let level = "Low";
    if (total > 20) level = "High";
    else if (total > 10) level = "Medium";

    res.json({
      total,
      level
    });

  } catch (err) {
    console.log("CROWD ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};