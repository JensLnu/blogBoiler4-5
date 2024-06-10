import { posts } from '../app.mjs';

export const getPostAndIndex = (request, response, next) => {
    const { params: { index } } = request
    const parsedIndex = parseInt(index)
    if (isNaN(parsedIndex)) return response.status(400).send({ msg: 'Bad request, invalid ID' })
    const currentPost = posts[parsedIndex - 1]
    if (currentPost === -1) return response.status(404).send({ msg: '404 Page not found!' })
    request.post = currentPost
    request.postIndex = posts.indexOf(request.post)
    next()
}