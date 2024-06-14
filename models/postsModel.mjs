import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: false
    },
    postedBy: {
        type: String,
        required: true
    },
    postedByImage: {
        type: String,
        required: false
    },
    postDate: {
        type: Date,
        required: false
    },
    postedByImage: {
        type: String,
        required: false
    }
})

const postModel = mongoose.model("books", bookSchema)

export { postModel }