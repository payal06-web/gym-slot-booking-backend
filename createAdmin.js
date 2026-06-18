import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("shyamji", 10);

  await User.create({
    name: "Pihu",
    email: "pihu@p.com",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin Created 🔥");
  process.exit();
};

createAdmin();