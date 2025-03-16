import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import PostBlogForm from "./components/PostBlogForm";
import MessageSystem from "./components/MessageSystem";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const postBlogRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const allBlogs = await blogService.getAll();
      const sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    getData()
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
      <div>
        <MessageSystem message={message} />
        <LoginForm setUser={setUser} user={user} setMessage={setMessage} />
      </div>
    );
  }
  return (
    <div>
      <h2>BlogMania</h2>
      <MessageSystem message={message} />
      <p>
        {user.name} is Logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Toggleable buttonLabel={"Add New Blog"} ref={postBlogRef}>
        <PostBlogForm
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          postBlogRef={postBlogRef}
        />
      </Toggleable>

      {blogs.map((blog) => {
        return (
          <div className="blogContainer" key={blog.id}>
            <strong>Title: </strong> {blog.title}
            <Toggleable
              buttonLabel={"View Details"}
              closeLabel={"Hide Details"}
            >
              <Blog blogs={blogs} blog={blog} user={user} setBlogs={setBlogs} />
            </Toggleable>
          </div>
        );
      })}
    </div>
  );
};

export default App;
