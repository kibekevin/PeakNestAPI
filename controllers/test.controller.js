export const shouldBeLoggedIn = async (req, res) => {
    return res.send({ message: 'You are seeing this because you are LoggedIn' })
}


export const shouldBeAdmin = async (req, res) => {
    return res.send({ message: 'You are seeing this because you are Admin' })
}