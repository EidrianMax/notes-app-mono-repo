const ERROR_HANDLERS = {
  CastError: (error, res) => {
    res.status(400).json({
      name: error.name,
      message: error.message
    })
  },
  TokenExpiredError: (error, res) => {
    res.status(401).json({
      name: error.name,
      messages: error.message
    })
  },
  defaultError: (error, res) => {
    console.log(error)
    res.status(500).end()
  }
}

module.exports = (error, req, res, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(error, res)
}
