import express from "express";
import { getPost } from "../middelware/getPostId.mjs";
import { posts } from "../app.mjs";

const router = express.Router();

router.post("/post", (request, response) => {
    const { body } = request;
    let requestPostId = { id: posts[posts.length - 1].id + 1, ...body };
    posts.push(requestPostId);
    return response.status(201);
});

router.get("/post/:id", getPost, (request, response) => {
    console.log(request.post, 'postId')
    const post = request.post;
    response.render("detail", { post })
});

router.put("/post/:id", getPost, (request, response) => {
    const { body } = request;
    posts[request.postId] = { id: posts[request.postId].id, ...body };
    return response.sendStatus(200);
});

router.patch("/post/:id", getPost, (request, response) => {
    const { body } = request;
    posts[request.postId] = { ...posts[request.postId], ...body };
    return response.sendStatus(200);
});

router.delete("/post/:id", getPost, (request, response) => {
    posts.splice(request.postId, 1);
    return response.status(204).send({ msg: `You deleted post with header: ${posts[request.postId]}` });
});

export { router as postRouter };

// att göra
// updatera json filen ist för variablen med POST, PUT, PATCH
// validering av inputs