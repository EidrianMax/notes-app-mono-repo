const User = require('../../models/User')

module.exports = async (req, res, next) => {
  try {
    const users = await User.find().populate('notes', { user: 0 })

    res.json(users)
  } catch (error) {
    next(error)
  }
}
