const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req,res) => {
  const users = await User.find({}).populate('notes', { content:1 })
  res.json(users)

})

userRouter.post('/', async (req,res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})

module.exports = userRouter