import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log(`Connected To Mongo Database`);
  } catch (error) {
    console.error(`Couldn't Connect to Database`);
    process.exit(1);
  }
};

export default connectToDataBase;
