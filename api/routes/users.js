const usersRouter = require('express').Router()
const { getAllUsers, getUserById, createUser, modifyUser, deleteUser } = require('../controllers/users')

usersRouter.get('/', getAllUsers)

usersRouter.get('/:id', getUserById)

usersRouter.post('/', createUser)

usersRouter.put('/:id', modifyUser)

usersRouter.delete('/:id', deleteUser)

module.exports = usersRouter
