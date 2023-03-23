const User = require('../../models/User')

module.exports = async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        error: 'user not found'
      })
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
