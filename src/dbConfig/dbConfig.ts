import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
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
    }
}