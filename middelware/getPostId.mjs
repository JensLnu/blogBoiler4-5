import { posts } from '../app.mjs';

export const getPostAndIndex = (request, response, next) => {
    const { /* body, */ params: { id } } = request

    // Här döper vi parametern i URL:en till id när det i själva fallet är index, svårt att skriva in nanoID manuellt i URL
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return response.status(400).send({ msg: 'Bad request, invalid ID' })
    // Varför hämtar vi posts med index om vi hämtar ID från request??
    const currentPost = posts[parsedId - 1]
    // Enda gången vi kommer få detta meddelande är om posten har ID = 0
    // Om vi vill använda oss av denna check så borde vi hitta posten med findIndex
    // Annars kan vi hitta posten med ID och kolla om objektet finns
    if (currentPost === -1) return response.status(404).send({ msg: '404 Page not found!' })


    // Denna behövs bara om du ska uppdatera ett objekt men denna funktion är till för att hämta en post och motsvarande index
    //     posts[currentPostIndex] = { id: posts[currentPostIndex].id, ...body }; // behövs denna?
    
    request.post = currentPost
    // Går det inte att binda request.postIndex direkt till posts.indexOf(request.post)?
    const postIndex = posts.indexOf(request.post)
    request.postIndex = postIndex
    next()
}