import express from "express";
import { users } from "../app.mjs";

const router = express.Router();

router.get("/newPost", (request, response) => {
    response.render("newPost", { users });
    
});



export {router as newPost}