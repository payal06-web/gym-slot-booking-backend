import express from "express";
import Slot from "../models/Slot.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, async (req, res) => {
  const slot = await Slot.create(req.body);
  res.json(slot);
});

router.get("/", async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
});

router.delete("/:id", protect, adminOnly, async(req,res)=>{
    await Slot.findByIdAndDelete(req.params.id);
    res.json({message: "Delete"})
})

router.put("/:id", protect, adminOnly, async(req,res)=>{
    const slot = await Slot.findByIdAndUpdate(
        req.params.id,
        rea.body,
        {new :true}
    );
    res.json(slot);
});

export default router;