import fs from 'fs'

const rawData = JSON.parse(fs.readFileSync("./mockdata/users.json", "utf-8"));
const posts = rawData.posts;

export const getPostId = (request, response, next) => {
    const { /* body, */ params: { id } } = request
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return response.status(400).send({ msg: 'Bad request, invalid ID' })
    const currentPostIndex = posts.findIndex(post => post.id === parsedId)
    console.log(currentPostIndex, 'currentPostIndex')
    if (currentPostIndex === -1) return response.status(404).send({ msg: '404 Page not found!' })

    //     posts[currentPostIndex] = { id: posts[currentPostIndex].id, ...body }; // behövs denna?
    request.postId = posts[currentPostIndex].id - 1
    next()
}