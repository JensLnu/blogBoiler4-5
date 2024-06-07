import express from "express";
import fs from "fs";

const router = express.Router();

const rawData = JSON.parse(fs.readFileSync("./mockdata/users.json", "utf-8"));
const users = rawData.users;
const posts = rawData.posts;

router.get("/", (request, response) => {
  response.render("index", { users, posts });
});

router.get("/", () => {});

router.post("/", () => {});

router.put("/", () => {});

router.patch("/", () => {});

router.delete("/", () => {});

export { router as postRouter };
