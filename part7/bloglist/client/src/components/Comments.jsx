import PropTypes from 'prop-types'
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material'
import useField from '../hooks/useField'
import { useBlogStore } from '../stores/blogStore'
import { useNotificationStore } from '../stores/notificationStore'

const Comments = ({ blogId, comments = [] }) => {
  const commentField = useField('text')
  const { reset: resetComment, ...commentInput } = commentField
  const addComment = useBlogStore((state) => state.addComment)
  const showNotification = useNotificationStore((state) => state.showNotification)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!commentInput.value.trim()) {
      return
    }
    try {
      await addComment(blogId, commentInput.value.trim())
      showNotification(`Added comment: "${commentInput.value.trim()}"`, 'success')
      resetComment()
    } catch {
      showNotification('Failed to add comment', 'error')
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Comments
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          size="small"
          label="write a comment..."
          placeholder="write a comment..."
          type={commentInput.type}
          value={commentInput.value}
          onChange={commentInput.onChange}
          id="comment-input"
          data-testid="comment-input"
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          id="add-comment-button"
          data-testid="add-comment-button"
        >
          add comment
        </Button>
      </Box>

      {comments && comments.length > 0 ? (
        <Paper variant="outlined">
          <List dense>
            {comments.map((comment, index) => (
              <ListItem key={index} divider={index < comments.length - 1}>
                <ListItemText primary={comment} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No comments yet. Be the first to comment!
        </Typography>
      )}
    </Box>
  )
}

Comments.propTypes = {
  blogId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string),
}

export default Comments
