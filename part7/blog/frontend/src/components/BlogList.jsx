import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = (props) => {
  const blogs = useSelector((state) => state.blogs);
  blogs.map((blog) => {
    console.log(blog)
    return (
      <div className="blogContainer" key={blog.id}>
        <Blog blog={blog} user={props.user} setBlogs={props.setBlogs} />
      </div>
    );
  });
};

export default BlogList;
