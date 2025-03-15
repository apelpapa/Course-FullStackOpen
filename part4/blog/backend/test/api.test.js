const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const userHelper = require('./test_helper_users')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await api.post('/api/users').send(userHelper.initialUsers[0])

  const jsonToken = await api.post('/api/login').send(userHelper.validLogin)
  userHelper.currentToken = jsonToken.body.token

  await api.post('/api/blogs').send(helper.newBlogPost).set('Authorization', `Bearer ${userHelper.currentToken}`)
})

describe('Get Tests', () => {
  test('Get Method', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All Blogs Are Returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 1)
  })

  test('Identifier is id', async () => {
    const response = await api.get('/api/blogs')
    let marker = 0
    if (response.body[0].id && !response.body[0]._id) {
      marker = 1
    }
    assert.strictEqual(marker, 1)
  })
})
describe('Post Tests', () => {
  test('Successful Normal POST', async () => {
    const response = await api.post('/api/blogs').send(helper.newBlogPost).set( 'Authorization', `Bearer ${userHelper.currentToken}`)
    delete response.body.id
    delete response.body.user
    const numBlogs = await helper.getNumberBlogs()
    assert.deepStrictEqual(response.body, helper.newBlogPost)
    assert.strictEqual(numBlogs, 1 + 1)
  })

  test('Post With Blank Likes Defaults to Zero', async () => {
    const response = await api.post('/api/blogs').send(helper.blogWithNoLikes).set( 'Authorization', `Bearer ${userHelper.currentToken}`)
    delete response.body.id
    const checkBlog = { ...helper.blogWithNoLikes, likes: 0 }
    const numBlogs = await helper.getNumberBlogs()
    delete response.body.user
    assert.strictEqual(numBlogs, 1 + 1)
    assert.deepStrictEqual(response.body, checkBlog)
  })

  test('No Title Gives 400', async () => {
    await api.post('/api/blogs').send(helper.blogWithNoTitle).set( 'Authorization', `Bearer ${userHelper.currentToken}`).expect(400)
    const numBlogs = await helper.getNumberBlogs()
    assert.strictEqual(numBlogs, 1)
  })

  test('No URL Gives 400', async () => {
    await api.post('/api/blogs').send(helper.blogWithNoURL).set( 'Authorization', `Bearer ${userHelper.currentToken}`).expect(400)
    const numBlogs = await helper.getNumberBlogs()
    assert.strictEqual(numBlogs, 1)
  })
})

test('Delete Test', async () => {
  const getResponse = await api.get('/api/blogs')
  await api.delete(`/api/blogs/${getResponse.body[0].id}`).set( 'Authorization', `Bearer ${userHelper.currentToken}`).expect(200)
  const numBlogs = await helper.getNumberBlogs()
  assert.strictEqual(numBlogs, 1 - 1)
})

test('Put Test', async () => {
  let getResponse = await api.get('/api/blogs')
  await api
    .put(`/api/blogs/${getResponse.body[0].id}`)
    .send(helper.updatedBlogInfo)
  getResponse = await api.get('/api/blogs')
  delete getResponse.body[0].id
  delete getResponse.body[0].user
  const numBlogs = await helper.getNumberBlogs()
  assert.strictEqual(numBlogs, 1)
  assert.deepStrictEqual(getResponse.body[0], helper.expectedUpdatedBlog)
})
describe('User Tests', () => {
  test('Get Users', async () => {
    const allUsers = await api.get('/api/users')
    assert.strictEqual(allUsers.body.length, 1)
  })

  test('Valid User Added', async () => {
    let importedUser = userHelper.validUserToAdd
    let addedUser = await api.post('/api/users')
      .send(importedUser)
    delete addedUser.body.id
    delete addedUser.body.blogPosts
    delete importedUser.password
    assert.deepStrictEqual(addedUser.body, importedUser)
  })

  test('Invalid Username Returns 400', async () => {
    await api.post('/api/users')
      .send(userHelper.invalidUsernameToAdd)
      .expect(400)
  })

  test('Invalid Password Returns 400', async () => {
    await api.post('/api/users')
      .send(userHelper.invalidPasswordToAdd)
      .expect(400)
  })
})
after(async () => {
  await mongoose.connection.close()
})
