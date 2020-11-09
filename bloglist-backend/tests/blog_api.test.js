const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
    {
     title: "Ei jumalauta",
     author: "Mika Keravalta",
     url: "www.retiisi.net",
     likes: 4
    },
    {
      title: "Kouluihin shampanjatunti",
      author: "Mattiesko",
      url: "skidsk.skodsk",
      likes: 1
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
}) 

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added and undefined number of likes is set to 0 ', async () => {
    const newBlog = {
        title: 'Ollako vai eikö',
        author: 'Maaret',
        url: 'skudsk.skedsk',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const likes = response.body.map(r => r.likes)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(likes).toContain(
        0
    )
})

test('status is 404 for undefined title or url', async () => {
    const newBlog = {
        title: 'Shea',
        author: 'Maaret',
        likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const newBlog2 = {
        author: 'Maaret',
        url: "/.../",
        likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
})

test('a specific blog has field "id"', async () => {
    const response = await api.get('/api/blogs')
  
    const ids = response.body.map(r => r.id)
  
    expect(ids[0]).toBeDefined()   
})


afterAll(() => {
  mongoose.connection.close()
})