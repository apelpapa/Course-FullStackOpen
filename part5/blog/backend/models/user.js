const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  passwordHash: String,
  name: String,
  blogPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Blog = mongoose.model('User', userSchema)

module.exports = Blog
