import mongoose, { Error } from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected At: ${connect.connection.host}`);
  } catch (error: any) {
    console.log(`Error:${error.message}`);
    throw error;
  }
};

export default connectDB;
