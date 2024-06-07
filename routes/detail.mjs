import express from 'express';
import fs from 'fs';

const router = express.Router();

const rawData = JSON.parse(fs.readFileSync("./mockdata/users.json", "utf-8"));
const posts = rawData.posts;

router.get("/detail/:id", (request, response) => {
  const postId = parseInt(request.params.id);
  const post = posts.find(p => p.postId === postId);
  if (post) {
    response.render("detail", { post });
  } else {
    response.status(404).send("Post not found");
  }
});

export { router as detailRouter };
