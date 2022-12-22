const postServices = require('./posts.services')
const router = require('express').Router()
const passportJWT = require('../middleware/auth.middleware')
const likesServices = require('../likes/likes.services')


router.route('/')
    .get(postServices.getAllPosts)
    .post(passportJWT.authenticate('jwt', { session: false }), postServices.postNewPost)

router.route('/:id')
    .get(postServices.getPostById)
    .patch(passportJWT.authenticate('jwt', { session: false }), postServices.patchPost)
    .delete(passportJWT.authenticate('jwt', { session: false }), postServices.deletePost)

router.route('/:id/likes')
    .get(likesServices.getAllLikesFromPosts)
    .post(passportJWT.authenticate('jwt', { session: false }), likesServices.postLike)

module.exports = router