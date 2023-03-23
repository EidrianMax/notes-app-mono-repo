const logger = (req, res, next) => {
  console.log('Middleware to intercept any request')
  console.log('-----')

  next()
}

module.exports = logger
