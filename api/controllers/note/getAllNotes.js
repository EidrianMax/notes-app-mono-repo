const Note = require('../../models/Note')

module.exports = (req, res, next) => {
  Note.find({}).populate('user', { notes: 0 })
    .then(notes => res.json(notes))
    .catch(error => next(error))
}
