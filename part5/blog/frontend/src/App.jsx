import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import PostBlogForm from "./components/PostBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedUser");
    setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  if (!user) {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setUser={setUser}
        user={user}
      />
    );
  }
  return (
    <div>
      <h2>BlogMania</h2>
      <p>
        {user.name} is Logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <PostBlogForm />
      

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
