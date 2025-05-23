import loginService from '../services/login'
import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const userAttempt = {
      username: username,
      password: password,
    }
    const loggedUser = await loginService.login(userAttempt)
    props.setUser(loggedUser)
    !loggedUser
      ? props.setMessage('Error: Invalid Username and/or Password. Try Again')
      : props.setMessage(null)
    setTimeout(() => {
      props.setMessage(null)
    }, 3000)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
  }

  return (
    <form onSubmit={handleLogin}>
      <h2> Login </h2>
      <div>
        <label htmlFor="usernameInput">Username: </label>
        <input
          type="text"
          id="usernameInput"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
      </div>
      <div>
        <label htmlFor="passwordInput">Password: </label>
        <input
          type="text"
          id="passwordInput"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default LoginForm
