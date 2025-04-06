import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { useState } from "react";
import { clearMessage, showMessage } from "../reducers/notificationReducer";

const PostBlogForm = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlogPost = {
      title: title,
      author: author,
      url: url,
    };
    try {
      const postedBlog = await blogService.postBlog(
        newBlogPost,
        props.user.token,
      );
      dispatch(
        showMessage(
          `Added Blog: ${postedBlog.title} - by: ${postedBlog.author}`,
        ),
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      props.setBlogs(props.blogs.concat(postedBlog));
      props.postBlogRef.current.changeVisibility();
    } catch (error) {
      console.error("Error Posting Blog", error);
    }
  };

  return (
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
          />
        </div>
        <div>
          <label htmlFor="authorInput">Author: </label>
          <input
            type="text"
            id="authorInput"
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor="urlInput">URL: </label>
          <input
            type="text"
            id="urlInput"
            onChange={({ target }) => setURL(target.value)}
            value={url}
          />
        </div>
        <button type="submit" style={{ marginBottom: 10 }}>
          Create
        </button>
      </form>
    </div>
  );
};

export default PostBlogForm;
