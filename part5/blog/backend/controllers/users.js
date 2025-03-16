const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req,res) => {
  const users = await User.find({}).populate('blogPosts', { url:1, title: 1, author: 1 })
  res.status(200).json(users)
})

usersRouter.post(('/'), async (req, res) => {
  const { username, name, password } = req.body

  if(password.length < 4){
    res.status(400).json({ 'My Friend': 'You Needa More Characters In Da Password' })
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User ({
    username: username,
    name: name,
    passwordHash: passwordHash
  })
  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter