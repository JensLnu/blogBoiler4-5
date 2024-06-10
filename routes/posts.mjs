import express from "express";
import fs from 'fs'
import { getPostAndIndex } from "../middelware/getPostId.mjs";
import { posts } from "../app.mjs";
import { users } from "../app.mjs";
import { pathToPosts } from "../app.mjs";
import { nanoid } from "nanoid";
import { checkSchema, validationResult } from "express-validator";
import {createPostValidationSchema } from "../validationSchemas/createPostValidationSchema.mjs";
import { getTodaysDate } from "../middelware/getTodaysDate.mjs";

const router = express.Router();
router.use(express.urlencoded({ extended: true}))

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
        
        // här behöver också 
        /*
        "header": "Batman",
        "content": "Super power: Very rich",
        "tag": "cool",
        "postedBy": "David",
        "postedByImage": "../images/profilePics/david.png",
        "postDate": request.todaysDate // lägg till på den nya posten
        "postImg": "../images/Dr-manhatan.png",
        "commentsOnPost": [
            {
                "postedBy": "David",
                "comment": "Testing...",
                "likes": 10
                }
                ],
                "likes": 50,
                "shared": 20
                */

    // HÄMTA URL FRÅN USERS BASERAT PÅ ANVÄNDARNAMN SOM SKICKAS I BODYN
    // LÄGG TILL DAGENS DATUM
    // LÄGG TILL MÖJLIGHETEN ATT LÄGGA TILL BILD I FORMEN
    // SÄTT HEADER TILL TITLE FRÅN BODY
    // SÄTT CONTENT TILL BODY.content
    // INPUT FÖR TAGS? ELLER TAGS FRÅN CONTENT?
    // SÄTT COMMENTSONPOST TILL TOM ARRAY
    // SÄTT LIKES OCH SHARES TILL 0
    // VISA ERROR MESSAGE I BROWSER ISTÄLLET FÖR AT SKRIVA UT ERROR-LOGGEN

    // FIXA MODAL ELLER IN-LINE FÖR FORMEN
    // FIXA DISPLAY FÖR POSTS (EN I TAGET, INTE FLERA PÅ SAMMA RAD)

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