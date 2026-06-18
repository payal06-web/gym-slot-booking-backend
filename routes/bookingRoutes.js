import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getCrowd
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/",protect, createBooking);
router.get("/crowd/:slotId", getCrowd);

export default router;