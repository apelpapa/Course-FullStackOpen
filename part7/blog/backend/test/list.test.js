const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

//variables
const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
]

const zeroBlogs = []

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(oneBlog)
    assert.strictEqual(result, 5)
  })
  test('when list has zero blogs, equals zero', () => {
    const result = listHelper.totalLikes(zeroBlogs)
    assert.strictEqual(result, 0)
  })
  test('when list has at least two blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, show it', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    assert.deepStrictEqual(result, oneBlog[0])
  })
  test('when list has zero blogs, show none', () => {
    const result = listHelper.favoriteBlog(zeroBlogs)
    assert.deepStrictEqual(result, zeroBlogs)
  })
  test('when list has at least two blogs, show one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })
})

describe('mostBlogs', () => {
  test('when list has only one blog, show it\'s author', () => {
    const result = listHelper.mostBlogs(oneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
  })
  test('when list has zero blogs, show none', () => {
    const result = listHelper.mostBlogs(zeroBlogs)
    assert.deepStrictEqual(result, zeroBlogs)
  })
  test('when list has at least two blogs, show author with most posts', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('mostLikes', () => {
  test('when list has only one blog, show it\'s author and likes', () => {
    const result = listHelper.mostLikes(oneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
  })
  test('when list has zero blogs, show none', () => {
    const result = listHelper.mostLikes(zeroBlogs)
    assert.deepStrictEqual(result, zeroBlogs)
  })
  test('when list has at least two blogs, show author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})