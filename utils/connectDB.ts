import mongoose from "mongoose";

export const config = {
  runtime: 'edge', // this is a pre-requisite
  regions: ['iad1'], // only execute this function in iad1
};

export default async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("connected to DB");
  } catch (error) {
    console.log("there is error to connect DB");
  }
}
