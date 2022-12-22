const usersControllers = require('./users.controllers')
const mailer = require('../utils/mailer')
const config = require('../../config')

//For all users
const getAllUsers = (req, res) => {
    usersControllers.findAllUsers()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const getUserById = (req, res) => {
    const id = req.params.id
    usersControllers.findUserById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json('User not found')
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const postUser = (req, res) => {
    const { name, last_name, gender, birthday, email, password, nick_name, profile_img } = req.body
    usersControllers.createUser({ name, last_name, gender, birthday, email, password, nick_name, profile_img })
        .then(async data => {
            await mailer.sendMail({
                from: '<garciacruzfabian23@gmail.com>',
                to: data.email,
                subject: 'Bienvenido',
                html: `<a href='${config.api.host}/api/v1/auth/recovery-password/${data.id}'>${config.api.host}/api/v1/auth/recovery-password/${data.id}</a>`,
                text: 'Bienvenido a nuestra APP'
            })
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message, fields: {
                    name: 'String',
                    last_name: 'String',
                    gender: 'String',
                    birthday: 'YYYY/MM/DD',
                    nick_name: 'String',
                    profile_url: 'String',
                    email: 'String',
                    password: 'String',
                }
            })
        })
}

//Profile user
const getMyUser = (req, res) => {
    const id = req.user.id
    usersControllers.findUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const updateMyUser = (req, res) => {
    const { name, last_name, gender, birthday, password } = req.body
    const id = req.user.id
    usersControllers.updateUser(id, { name, last_name, gender, birthday, password })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    usersControllers.deleteUser(id)
        .then(data => {
            res.status(200).json('User deleted')
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

//ADMIN
const updateUser = (req, res) => {
    const id = req.params.id
    const { name, last_name, gender, birthday, email, role, status } = req.body
    usersControllers.updateUser(id, { name, last_name, gender, birthday, email, role, status })
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json('User not found')
            }
        })
        .catch(err => {
            res.status(200).json({ message: err.message })
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    usersControllers.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(200).json('User deleted')
            } else {
                res.status(404).json('User not found')
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    getMyUser,
    postUser,
    updateMyUser,
    deleteMyUser,
    updateUser,
    deleteUser
}
