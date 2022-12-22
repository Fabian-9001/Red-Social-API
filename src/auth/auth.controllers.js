const { findUserByEmail, updateUser } = require('../users/users.controllers')
const { comparePassword, hashPassword } = require('../utils/crypto')
const RecoveryPasswords = require('../models/recoveryPasswords.models')
const uuid = require('uuid')

const verifyCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

const createRecoveryToken = async (email) => {
    try {
        const user = await findUserByEmail(email)
        const data = await RecoveryPasswords.create({
            id: uuid.v4(),
            userId: user.id
        })
        return data
    } catch (error) {
        return null
    }
}

const updatePassword = async (tokenId, newPassword) => {
    const recoveryData = await RecoveryPasswords.findOne({
        where: {
            id: tokenId,
            used: false
        }
    })
    if (recoveryData) {
        await RecoveryPasswords.update({
            used: true
        }, {
            where: {
                id: tokenId
            }
        })
        const data = await updateUser(recoveryData.userId, {
            password: hashPassword(newPassword)
        })
        return data
    } else {
        return null
    }
}

module.exports = {
    verifyCredentials,
    createRecoveryToken,
    updatePassword
}

