import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAttempt } from '../reducers/userReducer';

const LoginForm = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const userAttempt = {
      username: username,
      password: password,
    }
    dispatch(loginAttempt(userAttempt))
  };

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
  );
};

export default LoginForm;
