const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')

const api = supertest(app)

const initialNotes = [
  {
    content: 'Compra en el supermercado',
    important: true
  },
  {
    content: 'Reunión de equipo',
    important: false
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note.content)

  return {
    response, contents
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  api,
  initialNotes,
  getAllContentFromNotes,
  getUsers
}
