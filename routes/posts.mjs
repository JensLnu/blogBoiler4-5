import express from "express";
import fs from 'fs'
import { getPostAndIndex } from "../middelware/getPostId.mjs";
import { posts } from "../app.mjs";
import { pathToPosts } from "../app.mjs";
import { nanoid } from "nanoid";

const router = express.Router();

const updateDb = () => {
    fs.writeFileSync(pathToPosts, JSON.stringify(posts, null, 2), 'utf8');
}

router.post("/post", (request, response) => {
    const { body } = request;
    let requestPostId = { id: nanoid(), ...body };
    posts.push(requestPostId);
    updateDb()
    return response.status(201);
});


router.get("/post/:id", getPostAndIndex, (request, response) => {
    const post = request.post;
    response.render("detail", { post })
});

router.put("/post/:id", getPostAndIndex, (request, response) => {
    const { body } = request;
    posts[request.postIndex] = { id: request.post.id, ...body }
    updateDb()
    return response.sendStatus(200);
});

router.patch("/post/:id", getPostAndIndex, (request, response) => {
    const { body } = request;
    posts[request.postIndex] = { ...posts[request.postIndex], ...body }
    updateDb()
    return response.sendStatus(200);
});

router.delete("/post/:id", getPostAndIndex, (request, response) => {
    posts.splice(request.postId, 1);
    updateDb()
    return response.status(204).send({ msg: `You deleted post with header: ${posts[request.postId]}` });
});

export { router as postRouter };

// att göra
// validering av inputs