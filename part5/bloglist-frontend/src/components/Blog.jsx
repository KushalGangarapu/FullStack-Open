import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'

const Blog = ({ blog, handleLike, handleDelete, user, showDetailsAlways = false }) => {
  const [detailsVisible, setDetailsVisible] = useState(showDetailsAlways)

  const isCreator = () => {
    if (!user || !blog.user) return false
    const blogUser = typeof blog.user === 'object' ? (blog.user.username || blog.user.id) : blog.user
    const currentUsername = user.username || user.id
    return blogUser === currentUsername || (blog.user.id && user.id && blog.user.id === user.id)
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const onLike = () => {
    if (handleLike) {
      handleLike(blog)
    }
  }

  const onDelete = () => {
    if (handleDelete) {
      const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (ok) {
        handleDelete(blog)
      }
    }
  }

  const userName = blog.user
    ? (typeof blog.user === 'object' ? (blog.user.name || blog.user.username) : blog.user)
    : 'Unknown'

  return (
    <Card
      elevation={2}
      className="blog"
      data-testid="blog-item"
      sx={{
        mb: 2,
        borderLeft: 4,
        borderColor: 'primary.main',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 4 }
      }}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h6" component="div" className="blog-title-author">
            <Link
              to={`/blogs/${blog.id || blog._id}`}
              style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}
            >
              {blog.title} {blog.author}
            </Link>
          </Typography>
          {!showDetailsAlways && (
            <Button
              size="small"
              variant="outlined"
              onClick={toggleDetails}
              data-testid="view-button"
            >
              {detailsVisible ? 'hide' : 'view'}
            </Button>
          )}
        </Box>

        {(detailsVisible || showDetailsAlways) && (
          <Box sx={{ mt: 2 }} className="blog-details" data-testid="blog-details">
            <Typography variant="body2" className="blog-url" data-testid="blog-url" sx={{ mb: 1, wordBreak: 'break-all' }}>
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
              </a>
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }} className="blog-likes" data-testid="blog-likes">
              <Typography variant="body2">
                likes {blog.likes}
              </Typography>
              {user && (
                <Button
                  size="small"
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

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="blog-user">
              added by {userName}
            </Typography>

            {isCreator() && (
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={onDelete}
                data-testid="delete-button"
                sx={{ mt: 1 }}
              >
                remove
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
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
  }).isRequired,
  handleLike: PropTypes.func,
  handleDelete: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string
  }),
  showDetailsAlways: PropTypes.bool
}

export default Blog
