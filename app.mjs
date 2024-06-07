import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// routes
import { landingPageRouter } from "./routes/index.mjs";
import { postRouter } from "./routes/posts.mjs";
// import { detailRouter } from "./routes/detail.mjs";

const app = express();
const PORT = 3000;

// Hämta den aktuella filens sökväg och katalog
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ställ in EJS som vy-motor
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Hämta JSON-filen synkront
const dataPath = path.join(__dirname, "./mockData/users.json");
const rawData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const users = rawData.users;
const posts = rawData.posts;

app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/", landingPageRouter)
app.use("/", postRouter)
// app.use("/", detailRouter)

app.listen(PORT, () => {
  console.log(`App is running on: localhost:${PORT}`);
  // console.log(users, 'users')
  // console.log(posts, 'posts')
});

export {dataPath}
export {users}
export {posts}