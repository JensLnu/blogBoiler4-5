import express from "express";
import { userModel } from "../models/userModel.mjs";
import { postModel } from "../models/postModel.mjs";

// OLD NEWS tidigare från JSON filen nu från mongoDb
// import { users } from "../app.mjs";
// import { posts } from "../app.mjs";

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        let posts = await postModel.find()
        console.log(posts, 'posts')
        let users = await userModel.find()
        response.render("index", { users, posts });
    }
    catch (error) {
        response.status(500).send(error)
        console.log(error, 'error')
    }
});

export { router as landingPageRouter }