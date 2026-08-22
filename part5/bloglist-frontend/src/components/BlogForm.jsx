import { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Card elevation={2} sx={{ maxWidth: 500, my: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          Create new blog
        </Typography>
        <form onSubmit={addBlog} className="blog-form">
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Title"
              placeholder="title"
              id="title"
              slotProps={{ htmlInput: { 'data-testid': 'title-input' } }}
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Author"
              placeholder="author"
              id="author"
              slotProps={{ htmlInput: { 'data-testid': 'author-input' } }}
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="URL"
              placeholder="url"
              id="url"
              slotProps={{ htmlInput: { 'data-testid': 'url-input' } }}
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="create-blog-button"
            data-testid="create-blog-button"
          >
            create
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
