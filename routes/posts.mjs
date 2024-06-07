import express from "express";
import { getPostId } from "../middelware/getPostId.mjs";
import { posts } from "../app.mjs";

const router = express.Router();

router.post("/post", (request, response) => {
    const { body } = request;
    let requestPostId = { id: posts[posts.length - 1].id + 1, ...body };
    posts.push(requestPostId);
    return response.status(201);
});

router.get("/post/:id", getPostId, (request, response) => {
    const post = posts[request.postId];
    post ? response.render("detail", { post }) :
        response.status(404).send("Post not found!");
});

router.put("/post/:id", getPostId, (request, response) => {
    const { body } = request;
    posts[request.postId] = { id: posts[request.postId].id, ...body };
    return response.sendStatus(200);
});

router.patch("/post/:id", getPostId, (request, response) => {
    const { body } = request;
    posts[request.postId] = { ...posts[request.postId], ...body };
    return response.sendStatus(200);
});

router.delete("/post/:id", getPostId, (request, response) => {
    posts.splice(request.postId, 1);
    return response.status(204).send({ msg: `You deleted post with header: ${posts[request.postId]}` });
});

export { router as postRouter };

// att göra
// updatera json filen ist för variablen med POST, PUT, PATCH
// validering av inputs