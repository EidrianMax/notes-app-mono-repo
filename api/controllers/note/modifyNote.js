const Note = require('../../models/Note')

module.exports = (req, res, next) => {
  const { id } = req.params
  const { content, important } = req.body

  if (!content) {
    return res.status(404).json({
      error: 'note should contain a content'
    })
  }

  const newNoteInfo = {
    content,
    important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(note => {
      if (!note) return res.status(404).end()

      res.json(note)
    })
    .catch(error => next(error))
}
