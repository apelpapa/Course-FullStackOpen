import blogService from "../services/blogs";

const PostBlogForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: 0 }}>Submit New Post</h3>
        <div>
          <label htmlFor="titleInput">Title: </label>
          <input type="text" id="titleInput" />
        </div>
        <div>
          <label htmlFor="authorInput">Author: </label>
          <input type="text" id="authorInput" />
        </div>
        <div>
          <label htmlFor="urlInput">URL: </label>
          <input type="text" id="urlInput" />
        </div>
        <button type="submit" style={{marginBottom:10}}>Create</button>
      </form>
    </div>
  );
};

export default PostBlogForm;
