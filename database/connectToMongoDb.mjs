import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGODB_URL;



// fungerar lokalt 
// const uri = "mongodb://127.0.0.1:27017/gbgBlogBoiler"

let connectToMongoDB = () => {
    try {
        mongoose.connect(uri)
        console.log(`Database: MongoDB is connected...`)
    }
    catch (error) {
        console.error(error)
    }
}

export { connectToMongoDB }