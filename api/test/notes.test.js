const { server } = require('../index')
const mongoose = require('../mongo')
const Note = require('../models/Note')
const { api, initialNotes, getAllContentFromNotes } = require('./helpers')

let id = ''

beforeEach(async () => {
  await Note.deleteMany({})

  await Promise.all(
    initialNotes.map(async note => {
      const newNote = new Note({
        content: note.content,
        important: note.important
      })

      await newNote.save()
    })
  )

  const notes = await Note.find({})

  const [firstNote] = notes

  id = firstNote._id
})

describe('GET all notes', () => {
  test('content-type of the response should be a json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should be all the notes', async () => {
    const response = await api
      .get('/api/notes')

    const notes = response.body

    expect(notes).toHaveLength(initialNotes.length)
    expect(notes).toBeInstanceOf(Array)
  })

  test('the content of the is the same of initialNotes', async () => {
    const response = await api
      .get('/api/notes')

    const contents = response.body.map(note => note.content)

    expect(contents).toContain('Compra en el supermercado')
  })
})

describe('GET note', () => {
  test('if find the note successfully', async () => {
    await api.get(`/api/notes/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('if doesn\'t find the note', async () => {
    const falseId = '5f3215e2e7524f26c0b21df9'

    await api.get(`/api/notes/${falseId}`)
      .expect(404)
  })

  test('if the id of the note is malformed', async () => {
    const malformedId = '5f3215ec0b21df9'

    await api
      .get(`/api/notes/${malformedId}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('POST note', () => {
  test('should successfully post note', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYWJkMmI5NjJhYTkyM2Q2ZjE0MiIsInVzZXJuYW1lIjoiYWRyaWFuNDU2IiwiaWF0IjoxNjc4OTkwMjU0LCJleHAiOjE2Nzg5OTc0NTR9.uENJc06IG5Oj7QfZrsT7oOIKfahYQEX7DSAnn9003og'

    const note = {
      content: 'Note for testing'
    }

    await api.post('/api/notes')
      .set('Authorization', `bearer ${token}`)
      .send(note)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { contents, response } = await getAllContentFromNotes()

    expect(contents).toContain(note.content)
    expect(response.body).toHaveLength(initialNotes.length + 1)
  })

  test('note without content is not added', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkxYWJkMmI5NjJhYTkyM2Q2ZjE0MiIsInVzZXJuYW1lIjoiYWRyaWFuNDU2IiwiaWF0IjoxNjc4OTkwMjU0LCJleHAiOjE2Nzg5OTc0NTR9.uENJc06IG5Oj7QfZrsT7oOIKfahYQEX7DSAnn9003og'

    const newNote = {
      important: true
    }

    await api.post('/api/notes')
      .send(newNote)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
      .expect('Content-Type', /application\/json/)

    const { response } = await getAllContentFromNotes()

    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE note', () => {
  test('delete a note was successfully', async () => {
    await api.delete(`/api/notes/${id}`)
      .expect(204)

    const res = await api.get('/api/notes')
    const { body: notes } = res
    expect(notes).toHaveLength(initialNotes.length - 1)
  })

  test('if doesn\'t find the note', async () => {
    const falseId = '5f3215e2e7524f26c0b21df9'

    await api.delete(`/api/notes/${falseId}`)
      .expect(404)
  })

  test('if the id of the note is malformed', async () => {
    const malformedId = '5f3215ec0b21df9'

    await api.delete(`/api/notes/${malformedId}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('PUT note', () => {
  test('update a note was successfully', async () => {
    const newContent = {
      content: 'This content should be update successfully',
      important: true
    }

    await api.put(`/api/notes/${id}`)
      .send(newContent)
      .expect(200)

    const res = await api.get(`/api/notes/${id}`)

    const { body: note } = res

    expect(note.content).toBe(newContent.content)
    expect(note.important).toBe(newContent.important)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  server.close()
})
