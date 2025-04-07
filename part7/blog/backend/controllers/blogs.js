const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { comment: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = request.user;
  const { title, author, url, likes } = request.body;
  const newBlogPost = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id,
  });

  const savedBlog = await newBlogPost.save();
  user.blogPosts = await user.blogPosts.concat(savedBlog._id);
  await user.save();
  const populatedBlog = await savedBlog.populate("user", {
    username: 1,
    name: 1,
  });
  await populatedBlog.populate("comments", { comment: 1 });

  response.status(201).json(populatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blogExists = await Blog.findById(req.params.id);
  if (!blogExists) {
    res.status(200).json("Blog Already Deleted or Never Existed");
    return;
  }
  if (req.user.blogPosts.toString().includes(req.params.id.toString())) {
    const response = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  } else {
    res.status(401).json("This Blog Belongs to Another User.");
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const blogExists = await Blog.findById(req.params.id);
  if (!blogExists) {
    res.status(200).json("Blog Already Deleted or Never Existed");
    return;
  }
  if (!req.user) {
    res.status(401).json("You Need To Be Logged In");
    return;
  }
  if (req.user.blogPosts.toString().includes(req.params.id.toString())) {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    }).populate("user", { username: 1, name: 1 });
    res.status(200).json(updatedBlog);
  } else {
    res.status(401).json("This Blog Belongs to Another User.");
  }
});

blogsRouter.put("/:id/like", async (req, res) => {
  const blogExists = await Blog.findById(req.params.id);
  if (!blogExists) {
    res.status(404).json("Blog not found");
    return;
  }
  if (!req.user) {
    res.status(401).json("You Need To Be Logged In");
    return;
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    {
      runValidators: true,
      new: true,
    }
  ).populate("user", { username: 1, name: 1 });
  await updatedBlog.populate("comments", { comment: 1 });
  res.status(200).json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const blogResponse = await Blog.findById(req.params.id);
  if (!blogResponse) {
    res.status(404).json("Blog not found");
    return;
  }
  if (!req.user) {
    res.status(401).json("You Need To Be Logged In");
    return;
  }
  const comment = new Comment({
    comment: req.body.comment,
    blogPost: blogResponse.id,
  });
  const addedComment = await comment.save();
  blogResponse.comments = await blogResponse.comments.concat(addedComment._id);
  await blogResponse.save();
  const populatedBlog = await blogResponse.populate("user", {
    username: 1,
    name: 1,
  });
  await populatedBlog.populate("comments", { comment: 1 });
  res.status(200).json(populatedBlog);
});

module.exports = blogsRouter;
