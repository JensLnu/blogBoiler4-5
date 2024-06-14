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

const userModel = mongoose.model("users", usersSchema)

export { userModel }