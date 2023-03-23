const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'wrong credentials'
      })
    }

    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.json({
      token
    })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
