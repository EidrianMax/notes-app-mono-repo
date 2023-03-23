// env
require('dotenv').config()

// mongo connect
require('./mongo')

// express
const express = require('express')
const app = express()

// cors
const cors = require('cors')

// middlewares
const { notFound, handlerError } = require('./middlewares')
// const logger = require('./loggerMiddleware') // middleware for example

// controllers
const { notesRouter, usersRouter, loginRouter } = require('./routes')

const { NODE_ENV } = process.env

// start app
app.use(express.json())
app.use(cors())
// app.use(logger) // middleware for example
app.use(express.static('../app/build'))

app.get('/', (req, res) => {
  res.send('<h1>Api Notes</h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

console.log(NODE_ENV)

if (NODE_ENV === 'test') {
  const { testingRouter } = require('./routes')
  app.use('/api/testing', testingRouter)
}

app.use(handlerError)

app.use(notFound)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = {
  app,
  server
}
