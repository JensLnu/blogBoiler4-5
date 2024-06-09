import { posts } from '../app.mjs';

export const getPostAndIndex = (request, response, next) => {
    const { params: { id } } = request
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return response.status(400).send({ msg: 'Bad request, invalid ID' })
    const currentPost = posts[parsedId - 1]
    if (currentPost === -1) return response.status(404).send({ msg: '404 Page not found!' })

    //     posts[currentPostIndex] = { id: posts[currentPostIndex].id, ...body }; // behövs denna?
    
    request.post = currentPost
    const postIndex = posts.indexOf(request.post)
    request.postIndex = postIndex
    next()
}