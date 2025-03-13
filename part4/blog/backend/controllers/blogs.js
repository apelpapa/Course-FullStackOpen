const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const response = await Blog.findByIdAndDelete(req.params.id)
  if(response){
    res.status(200).send(`Deleted The Following Successfully: ${response}`)
  } else {
    res.status(200).json('No Such ID Exists. Already Deleted or Never Existed.')
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const response = await Blog.findByIdAndUpdate(req.params.id, req.body, { runValidators:true })
  res.status(200).send(`Update To The Following Successfully: ${response}`)
})

module.exports = blogsRouter
