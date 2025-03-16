const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/test', async (req, res) => {
  console.log(req.token)
  res.send('yoyo testing')
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  const { title, author, url, likes } = request.body
  const newBlogPost = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id,
  })
  const savedBlog = await newBlogPost.save()
  user.blogPosts = user.blogPosts.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blogExists = await Blog.findById(req.params.id)
  if (!blogExists) {
    res.status(200).json('Note Already Deleted or Never Existed')
    return
  }
  if (req.user.blogPosts.toString().includes(req.params.id.toString())) {
    const response = await Blog.findByIdAndDelete(req.params.id)
    res.status(200).json(response)
  } else {
    res.status(401).json('This Note Belongs to Another User.')
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blogExists = await Blog.findById(req.params.id)
  if (!blogExists) {
    res.status(200).json('Note Already Deleted or Never Existed')
    return
  }
  if (!req.user) {
    res.status(401).json('You Need To Be Logged In')
    return
  }
  if (req.user.blogPosts.toString().includes(req.params.id.toString())) {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    }).populate('user', { username: 1, name: 1 })
    res.status(200).json(updatedBlog)
  } else {
    res.status(401).json('This Note Belongs to Another User.')
  }
})

module.exports = blogsRouter
