const { api, getUsers } = require('./helpers')
const User = require('../models/User')
const { server } = require('../index')
const mongoose = require('mongoose')

beforeEach(async () => {
  await User.deleteMany({})

  const user = {
    username: 'userToTesting',
    name: 'User Testing',
    password: 'passwordToTesting'
  }

  const newUser = new User(user)

  await newUser.save()
})

describe('POST user', () => {
  test('when post a user is successfully', async () => {
    const usersAtStart = await getUsers()

    const user = {
      username: 'arthurShellby',
      user: 'Arthur Shellby',
      password: 'myPassword'
    }

    await api.post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)

    expect(usernames).toContain(user.username)
  })

  test('when post a user is failed', async () => {
    const usersAtStart = await getUsers()

    const user = {
      username: 'userToTesting',
      user: 'User Testing',
      password: 'passwordToTesting'
    }

    const res = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBe(`Error, expected \`username\` to be unique. Value: \`${user.username}\``)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  server.close()
  await mongoose.connection.close()
})
