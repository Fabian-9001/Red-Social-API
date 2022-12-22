const postsControllers = require('./posts.controllers')

const getAllPosts = (req, res) => {
    postsControllers.findAllPosts()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}


const getPostById = (req, res) => {
    const id = req.params.id
    postsControllers.findPostById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Post not found' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const postNewPost = (req, res) => {
    const { content } = req.body
    const userId = req.user.id
    postsControllers.createPost({ userId, content })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message,
                fields: {
                    content: 'text'
                }
            })
        })
}

const patchPost = (req, res) => {
    const { content } = req.body
    const id = req.params.id
    const userId = req.user.id
    postsControllers.updatePost(id, userId, { content })
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'Post updated' })
            } else {
                res.status(400).json({ message: 'Post not available' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const deletePost = (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    postsControllers.removePost(id, userId)
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'Post deleted' })
            } else {
                res.status(400).json({ message: 'Post not available' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    getAllPosts,
    getPostById,
    postNewPost,
    patchPost,
    deletePost
}