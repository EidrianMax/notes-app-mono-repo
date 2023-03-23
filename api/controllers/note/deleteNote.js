const Note = require('../../models/Note')

module.exports = (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndRemove(id)
    .then((note) => {
      if (!note) {
        return res.status(404).end()
      }

      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
}
