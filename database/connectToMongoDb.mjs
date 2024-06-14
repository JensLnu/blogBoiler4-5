import mongoose from "mongoose"

const uri = "mongodb+srv://JensaFixar:wgBSOn9ivoiqvf6d@jensfixar.f1lv3mv.mongodb.net/gbgBlogBoiler?retryWrites=true&w=majority"

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