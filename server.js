require('dotenv').config()
require('colors')

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const actionRouter = require('./Routers/actionsRouter')
const projectRouter = require('./Routers/projectsRouter')
const server = express()
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())
server.use('/', actionRouter)
server.use('/', projectRouter)

server.get('/', (req, res) => {
    res.send('Endpoint running')
})

module.exports = server