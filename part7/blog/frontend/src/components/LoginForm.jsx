import loginService from "../services/login";
import { useState } from "react";
import { clearMessage, showMessage } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const LoginForm = (props) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const userAttempt = {
      username: username,
      password: password,
    };
    const loggedUser = await loginService.login(userAttempt);
    props.setUser(loggedUser);
    !loggedUser
      ? dispatch(showMessage("Error: Invalid Username and/or Password. Try Again"))
      : dispatch(clearMessage());
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
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
