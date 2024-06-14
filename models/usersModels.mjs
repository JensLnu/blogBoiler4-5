import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userPic: {
        type: String,
        required: true
    }
})

const usersModel = mongoose.model("posts", usersSchema)

export { usersModel }