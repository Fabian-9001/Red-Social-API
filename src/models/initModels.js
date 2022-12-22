const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Post = require('./posts.models')
const Likes = require('./likes.models')
const Follows = require('./follows.models')

const initModels = () => {

    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    Users.hasMany(Post)
    Post.belongsTo(Users)

    Users.hasMany(Likes)
    Likes.belongsTo(Users)

    Post.hasMany(Likes)
    Likes.belongsTo(Post)

    Users.hasMany(Follows)
    Follows.belongsTo(Users, {
        as: "following",
        foreignKey: "userId2"
    })

    Follows.belongsTo(Users, {
        as: 'followers',
        foreignKey: "userId"
    })


}

module.exports = initModels