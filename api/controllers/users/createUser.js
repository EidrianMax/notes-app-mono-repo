const User = require('../../models/User')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
  const { body: { username, name, password } } = req

  const saltRounds = 10
  const hashPassword = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    password: hashPassword
  })

  newUser.save()
    .then(savedUser => {
      res.status(201).json(savedUser)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({
        error: error.errors.username.message
      })
    })
}
