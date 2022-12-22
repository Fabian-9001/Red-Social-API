//Dependencies and imports
const express = require('express')
const config = require('../config')
const database = require('./utils/database')
const initModels = require('./models/initModels')
const usersRoutes = require('./users/users.router')
const authRoutes = require('./auth/auth.router')
const cors = require('cors')
const postsRoutes = require('./posts/posts.router')
const followsRoutes = require('./follows/follows.router')
const swaggerDoc = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')

//Database
const app = express()
app.use(cors())

database.authenticate()
    .then(() => console.log('This database is authenticated'))
    .catch(err => console.log(err))

database.sync()
    .then(() => console.log('This database is synced'))
    .catch(err => console.log(err))

initModels()

//Initial config
app.use(express.json())


//Routes
app.get('/', (req, res) => {
    res.status(200).json('Ok!')
})

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/posts', postsRoutes)
app.use('/api/v1', followsRoutes)

//Server
app.listen(config.api.port, () => {
    console.log(`This server is active in ${config.api.host}`)
})

module.exports = app