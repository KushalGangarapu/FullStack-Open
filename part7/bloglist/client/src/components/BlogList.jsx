import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Typography, Box } from '@mui/material'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useBlogStore } from '../stores/blogStore'
import { useUserStore } from '../stores/userStore'
import { useNotificationStore } from '../stores/notificationStore'

const BlogList = ({
  blogs: propBlogs,
  handleLike: propHandleLike,
  handleDelete: propHandleDelete,
  createBlog: propCreateBlog,
  user: propUser,
}) => {
  const blogFormRef = useRef()

  const storeBlogs = useBlogStore((state) => state.blogs)
  const storeCreateBlog = useBlogStore((state) => state.createBlog)
  const storeLikeBlog = useBlogStore((state) => state.likeBlog)
  const storeDeleteBlog = useBlogStore((state) => state.deleteBlog)
  const storeUser = useUserStore((state) => state.user)
  const showNotification = useNotificationStore((state) => state.showNotification)

  const blogs = propBlogs || storeBlogs
  const createBlog = propCreateBlog || storeCreateBlog
  const handleLike = propHandleLike || storeLikeBlog
  const handleDelete =
    propHandleDelete ||
    (async (blog) => {
      try {
        await storeDeleteBlog(blog.id || blog._id)
        showNotification(`Blog ${blog.title} by ${blog.author} removed`, 'success')
      } catch {
        showNotification('Failed to remove blog', 'error')
      }
    })
  const user = propUser !== undefined ? propUser : storeUser

  const handleCreate = async (blogObject) => {
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility()
    }
    try {
      const created = await createBlog(blogObject)
      showNotification(`A new blog ${created.title} by ${created.author} added`, 'success')
    } catch (error) {
      showNotification(error.response?.data?.error || 'Failed to add blog', 'error')
    }
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
  blogs: PropTypes.array,
  handleLike: PropTypes.func,
  handleDelete: PropTypes.func,
  createBlog: PropTypes.func,
  user: PropTypes.object,
}

export default BlogList
