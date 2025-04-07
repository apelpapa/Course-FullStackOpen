import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { addBlog } from "../reducers/blogReducer";
import Toggleable from "./Toggleable";

const PostBlogForm = (props) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const blogFormRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlogPost = {
      title: title,
      author: author,
      url: url,
    };
    dispatch(addBlog(newBlogPost, user.token))
    setTitle("");
    setAuthor("");
    setURL("");
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Toggleable buttonLabel={"Add New Blog"} closeLabel={"Cancel"} ref={blogFormRef}>
    <div>
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: 0 }}>Submit New Post</h3>
        <div>
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            onChange={({ target }) => setTitle(target.value)}
            value={title}
            required
          />
        </div>
        <div>
          <label htmlFor="authorInput">Author: </label>
          <input
            type="text"
            id="authorInput"
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
            required
          />
        </div>
        <div>
          <label htmlFor="urlInput">URL: </label>
          <input
            type="text"
            id="urlInput"
            onChange={({ target }) => setURL(target.value)}
            value={url}
            required
          />
        </div>
        <button type="submit" style={{ marginBottom: 10 }}>
          Create
        </button>
      </form>
    </div>
    </Toggleable>
  );
};

export default PostBlogForm;
