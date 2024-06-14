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
        type: String,
        required: true
    },
    postImg: {
        type: String,
        required: false
    },
    commentsOnPost: {
        type: Array,
        required: false
    },
    likes: {
        type: Number,
        required: true
    },
    sharded: {
        type: Number,
        required: true
    }
})

const postModel = mongoose.model("posts", postSchema)

export { postModel }