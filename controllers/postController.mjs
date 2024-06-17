import { validationResult } from "express-validator";
import { nanoid } from "nanoid";
import { posts, users } from "../app.mjs";
import { pathToPosts } from "../app.mjs";
import fs from 'fs'

const updateDb = () => {
    // Uppdaterar JSON-filen
    fs.writeFileSync(pathToPosts, JSON.stringify(posts, null, 2), 'utf8');

}

const postPost = async (request, response) => {
    // validation
    const resultErrors = validationResult(request)
    if (!resultErrors.isEmpty()) {
        return response.status(400).send({ errors: resultErrors.array() })
    }
    const { header, content, userId} = request.body;
    
    const findUserById = users.find((user) => {
        return user.id == parseInt(userId);
    })

    // den måste utvecklas mer för att ge en error page.
    if (!findUserById) {
        return response.status(404).send({msg: "User not found."})
    }

    const newPost = {
        id: nanoid(),
        header,
        content,
        tag: null,
        postedBy: findUserById.userName,
        postedByImage: findUserById.userPic, // Assumera att "profileImage" är en egenskap i user-objektet
        postDate: request.todaysDate,
        postImg:null,
        commentsOnPost: [],
        likes: 0,
        shared: 0
    }
       
    // LÄGG TILL MÖJLIGHETEN ATT LÄGGA TILL BILD I FORMEN
    // INPUT FÖR TAGS? ELLER TAGS FRÅN CONTENT?
    // VISA ERROR MESSAGE I BROWSER ISTÄLLET FÖR AT SKRIVA UT ERROR-LOGGEN

    // FIXA MODAL ELLER IN-LINE FÖR FORMEN
    // FIXA DISPLAY FÖR POSTS (EN I TAGET, INTE FLERA PÅ SAMMA RAD)
    posts.push(newPost);
    updateDb()
    return response.status(201).send(newPost);
}

const getPost = async (request, response) => {
    const post = request.post;
    response.render("detail", { post })
}

const putPost = async (request, response) => {
    const { body } = request;
    posts[request.postIndex] = { id: request.post.id, ...body }
    updateDb()
    return response.sendStatus(200);
}

const patchPost = async (request, response) => {
    const { body } = request;
    posts[request.postIndex] = { ...posts[request.postIndex], ...body }
    updateDb()
    return response.sendStatus(200);
}

const deletePost = async (request, response) => {
    posts.splice(request.postId, 1);
    updateDb()
    return response.status(204).send({ msg: `You deleted post with header: ${posts[request.postId]}` });
}

export { postPost, getPost, putPost, patchPost, deletePost }