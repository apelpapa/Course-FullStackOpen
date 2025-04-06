import { useSelector } from "react-redux";
import Blog from "./Blog";
import PostBlogForm from "./PostBlogForm";

const BlogList = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <PostBlogForm />
      {sortedBlogs.map((blog) => {
        return (
          <div className="blogContainer" key={blog.id}>
            <Blog blog={blog} />
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
