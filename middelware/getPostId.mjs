import fs from 'fs'

const rawData = JSON.parse(fs.readFileSync("./mockdata/users.json", "utf-8"));
const posts = rawData.posts;

export const getPostId = (request, response, next) => {
    const { /* body, */ params: { id } } = parseInt(request)
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return response.status(400).send({ msg: 'Bad request, invalid ID' })
    const currentPostIndex = posts.findIndex(post => post.id === parsedId)
    if (currentPostIndex === -1) return response.status(404).send({ msg: 'Page not found.' })

    request.postId = currentPost.id
    //     posts[currentPostIndex] = { id: posts[currentPostIndex].id, ...body }; // behövs denna?
    console.log(request.postId, 'postId (middleware request)')
    next()
}


// export const resolveIndexByUserId = (request, response, next) => {
//     let { body, params: { id } } = request;
//     let parsedId = parseInt(id);
//     if (isNaN(parsedId)) {
//         return response.status(400).send({ msg: '400. Bad Request. Invalid ID.' })
//     }
//     let findUserIndex = mockUsers.findIndex((user) => {
//         return user.id === parsedId;
//     });
//     if (findUserIndex === -1) {
//         return response.status(404).send({ msg: 'Page not found.' })
//     }
//     mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

//     request.findUserIndex = findUserIndex;

//     next();
// }