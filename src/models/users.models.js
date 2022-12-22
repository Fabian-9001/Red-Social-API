const { DataTypes } = require('sequelize')
const database = require('../utils/database')

const Users = database.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    gender: {
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    nick_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    profile_img: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'Normal'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Users