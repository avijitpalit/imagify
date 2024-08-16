import mongoose from 'mongoose';

const CONN_STR = process.env.MONGODB_URI

if (!CONN_STR) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose
if(!cached) cached = global.mongoose = {conn: null, promise: null}

const connectDB = async () => {
    if(cached.conn) return cached.conn
    if(!cached.promise){
        const opts = {dbName: 'imagify', bufferCommands: false}
        cached.promise = mongoose.connect(CONN_STR, opts).then(mongoose => { return mongoose })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB