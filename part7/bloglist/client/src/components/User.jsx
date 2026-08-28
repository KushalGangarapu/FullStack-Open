import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Link,
  Button,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userService
      .getAll()
      .then((users) => {
        const found = users.find((u) => u.id === id)
        setUser(found || null)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <Typography sx={{ mt: 3 }}>Loading user details...</Typography>
  }

  if (!user) {
    return (
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" color="error">
          User not found
        </Typography>
        <Button
          component={RouterLink}
          to="/users"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to users
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ my: 3 }}>
      <Button
        component={RouterLink}
        to="/users"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to users
      </Button>
      <Typography variant="h4" component="h2" gutterBottom>
        {user.name || user.username}
      </Typography>
      <Typography variant="h6" component="h3" sx={{ mt: 3, mb: 1 }}>
        added blogs
      </Typography>
      {user.blogs && user.blogs.length > 0 ? (
        <Paper variant="outlined" sx={{ maxWidth: 600 }}>
          <List>
            {user.blogs.map((blog) => (
              <ListItem key={blog.id || blog._id} divider>
                <ListItemText
                  primary={
                    <Link
                      component={RouterLink}
                      to={`/blogs/${blog.id || blog._id}`}
                      underline="hover"
                    >
                      {blog.title}
                    </Link>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No blogs added by this user yet.
        </Typography>
      )}
    </Box>
  )
}

export default User
