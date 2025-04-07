import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";
import PostCommentForm from "./PostCommentForm";

const style = {};

const BlogDetailed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/blogs/:id");
  const blog = blogs.find((blog) => blog.id === match.params.id);
  if (!blog) return null;
  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} Like(s)
        <button onClick={() => dispatch(likeBlog(blog, user.token))}>
          Like
        </button>
      </p>
      <p>Added By: {blog.user.name}</p>
      <h3>Comments</h3>
      <PostCommentForm blog={blog} />
      <ul>
        {blog.comments.map(comment => {
          return(
            <li key={comment.id}>
              {comment.comment}
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default BlogDetailed;
