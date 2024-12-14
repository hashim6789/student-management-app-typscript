import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri: string = process.env.MONGO_CONNECTION_STRING || "";

if (!mongoUri) {
  console.error("MongoDB connection string is not defined in .env file");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
