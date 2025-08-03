import mongoose from "mongoose";

const MONGO = process.env.DATABASE_URL;

const connectDB = async () => {
        try {
            await mongoose.connect(MONGO)
            console.log('Database connected successfully');
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
};

export default connectDB;

