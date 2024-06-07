import express from "express"
import path from 'path'
import { fileURLToPath } from 'url';
import { detailRouter } from "./routes/detail.mjs"
import { postRouter } from "./routes/post.mjs"

const app = express()
const PORT = 3000

// Hämta den aktuella filens sökväg och katalog
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statiska filer (om du har några)
app.use(express.static('views'));
app.use(express.static(__dirname + '/public'));

// Ställ in EJS som vy-motor
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (request, response) => {
    response.render("index")
})

app.get('/detail', (request, response) => {
    response.render('detail')
})

app.get('/posts', (request, response) => {
    response.render('post')
})

app.listen(PORT, () => {
    console.log(`App is running on: localhost:${PORT}`)
})