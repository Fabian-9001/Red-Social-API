const followsControllers = require('./follows.controllers')

const postFollower = (req, res) => {
    const followerId = req.user.id
    const following = req.params.id
    followsControllers.followToUser(followerId, following)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getMyFollowers = (req, res) => {
    const userId = req.user.id
    followsControllers.findMyFollowers(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getMyFollowings = (req, res) => {
    const userId = req.user.id
    followsControllers.findMyFollowings(userId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    postFollower,
    getMyFollowers,
    getMyFollowings
}