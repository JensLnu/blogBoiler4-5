export const getTodaysDate = (request, response, next) => {
    const today = new Date()
    const todaysDate = today.toLocaleDateString('en-US')
    request.todaysDate = todaysDate
    next()
}