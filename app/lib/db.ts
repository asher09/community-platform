import mongoose from "mongoose";

const connectDB = async () => {
        try {
            const dbUrl = process.env.DATABASE_URL;
            if (!dbUrl) {
                throw new Error("DATABASE_URL environment variable is not defined");
            }
            await mongoose.connect(dbUrl);
            console.log('Database connected successfully');
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
};

export default connectDB;

