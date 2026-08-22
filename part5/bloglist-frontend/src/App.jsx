import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Container, Box, Typography, Card, CardContent } from '@mui/material'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON)
      setUser(userObj)
      blogService.setToken(userObj.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      notify(`Welcome ${loggedInUser.name || loggedInUser.username}!`)
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    notify('Logged out successfully')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      // If the backend didn't populate user or only set user id, ensure user details are present
      const blogWithUser = returnedBlog.user && typeof returnedBlog.user === 'object'
        ? returnedBlog
        : { ...returnedBlog, user: { id: user.id, username: user.username, name: user.name } }
      setBlogs(blogs.concat(blogWithUser))
      notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      navigate('/')
    } catch (exception) {
      const errorMsg = exception.response?.data?.error || 'Failed to create blog'
      notify(errorMsg, 'error')
    }
  }

  const handleLike = async (blog) => {
    try {
      const blogId = blog.id || blog._id
      const userId = blog.user
        ? (typeof blog.user === 'object' ? (blog.user.id || blog.user._id) : blog.user)
        : null

      const updatedObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: (blog.likes || 0) + 1,
        user: userId
      }

      const returnedBlog = await blogService.update(blogId, updatedObject)
      // Step 5.9: Keep user object preserved if backend returns only userId or doesn't repopulate
      const updatedBlogWithUser = returnedBlog.user && typeof returnedBlog.user === 'object'
        ? returnedBlog
        : { ...returnedBlog, user: blog.user }

      setBlogs(blogs.map((b) => ((b.id || b._id) === blogId ? updatedBlogWithUser : b)))
      notify(`Liked blog "${blog.title}"!`)
    } catch (exception) {
      const errorMsg = exception.response?.data?.error || 'Failed to like blog'
      notify(errorMsg, 'error')
    }
  }

  const handleDelete = async (blog) => {
    try {
      const blogId = blog.id || blog._id
      await blogService.remove(blogId)
      setBlogs(blogs.filter((b) => (b.id || b._id) !== blogId))
      notify(`Blog "${blog.title}" by ${blog.author} removed`)
    } catch (exception) {
      const errorMsg = exception.response?.data?.error || 'Failed to delete blog'
      notify(errorMsg, 'error')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f9f9fb' }}>
      <Navigation user={user} handleLogout={handleLogout} />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4, flex: 1 }}>
        <Notification notification={notification} />

        <Routes>
          <Route
            path="/"
            element={
              user === null ? (
                <Box>
                  <LoginForm handleLogin={handleLogin} />
                  <BlogList
                    blogs={blogs}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    createBlog={createBlog}
                    user={user}
                  />
                </Box>
              ) : (
                <BlogList
                  blogs={blogs}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                  createBlog={createBlog}
                  user={user}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <LoginForm handleLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/create"
            element={
              user ? (
                <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                  <Card elevation={3}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        Create New Blog
                      </Typography>
                      <BlogForm createBlog={createBlog} />
                    </CardContent>
                  </Card>
                </Box>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <BlogDetails
                blogs={blogs}
                handleLike={handleLike}
                handleDelete={handleDelete}
                user={user}
              />
            }
          />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
