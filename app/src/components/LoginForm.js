import { useState } from 'react'
import PropTypes from 'prop-types'
import Toggable from './Toggable'
import { authenticateUser } from '../services/services'

export default function LoginForm ({ setToken, setErrorMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleLoginSubmit = e => {
    e.preventDefault()

    authenticateUser(username, password)
      .then(token => {
        window.localStorage.setItem('token', token)
        setToken(token)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
      })
  }

  return (
    <Toggable buttonLabel='Login'>
      <form onSubmit={handleLoginSubmit}>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='username'
          onChange={handleUsernameChange}
        />

        <input
          type='password'
          value={password}
          name='Password'
          placeholder='password'
          onChange={handlePasswordChange}
        />

        <button id='form-login-button'>Login</button>
      </form>
    </Toggable>
  )
}

LoginForm.propTypes = {
  setToken: PropTypes.func
}
