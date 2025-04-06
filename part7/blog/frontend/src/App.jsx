//Add Sorting Back

import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import PostBlogForm from "./components/PostBlogForm";
import MessageSystem from "./components/MessageSystem";
import Toggleable from "./components/Toggleable";
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const postBlogRef = useRef();

  useEffect(() => {
    const getData = async () => {
      dispatch(initializeBlogs())
      const allBlogs = await blogService.getAll();
      const sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    getData();
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
        <MessageSystem />
        <LoginForm setUser={setUser} user={user} />
      </div>
    );
  }
  return (
    <div>
      <h2>BlogMania</h2>
      <MessageSystem />
      <p>
        {user.name} is Logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <Toggleable
        buttonLabel={"Add New Blog"}
        ref={postBlogRef}
        closeLabel={"Cancel"}
      >
        <PostBlogForm
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          postBlogRef={postBlogRef}
        />
      </Toggleable>

      {blogs.map((blog) => {
        return (
          <div className="blogContainer" key={blog.id}>
            <Blog
              blog={blog}
              user={user}
              setBlogs={setBlogs}
            />
          </div>
        );
      })}
    </div>
  );
};

export default App;
