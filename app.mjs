import express from "express"

import { postRouter } from "./routes/post.mjs"

const app = express()
const PORT = 3000



app.listen(PORT, () => {
    console.log(`App is running on: localhost:${PORT}`)
})