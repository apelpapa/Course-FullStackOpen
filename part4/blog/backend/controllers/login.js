
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post(('/'), async (req, res) => {
  const { username , password } = req.body
  const user = await User.findOne({ username })
  const loginSuccessful = user !== null ? await bcrypt.compare(password, user.passwordHash) : false
  if(!loginSuccessful){
    res.status(401).json('Invalid Username and/or Password')
    return
  }
  const tokenUser = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(
    tokenUser,
    process.env.SECRET,
    { expiresIn: 3600 }
  )
  res.status(200).send({ token, username: user.username, name:user.name })
})


module.exports = loginRouter