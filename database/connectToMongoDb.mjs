import mongoose from "mongoose"

// const dbUrl = "mongodb+srv://davidheidari2:9GD3YTPcU8s2i3LE@superheroes.bydwz4d.mongodb.net/"
const dbUrl = "mongodb://127.0.0.1:27017/gbgBlogBoiler"

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