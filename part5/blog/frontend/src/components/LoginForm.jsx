import loginService from "../services/login";

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const userAttempt = {
      username: props.username,
      password: props.password,
    };
    const loggedUser = await loginService.login(userAttempt);
    if (!loggedUser) {
      props.setUser(null);
    } else {
      props.setUser(loggedUser);
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2> Login </h2>
      <div>
        <label htmlFor="usernameInput">Username: </label>
        <input
          type="text"
          id="usernameInput"
          onChange={({ target }) => props.setUsername(target.value)}
          value={props.username}
        />
      </div>
      <div>
        <label htmlFor="passwordInput">Password: </label>
        <input
          type="text"
          id="passwordInput"
          onChange={({ target }) => props.setPassword(target.value)}
          value={props.password}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
