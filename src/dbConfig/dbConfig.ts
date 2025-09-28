import mongoose from "mongoose";
import type { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
console.log("MONGO_URI:", MONGO_URI);
console.log("NODE_ENV:", process.env.NODE_ENV);

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

type cachedConnectionObject = {
    connection: Mongoose | null;
    connectionPromise: Promise<Mongoose> | null;
}

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var mongooseCache: cachedConnectionObject | undefined;
}

// Connect to MongoDB

// Use a cached connection if available
let cachedConnectionObject = global.mongooseCache ?? { connection: null, connectionPromise: null };

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    global.mongooseCache = cachedConnectionObject;
}

export async function connect(): Promise<Mongoose> {
    try {
        // check if we have a cached connection
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