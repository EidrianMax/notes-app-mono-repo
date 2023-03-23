const Note = require('../../models/Note')
const User = require('../../models/User')

module.exports = (req, res, next) => {
  const { body: { content, important = false }, userId } = req

  if (!content) {
    return res.status(406).json({
      error: 'Note should be content and userId'
    })
  }

  User.findById(userId)
    .then(user => {
      if (!user) return res.status(400).end()

      const note = {
        content,
        important,
        user: user.id
      }

      const newNote = new Note(note)

      newNote.save()
        .then(savedNote => {
          user.notes = [...user.notes, savedNote.id]
          user.save()
            .then(() => {
              res.status(201).json(savedNote)
            })
            .catch(error => next(error))
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
}
