import express from "express";
import fs from "fs";
import { getPostId } from "../middelware/getPostId.mjs";

const router = express.Router();

const rawData = JSON.parse(fs.readFileSync("./mockdata/users.json", "utf-8"));
const users = rawData.users;
const posts = rawData.posts;

router.get("/", (request, response) => {
  response.render("index", { users, posts });
  
});


router.post("/", (request, response) => {
  const { body } = request;
  let requestPostId = { id: posts[posts.length - 1].id, ...body };
  posts.push(requestPostId );
  return response.status(201);
});

router.put("/post/:id", getPostId, (request, response) => {
  const { body } = request;
  posts[request.postId ] = { id: posts[request.postId ].id, ...body };
  return response.sendStatus(200);

});


router.patch("/post/:id", getPostId, (request, response) => {
  const { body } = request;
  posts[request.postId ] = { id: posts[request.postId ].id, ...body };
  return response.sendStatus(200);
});

router.delete("/post/:id", getPostId, (request, response) => {
  posts.splice(request.postId, 1);
  return response.status(204).send({msg: `You deleted post with header: ${posts[request.postId].header}`});
});

export { router as postRouter };
