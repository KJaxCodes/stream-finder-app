import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

// Connect to MongoDB

export async function connect(): Promise<void> {
    try {
        await mongoose.connect(MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongoose connected successfully');
        });
        connection.on('error', (err) => {
            console.log('Mongoose connection error. Please make sure MongoDB is running:', err);
            process.exit();
        });
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw error;
    }
}