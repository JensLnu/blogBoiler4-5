import express from "express";
import { users } from "../app.mjs";
import { posts } from "../app.mjs";

const router = express.Router();

router.get("/", (request, response) => {
    response.render("index", { users, posts });
});

export {router as landingPageRouter}