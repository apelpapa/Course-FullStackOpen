const { describe, test, after, beforeEach } = require('node:test')
const assert = require("node:assert");
const supertest = require('supertest')
const app = require('../app');
const mongoose = require('mongoose');
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () =>{
    await Blog.deleteMany({})

    for(let blog of helper.initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('API Tests', () =>{
    test('Get Method', async () =>{
        await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('All Blogs Are Returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('Identifier is id', async () =>{
        const response = await api.get('/api/blogs')
        let marker = 0
        if(response.body[0].id && !response.body[0]._id){
            marker = 1
        }
        assert.strictEqual(marker,1)
    })

    test('Successful Normal POST', async () => {
        const response = await api
            .post('/api/blogs')
            .send(helper.newBlogPost)
        delete response.body.id
        const numBlogs = await helper.getNumberBlogs()
        assert.strictEqual(numBlogs,helper.initialBlogs.length+1)
        assert.deepStrictEqual(response.body,helper.newBlogPost)
    })

    test('Post With Blank Like Defaults to Zero', async () => {
        const response = await api
            .post('/api/blogs')
            .send(helper.blogWithNoLikes)
        delete response.body.id
        const checkBlog = {...helper.blogWithNoLikes, likes:0}
        const numBlogs = await helper.getNumberBlogs()
        assert.strictEqual(numBlogs,helper.initialBlogs.length+1)
        assert.deepStrictEqual(response.body,checkBlog)
    })

    test('No Title Gives 400', async () =>{
        const response = await api
            .post('/api/blogs')
            .send(helper.blogWithNoTitle)
            .expect(400)
        const numBlogs = await helper.getNumberBlogs()
        assert.strictEqual(numBlogs,helper.initialBlogs.length)
    })

    test('No URL Gives 400', async () =>{
        const response = await api
            .post('/api/blogs')
            .send(helper.blogWithNoURL)
            .expect(400)
        const numBlogs = await helper.getNumberBlogs()
        assert.strictEqual(numBlogs,helper.initialBlogs.length)
    })
})
after(async () =>{
    await mongoose.connection.close()
})