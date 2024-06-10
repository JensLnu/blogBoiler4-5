import express from "express";
import fs from 'fs'
import { getPostAndIndex } from "../middelware/getPostId.mjs";
import { posts } from "../app.mjs";
import { pathToPosts } from "../app.mjs";
import { nanoid } from "nanoid";
import { checkSchema, validationResult } from "express-validator";
import {createPostValidationSchema } from "../validationSchemas/createPostValidationSchema.mjs";
import { getTodaysDate } from "../middelware/getTodaysDate.mjs";

const router = express.Router();

const updateDb = () => {
    fs.writeFileSync(pathToPosts, JSON.stringify(posts, null, 2), 'utf8');
}

// Validation för denna, kolla att bodyn är korrekt formaterad.
router.post("/", checkSchema(createPostValidationSchema), getTodaysDate, (request, response) => {
    // validation
    const resultErrors = validationResult(request)
    if (!resultErrors.isEmpty()) {
        return response.status(400).send({ errors: resultErrors.array() })
    } 

    // request.todaysDate // lägg till på den nya posten
    const { body } = request;
    let requestPostId = { id: nanoid(), ...body };
    posts.push(requestPostId);
    updateDb()
    return response.status(201);
});


router.get("/:index", getPostAndIndex, (request, response) => {
    const post = request.post;
    response.render("detail", { post })
});

// validation för korrekt format behövs
router.put("/:id", getPostAndIndex, (request, response) => {
    const { body } = request;
    posts[request.postIndex] = { id: request.post.id, ...body }
    updateDb()
    return response.sendStatus(200);
});

router.patch("/:id", getPostAndIndex, (request, response) => {
    const { body } = request;
    posts[request.postIndex] = { ...posts[request.postIndex], ...body }
    updateDb()
    return response.sendStatus(200);
});

router.delete("/:id", getPostAndIndex, (request, response) => {
    posts.splice(request.postId, 1);
    updateDb()
    return response.status(204).send({ msg: `You deleted post with header: ${posts[request.postId]}` });
});

export { router as postRouter };