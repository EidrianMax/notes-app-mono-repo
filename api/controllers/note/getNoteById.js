const Note = require('../../models/Note')

module.exports = (req, res, next) => {
  const { id } = req.params

  Note.findById(id).populate('user', { notes: 0 })
    .then(note => {
      if (!note) return res.status(404).end()

      res.json(note)
    })
    .catch(error => {
      next(error)
    })
}
