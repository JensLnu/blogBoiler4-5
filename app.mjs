import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectToMongoDB } from "./database/connectToMongoDb.mjs";

// routes
import { landingPageRouter } from "./routes/index.mjs";
import { postRouter } from "./routes/posts.mjs";
import {newPost } from "./routes/newPost.mjs";
// import { detailRouter } from "./routes/detail.mjs";

const app = express();


// Hämta den aktuella filens sökväg och katalog
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ställ in EJS som vy-motor
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Hämta JSON-filen synkront
const pathToUsers = path.join(__dirname, "./mockData/users.json");
const pathToPosts = path.join(__dirname, "./mockData/posts.json");
const users = JSON.parse(fs.readFileSync(pathToUsers, "utf-8"));
const posts = JSON.parse(fs.readFileSync(pathToPosts, "utf-8"));

app.use(express.json());
app.use(express.static("public"));
connectToMongoDB();

// Routes
app.use("/", landingPageRouter)
app.use("/post", postRouter)
app.use("/", newPost)
// app.use("/", detailRouter)


app.listen(process.env.PORT, () => {
  console.log(`App is running on: localhost:${process.env.PORT} http://localhost:3000/`);
  
});

export {users}
export {pathToUsers}
export {posts}
export {pathToPosts}