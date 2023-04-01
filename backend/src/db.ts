import { MONGO_URI} from "./config";
import mongoose from "mongoose";

export async function connectDB(){
    try {
        mongoose.set('strictQuery',true)
        const db= await mongoose.connect(MONGO_URI)
        console.log('Connected to ', db.connection.name)
    } catch (error) {
        console.log(error)
    }
}