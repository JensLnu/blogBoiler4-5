import fs from 'fs'

const rawData = JSON.parse(fs.readFileSync("./mockdata/users.json", "utf-8"));
const posts = rawData.posts;

export const getPost = (request, response, next) => {
    const { /* body, */ params: { id } } = request
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return response.status(400).send({ msg: 'Bad request, invalid ID' })
    const currentPost = posts[parsedId - 1]
    if (currentPost === -1) return response.status(404).send({ msg: '404 Page not found!' })

    //     posts[currentPostIndex] = { id: posts[currentPostIndex].id, ...body }; // behövs denna?
    request.post = currentPost
    next()
}