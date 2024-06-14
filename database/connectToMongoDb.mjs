import mongoose from "mongoose"

const dbUrl = "mongodb://localhost:27017/gbgBlogBoiler"

let connectToMongoDB = () => {
    try {
        mongoose.connect(dbUrl)
        console.log(`Database: MongoDB is connected...`)
    }
    catch (error) {
        console.error(error)
    }
}

export { connectToMongoDB }