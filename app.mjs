import express from "express"
import path from 'path'
import { readFile } from "fs";
import { fileURLToPath } from 'url';
import { detailRouter } from "./routes/detail.mjs"
import { postRouter } from "./routes/index.mjs"

const app = express();
const PORT = 3000;

// Hämta den aktuella filens sökväg och katalog
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ställ in EJS som vy-motor
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statiska filer (om du har några)
app.use(express.static('views'));
app.use(express.static(__dirname + '/public'));



app.get('/', async (request, response) => {
    try {
        const data = await readFile(new URL('./mockdata/users.json', import.meta.url), 'utf-8')
        const jsonData = JSON.parse(data)
        response.render('index', {data: jsonData})
    } catch (err) {
        console.error('Error reading JSON file:', err)
        response.status(500).send('Internal Server Error')
    }
    
})

app.get('/detail', (request, response) => {
    response.render('detail')
})

app.listen(PORT, () => {
    console.log(`App is running on: localhost:${PORT}`);
});