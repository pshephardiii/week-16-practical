const express = require('express')
const morgan = require('morgan')
const todoRoutes = require('./routes/todoRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/todos', todoRoutes)

module.exports = app