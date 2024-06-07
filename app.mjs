import express from "express"
import path from 'path'
import fs from "fs";
import { fileURLToPath } from 'url';
import { detailRouter } from "./routes/detail.mjs"
import { postRouter } from "./routes/post.mjs"

app.use(express.json());
const app = express();
app.use(express.static('public'));
const PORT = 3000;

const rawData =JSON.parse(fs.readFileSync('./mockdata/users.json', 'utf-8'));
const users = rawData.users
const posts = rawData.posts



// Hämta den aktuella filens sökväg och katalog
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statiska filer (om du har några)
app.use(express.static('views'));
app.use(express.static(__dirname + '/public'));

// Ställ in EJS som vy-motor
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_request, _response) => {
    // läs in 'users' och 'posts' till er EJS fil Oscar/Nyat
    res.render("index")
})


app.listen(PORT, () => {
    console.log(`App is running on: localhost:${PORT}`);
    // console.log(users, 'users')
    // console.log(posts, 'posts')
});