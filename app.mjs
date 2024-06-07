<<<<<<< HEAD
import express from "express";

import { postRouter } from "./routes/post.mjs";
=======
import express from "express"
import path from 'path'
import { fileURLToPath } from 'url';
import { detailRouter } from "./routes/detail.mjs"
import { postRouter } from "./routes/post.mjs"
>>>>>>> main

const app = express();
const PORT = 3000;

// Hämta den aktuella filens sökväg och katalog
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statiska filer (om du har några)
app.use(express.static('views'));
app.use(express.static(__dirname + '/public'));

// Ställ in EJS som vy-motor
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render("index")
})


app.listen(PORT, () => {
    console.log(`App is running on: localhost:${PORT}`);
});