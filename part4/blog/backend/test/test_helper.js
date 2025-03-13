const Blog = require("../models/blog");
const mongoose = require("mongoose");

const initialBlogs = [
  {
    title: "Blog Entry 1",
    author: "Blog Author 1",
    url: "Blog URL 1",
    likes: 1,
  },
  {
    title: "Blog Entry 2",
    author: "Blog Author 2",
    url: "Blog URL 2",
    likes: 2,
  },
];

const blogWithNoLikes = {
  title: "Blog Entry 4",
  author: "Blog Author 4",
  url: "Blog URL 4",
};

const blogWithNoTitle = {
  author: "Blog Author 5",
  url: "Blog URL 5",
  likes: 5,
};

const blogWithNoURL = {
  title: "Blog Entry 5",
  author: "Blog Author 5",
  likes: 5,
};

const newBlogPost = {
  title: "Blog Entry 3",
  author: "Blog Author 3",
  url: "Blog URL 3",
  likes: 3,
};

const getNumberBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.length;
};

module.exports = {
  initialBlogs,
  newBlogPost,
  getNumberBlogs,
  blogWithNoLikes,
  blogWithNoTitle,
  blogWithNoURL,
};
