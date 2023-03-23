const User = require('../../models/User')

module.exports = async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).end()
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
