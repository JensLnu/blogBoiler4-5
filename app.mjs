import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { detailRouter } from "./routes/detail.mjs";
import { postRouter } from "./routes/index.mjs";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const rawData = JSON.parse(fs.readFileSync("./mockdata/users.json", "utf-8"));
const users = rawData.users;
const posts = rawData.posts;

// Hämta den aktuella filens sökväg och katalog
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ställ in EJS som vy-motor
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Statiska filer (om du har några)
app.use(express.static("views"));
app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  // läs in 'users' och 'posts' till er EJS fil Oscar/Nyat
  response.render("index");
});

app.get("/detail", (request, response) => {
  response.render("detail");
});

app.listen(PORT, () => {
  console.log(`App is running on: localhost:${PORT}`);
  // console.log(users, 'users')
  // console.log(posts, 'posts')
});
