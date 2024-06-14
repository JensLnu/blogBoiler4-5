import mongoose from "mongoose"

// const uri = "mongodb+srv://JensaFixar:wgBSOn9ivoiqvf6d@gbgBlogBoiler.f1lv3mv.mongodb.net/?retryWrites=true&w=majority&appName=JensFixar"
// const uri = "mongodb+srv://davidheidari2:9GD3YTPcU8s2i3LE@gbgBlog.bydwz4d.mongodb.net/"
// const uri = "mongodb+srv://JensaFixar:wgBSOn9ivoiqvf6d@jensfixar.f1lv3mv.mongodb.net/"

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