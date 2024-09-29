import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`MongoDb Connected!!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed!", error);
        process.exit(1);
    }
}

export default connectDb;