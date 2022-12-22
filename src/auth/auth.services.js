const authControllers = require('./auth.controllers')
const jsonwebtoken = require('jsonwebtoken')
const jwtSecret = require('../../config').api.jwtSecret
const mailer = require('../utils/mailer')
const config = require('../../config')

const postLogin = (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        authControllers.verifyCredentials(email, password)
            .then(data => {
                if (data) {
                    const token = jsonwebtoken.sign({
                        id: data.id,
                        email: data.email,
                        role: data.role
                    }, jwtSecret)
                    res.status(200).json({ message: 'Login successed', token })
                } else {
                    res.status(400).json('Invalid Credentials')
                }
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({ message: 'Missing data', fields: { email: 'example@example.com', password: 'string' } })
    }
}

const postRecoveryToken = (req, res) => {
    const { email } = req.body
    if (email) {
        authControllers.createRecoveryToken(email)
            .then((data) => {
                if (data) {
                    mailer.sendMail({
                        from: '<garciacruzfabian23@gmail.com>',
                        to: email,
                        subject: 'Recuperación de Contraseña',
                        html: `<a href='${config.api.host}/api/v1/auth/recovery-password/${data.id}'>Recuperar contraseña</a>`
                    })
                }
                res.status(200).json({ message: 'Email sended!, Check your inbox' })
            })
            .catch((err) => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({ message: 'Invalid data', fields: { email: 'example@example.com' } })
    }

}

const patchPassword = (req, res) => {
    const id = req.params.id
    const { password } = req.body
    authControllers.updatePassword(id, password)
        .then(data => {
            if (data) {
                res.status(200).json({ message: 'Password updated' })
            } else {
                res.status(400).json({ message: 'URL expired' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

module.exports = {
    postLogin,
    postRecoveryToken,
    patchPassword
}