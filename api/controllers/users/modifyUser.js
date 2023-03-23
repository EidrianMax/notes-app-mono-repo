const User = require('../../models/User')

module.exports = async (req, res, next) => {
  const { id } = req.params
  const { username, name } = req.body

  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { username, name },
      { new: true, select: { notes: 0 } }
    )

    if (!userUpdated) {
      return res.status(404).json({
        error: 'user not found'
      })
    }

    res.status(202).json(userUpdated)
  } catch (error) {
    next(error)
  }
}
