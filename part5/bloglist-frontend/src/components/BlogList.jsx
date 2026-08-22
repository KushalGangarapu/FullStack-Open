import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Typography, Box } from '@mui/material'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = ({ blogs, handleLike, handleDelete, createBlog, user }) => {
  const blogFormRef = useRef()

  const handleCreate = async (blogObject) => {
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility()
    }
    await createBlog(blogObject)
  }

  const sortedBlogs = [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0))

  return (
    <Box sx={{ my: 3 }}>
      {user && (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={handleCreate} />
        </Togglable>
      )}

      <Typography variant="h5" component="h2" sx={{ my: 2, fontWeight: 600 }}>
        Blogs
      </Typography>

      <Box className="blogs-container" data-testid="blogs-list">
        {sortedBlogs.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No blogs available yet.
          </Typography>
        ) : (
          sortedBlogs.map((blog) => (
            <Blog
              key={blog.id || blog._id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          ))
        )}
      </Box>
    </Box>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default BlogList
