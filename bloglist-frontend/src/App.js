import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Alert from './components/Alert'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { alertChange } from './reducers/alertReducer'
import { initBlogs, newBlog } from './reducers/blogReducer'
import { login, logout, isLoggedIn } from './reducers/loginReducer'
import {
  Switch, Route, Link, useRouteMatch
} from "react-router-dom"
import userService from './services/users'
import { Table, Form, Button } from 'react-bootstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogVisible, setBlogVisible] = useState(false)
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
 
  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  },[])

  dispatch(initBlogs())
  useEffect(() => {
    dispatch(isLoggedIn())
   
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username)
    console.log(password)

    const loginCredentials = {
      username,
      password
    }
    
    dispatch(login(loginCredentials))
     
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    
  }

  const addNewBlog = (blogObject) => {
    dispatch(newBlog(blogObject))
    dispatch(alertChange(`a new blog ${JSON.stringify(blogObject.title)} added`))
    setBlogVisible(false)
      
  }

  const sortByLikes = (blogsByLikes) => {
    blogsByLikes.sort((blog1, blog2) => blog2.likes - blog1.likes)
    
  }

  const giveLike = async (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    await blogService.update(blog.id, blogObject)
    sortByLikes(await blogService.getAll())

  }
    
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id="login-button" variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
    </form>    
  )

  const matchUser = useRouteMatch('/users/:id')
  const matchBlog = useRouteMatch('/blogs/:id')
  
  const userById = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const blogById = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null


  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button id='newBlogButton' onClick={() => setBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>         
          <BlogForm
            createBlog={addNewBlog}
          />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  
  if (user === null) {
    return (
      <div class="container">
        <Alert message={Notification}/>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div class="container">
      <Alert message={Notification}/>
      <Menu user={user} logOut={handleLogout}/> 
      <h1>blog app</h1>
      <Switch>
        <Route path="/users/:id">
          <UserProfile userById={userById}/>
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <UsersList users={users} />
        </Route>
        <Route path= "/blogs/:id">
          <Blog blog={blogById} giveLike={giveLike} />       
        </Route>
        <Route path="/">
          {blogForm()}
          <h2>blogs</h2>
          <BlogsList blogs={blogs} />
        </Route>
      </Switch>
    </div>
  )
}

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  
  return (
      <div>
        <a href='/' style={padding}>blogs</a>
        <a href='/users' style={padding}>users</a>
        {props.user.name} logged in <button onClick={props.logOut}>logout</button>
      </div>
      
  ) 
}

const UserProfile = ({ userById }) => {
  const blogs = userById.blogs
  return (
    <div>
      <h2>{userById.name}</h2>

      <h3>blogs added</h3>
      <ul>
        {blogs.map(blog => 
          <li>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const BlogsList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Table striped>
        <tbody>
          {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
            <tr key={blog.id}>
            <td key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
          </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const UsersList = ({ users }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Table striped>
        <tbody>
          <tr>
            <td>
            </td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.sort((user1, user2) => user2.blogs.length - user1.blogs.length).map(user =>
            <tr key={user.id} >
            <td key={user.id} >
              <Link to={`/users/${user.id}`} >{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default App