const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const config = require('../utils/config')

const api = supertest(app)

let token = null
let testUser = null

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  testUser = new User({ username: 'testuser', name: 'Test User', passwordHash })
  await testUser.save()

  token = jwt.sign({ username: testUser.username, id: testUser._id }, config.SECRET)

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog({ ...blog, user: testUser._id })
    const savedBlog = await blogObject.save()
    testUser.blogs = testUser.blogs.concat(savedBlog._id)
  }
  await testUser.save()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json and in the correct amount', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert(blogs.length > 0)
    for (const blog of blogs) {
      assert(blog.id !== undefined)
      assert.strictEqual(blog._id, undefined)
    }
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data when a valid token is provided', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    assert(titles.includes('Canonical string reduction'))

    assert.strictEqual(response.body.user.username, 'testuser')
  })

  test('fails with status code 401 Unauthorized if token is not provided', async () => {
    const newBlog = {
      title: 'Unauthorized Blog Post',
      author: 'Anonymous',
      url: 'https://unauthorized.com',
      likes: 1
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('token missing'))

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'No Likes Author',
      url: 'http://nolikes.com'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find((b) => b.title === 'Blog without likes')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('fails with status code 400 if title is missing', async () => {
    const newBlog = {
      author: 'Author Without Title',
      url: 'http://notitle.com',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('fails with status code 400 if url is missing', async () => {
    const newBlog = {
      title: 'Title Without URL',
      author: 'Author Without URL',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid and user is creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const ids = blogsAtEnd.map((b) => b.id)
    assert(!ids.includes(blogToDelete.id))
  })

  test('fails with status code 401 if token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('fails with status code 403 if user is not the creator of the blog', async () => {
    const passwordHash = await bcrypt.hash('secret2', 10)
    const anotherUser = new User({ username: 'anotheruser', name: 'Another User', passwordHash })
    await anotherUser.save()
    const anotherToken = jwt.sign({ username: anotherUser.username, id: anotherUser._id }, config.SECRET)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${anotherToken}`)
      .expect(403)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('updating a blog', () => {
  test('succeeds in updating the number of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 10
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlogInDb = blogsAtEnd.find((b) => b.id === blogToUpdate.id)
    assert.strictEqual(updatedBlogInDb.likes, blogToUpdate.likes + 10)
  })
})

describe('commenting on a blog', () => {
  test('succeeds in adding an anonymous comment to a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToComment = blogsAtStart[0]

    const response = await api
      .post(`/api/blogs/${blogToComment.id}/comments`)
      .send({ comment: 'Great article!' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert(response.body.comments.includes('Great article!'))

    const blogsAtEnd = await helper.blogsInDb()
    const commentedBlog = blogsAtEnd.find((b) => b.id === blogToComment.id)
    assert(commentedBlog.comments.includes('Great article!'))
  })

  test('fails with status code 400 if comment is empty', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToComment = blogsAtStart[0]

    await api
      .post(`/api/blogs/${blogToComment.id}/comments`)
      .send({ comment: '' })
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
