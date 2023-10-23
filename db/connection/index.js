import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbConnection = () => {
    return mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successful database connection.");
    })
    .catch((error) => {
        console.error("Connection error:", error);
        throw new Error("Connection error has occurred when trying to connect to the database!");
    });
};

export default dbConnection;