const notesRouter = require('express').Router()
const userExtractor = require('../middlewares/userExtractor')
const { getAllNotes, getNoteById, createNote, modifyNote, deleteNote } = require('../controllers/note')

notesRouter.get('/', getAllNotes)

notesRouter.get('/:id', getNoteById)

notesRouter.post('/', userExtractor, createNote)

notesRouter.put('/:id', modifyNote)

notesRouter.delete('/:id', deleteNote)

module.exports = notesRouter
