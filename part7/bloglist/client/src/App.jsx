import { useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Container, Box, Typography, Card, CardContent } from '@mui/material'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'
import Users from './components/Users'
import User from './components/User'
import NotFound from './components/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import { useBlogStore } from './stores/blogStore'
import { useUserStore } from './stores/userStore'
import { useNotificationStore } from './stores/notificationStore'

const App = () => {
  const navigate = useNavigate()

  const user = useUserStore((state) => state.user)
  const initUser = useUserStore((state) => state.initUser)
  const login = useUserStore((state) => state.login)
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs)
  const createBlog = useBlogStore((state) => state.createBlog)
  const showNotification = useNotificationStore((state) => state.showNotification)

  useEffect(() => {
    initUser()
    fetchBlogs().catch(() => {})
  }, [initUser, fetchBlogs])

  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await login(credentials)
      showNotification(`Welcome ${loggedInUser.name || loggedInUser.username}!`, 'success')
      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const created = await createBlog(blogObject)
      showNotification(`A new blog ${created.title} by ${created.author} added`, 'success')
      navigate('/')
    } catch (exception) {
      const errorMsg = exception.response?.data?.error || 'Failed to create blog'
      showNotification(errorMsg, 'error')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f9f9fb' }}>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4, flex: 1 }}>
        <Notification />

        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                user === null ? (
                  <Box>
                    <LoginForm handleLogin={handleLogin} />
                    <BlogList />
                  </Box>
                ) : (
                  <BlogList />
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" replace /> : <LoginForm handleLogin={handleLogin} />
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
                        <BlogForm createBlog={handleCreateBlog} />
                      </CardContent>
                    </Card>
                  </Box>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Container>
    </Box>
  )
}

export default App
