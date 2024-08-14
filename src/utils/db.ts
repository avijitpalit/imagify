import mongoose from "mongoose";

export const DBConnect = async () => {
    mongoose.connect(process.env.MONGODB_URI!, {dbName: 'imagify', bufferCommands: false})
}