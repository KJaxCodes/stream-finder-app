import mongoose from "mongoose";
import type { Mongoose } from "mongoose";

console.log("NODE ENV: ", process.env.NODE_ENV);


type CachedConnectionObject = {
  connection: Mongoose | null;
  connectionPromise: Promise<Mongoose> | null;
}

declare global {
  var mongooseCache: CachedConnectionObject | undefined;
}


let cachedConnectionObject: CachedConnectionObject = global.mongooseCache ?? { connection: null, connectionPromise: null };

export async function connect(): Promise<Mongoose> {

    const MONGO_URI = process.env.MONGO_URI;
    console.log("MONGO_URI:", MONGO_URI);

    if (!MONGO_URI && (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production")) {
        throw new Error("Please define the MONGO_URI environment variable inside .env.local");
    }
    try {
        // check of a cached connection exists 
        if (cachedConnectionObject.connection) {
            return cachedConnectionObject.connection;
        }

        if (!cachedConnectionObject.connectionPromise) {
            cachedConnectionObject.connectionPromise = mongoose.connect(MONGO_URI!);
        }

        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongoose connected successfully');
        });
        connection.on('error', (err) => {
            console.log('Mongoose connection error. Please make sure MongoDB is running:', err);
            process.exit();
        });

        cachedConnectionObject.connection = await cachedConnectionObject.connectionPromise;
        return cachedConnectionObject.connection;
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw error;
    }
}