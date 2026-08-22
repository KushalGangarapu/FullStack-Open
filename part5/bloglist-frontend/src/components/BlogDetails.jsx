import PropTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Box, Link as MuiLink } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const BlogDetails = ({ blogs, handleLike, handleDelete, user }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const blog = blogs.find((b) => (b.id || b._id) === id)

  if (!blog) {
    return (
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Blog not found
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to blogs
        </Button>
      </Box>
    )
  }

  const isCreator = () => {
    if (!user || !blog.user) return false
    const blogUser = typeof blog.user === 'object' ? (blog.user.username || blog.user.id) : blog.user
    const currentUsername = user.username || user.id
    return blogUser === currentUsername || (blog.user.id && user.id && blog.user.id === user.id)
  }

  const onLike = () => {
    if (handleLike) {
      handleLike(blog)
    }
  }

  const onDelete = async () => {
    if (handleDelete) {
      const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (ok) {
        await handleDelete(blog)
        navigate('/')
      }
    }
  }

  const userName = blog.user
    ? (typeof blog.user === 'object' ? (blog.user.name || blog.user.username) : blog.user)
    : 'Unknown'

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
      >
        Back to blogs
      </Button>
      <Card elevation={4} className="blog-single-view" data-testid="blog-single-view">
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {blog.title} by {blog.author}
          </Typography>

          <Typography variant="body1" sx={{ my: 2 }}>
            <MuiLink href={blog.url} target="_blank" rel="noopener noreferrer" underline="hover">
              {blog.url}
            </MuiLink>
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }} className="blog-likes">
            <Typography variant="h6">
              {blog.likes} likes
            </Typography>
            {user && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<ThumbUpIcon />}
                onClick={onLike}
                data-testid="like-button"
              >
                like
              </Button>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
            added by <strong>{userName}</strong>
          </Typography>

          {isCreator() && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={onDelete}
                data-testid="delete-button"
              >
                remove
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

BlogDetails.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _id: PropTypes.string,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number,
      user: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.string,
          _id: PropTypes.string,
          username: PropTypes.string,
          name: PropTypes.string
        })
      ])
    })
  ).isRequired,
  handleLike: PropTypes.func,
  handleDelete: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string
  })
}

export default BlogDetails
