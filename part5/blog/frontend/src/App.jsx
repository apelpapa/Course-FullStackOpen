import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import PostBlogForm from "./components/PostBlogForm";

const MessageSystem = (props) => {
  if (!props.message) return;
  return props.message.startsWith("Error: ") ? (
    <h2 className="errorMessage">{props.message}</h2>
  ) : (
    <h2 className="normalMessage">{props.message}</h2>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

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
    return <LoginForm setUser={setUser} user={user} setMessage={setMessage}/>;
  }
  return (
    <div>
      <h2>BlogMania</h2>
      <MessageSystem message={message} />
      <p>
        {user.name} is Logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <PostBlogForm user={user} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
